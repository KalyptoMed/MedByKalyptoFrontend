import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { useAuthStore, type AuthUser } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "vendor";
  phone?: string;
}

interface AuthResponse {
  user: AuthUser;
  token: string;
}

export function useLogin(options?: { redirectTo?: string }) {
  const { login } = useAuthStore();
  const { show } = useToastStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);
      return data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      show("Welcome back!", "success");
      router.push(options?.redirectTo ?? `/dashboard/${data.user.role}`);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? "Invalid credentials";
      show(message, "error");
    },
  });
}

export function useRegister() {
  const { login } = useAuthStore();
  const { show } = useToastStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await apiClient.post<AuthResponse>("/auth/register", payload);
      return data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      show("Account created successfully!", "success");
      router.push(`/dashboard/${data.user.role}`);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? "Registration failed";
      show(message, "error");
    },
  });
}

const SESSION_MS = 12 * 60 * 60 * 1000;

/**
 * Runs on every app mount.
 * 1. Forces logout if the stored session is older than 12 hours.
 * 2. Validates the JWT against the API and syncs fresh user data.
 *    A 401 response triggers logout via the apiClient interceptor.
 */
export function useValidateAuth() {
  const { isAuthenticated, token, loginAt, updateUser, logout } = useAuthStore();

  // Enforce 12-hour session limit before making any network call
  useEffect(() => {
    if (isAuthenticated && loginAt && Date.now() - loginAt > SESSION_MS) {
      logout();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sessionStillValid = isAuthenticated && !!token && !!loginAt && Date.now() - loginAt <= SESSION_MS;

  const { data } = useQuery<AuthUser>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await apiClient.get<AuthUser>("/auth/me");
      return data;
    },
    enabled: sessionStillValid,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (data) updateUser(data);
  }, [data, updateUser]);
}
