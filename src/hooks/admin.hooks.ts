import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import type { AuthUser } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";
import type { PaginatedOrders } from "./order.hooks";
import type { PaginatedProducts } from "./product.hooks";

export interface PaginatedUsers {
  items: AuthUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminVendorItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  profile: {
    _id: string;
    storeName: string;
    storeDescription?: string;
    phone?: string;
    address?: string;
    cacNumber?: string;
    nafdacNumber?: string;
    status: "pending" | "approved" | "suspended";
  } | null;
}

export interface PaginatedVendors {
  items: AdminVendorItem[];
  total: number;
  page: number;
  totalPages: number;
}

export function useAdminUsers(page = 1, limit = 20) {
  return useQuery<PaginatedUsers>({
    queryKey: ["admin", "users", page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedUsers>("/users", { params: { page, limit } });
      return data;
    },
  });
}

export function useAdminVendors(page = 1, limit = 20) {
  return useQuery<PaginatedVendors>({
    queryKey: ["admin", "vendors", page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedVendors>("/vendors", { params: { page, limit } });
      return data as PaginatedVendors;
    },
  });
}

export function useAdminOrders(page = 1, limit = 20) {
  return useQuery<PaginatedOrders>({
    queryKey: ["admin", "orders", page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedOrders>("/orders", { params: { page, limit } });
      return data;
    },
  });
}

export function useAdminProducts(page = 1, limit = 50, category?: string, search?: string) {
  return useQuery<PaginatedProducts>({
    queryKey: ["admin", "products", page, limit, category, search],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedProducts>("/products", {
        params: { page, limit, category, search },
      });
      return data;
    },
  });
}

export function useApproveVendor() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "approved" | "suspended" | "pending" }) => {
      const { data } = await apiClient.patch(`/vendors/${id}/approve`, { status });
      return data;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "vendors"] });
      show(`Vendor ${status}`, "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Action failed", "error");
    },
  });
}

export function useDeactivateUser() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.patch(`/users/${id}/deactivate`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      show("User deactivated", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Action failed", "error");
    },
  });
}
