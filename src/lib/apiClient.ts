import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach JWT on every request by reading from Zustand store outside React
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("medicart-auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        const token: string | null = parsed?.state?.token ?? null;
        if (token) config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // ignore parse errors
    }
  }
  return config;
});

// Unwrap the { success, data, timestamp } envelope
apiClient.interceptors.response.use(
  (res) => {
    if (res.data && typeof res.data === "object" && "data" in res.data) {
      res.data = res.data.data;
    }
    return res;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // Dynamically import to avoid circular dependency at module load time
      import("@/store/authStore").then(({ useAuthStore }) => {
        useAuthStore.getState().logout();
      });
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
