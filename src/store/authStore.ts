import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "vendor" | "admin";
  phone?: string;
  avatar?: string;
}

const SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  loginAt: number | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  isSessionExpired: () => boolean;
}

function setCookie(value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `auth-token=${value}; path=/; max-age=${SESSION_DURATION_MS / 1000}; SameSite=Lax`;
}

function clearCookie() {
  if (typeof document === "undefined") return;
  document.cookie = "auth-token=; path=/; max-age=0";
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loginAt: null,
      isAuthenticated: false,

      login: (user, token) => {
        setCookie(token);
        set({ user, token, loginAt: Date.now(), isAuthenticated: true });
      },

      logout: () => {
        clearCookie();
        set({ user: null, token: null, loginAt: null, isAuthenticated: false });
      },

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      isSessionExpired: () => {
        const { loginAt } = get();
        if (!loginAt) return true;
        return Date.now() - loginAt > SESSION_DURATION_MS;
      },
    }),
    { name: "medicart-auth" }
  )
);
