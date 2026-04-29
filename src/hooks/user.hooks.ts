import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { useAuthStore, type AuthUser } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";

export interface ApiAddress {
  _id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  isDefault: boolean;
}

interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export function useMe() {
  const { isAuthenticated } = useAuthStore();
  return useQuery<AuthUser>({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await apiClient.get<AuthUser>("/users/me");
      return data;
    },
    enabled: isAuthenticated,
  });
}

export function useChangePassword() {
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      await apiClient.patch("/users/me/password", payload);
    },
    onSuccess: () => show("Password changed successfully", "success"),
    onError: (error: any) => show(error?.response?.data?.message ?? "Failed to change password", "error"),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const { data } = await apiClient.patch<AuthUser>("/users/me", payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data);
      updateUser(data);
      show("Profile updated", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Update failed", "error");
    },
  });
}

// ── Addresses ─────────────────────────────────────────────────────────────────

export function useAddresses() {
  const { isAuthenticated } = useAuthStore();
  return useQuery<ApiAddress[]>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiAddress[]>("/users/me/addresses");
      return data;
    },
    enabled: isAuthenticated,
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();
  return useMutation({
    mutationFn: async (payload: Omit<ApiAddress, "_id">) => {
      const { data } = await apiClient.post("/users/me/addresses", payload);
      return data;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["addresses"] }); show("Address saved", "success"); },
    onError: (e: any) => show(e?.response?.data?.message ?? "Failed to save address", "error"),
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();
  return useMutation({
    mutationFn: async (id: string) => { await apiClient.delete(`/users/me/addresses/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["addresses"] }); show("Address removed", "success"); },
    onError: (e: any) => show(e?.response?.data?.message ?? "Failed to remove", "error"),
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => { await apiClient.patch(`/users/me/addresses/${id}/default`); },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses"] }),
  });
}

// ── Wishlist ──────────────────────────────────────────────────────────────────

export function useWishlist() {
  const { isAuthenticated } = useAuthStore();
  return useQuery<any[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await apiClient.get<any[]>("/users/me/wishlist");
      return data;
    },
    enabled: isAuthenticated,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();
  return useMutation({
    mutationFn: async (productId: string) => { await apiClient.post(`/users/me/wishlist/${productId}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["wishlist"] }); show("Added to wishlist", "success"); },
    onError: (e: any) => show(e?.response?.data?.message ?? "Failed", "error"),
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();
  return useMutation({
    mutationFn: async (productId: string) => { await apiClient.delete(`/users/me/wishlist/${productId}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["wishlist"] }); show("Removed from wishlist", "success"); },
    onError: (e: any) => show(e?.response?.data?.message ?? "Failed", "error"),
  });
}
