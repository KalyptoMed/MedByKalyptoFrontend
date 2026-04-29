import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";

export interface ApiOrder {
  _id: string;
  orderId?: string;
  customer?: string | { firstName: string; lastName: string; _id: string };
  vendor?: string | { storeName: string; _id: string };
  items: Array<{ product: string | { name: string; _id: string }; quantity: number; price: number }>;
  total: number;
  status: string;
  paymentStatus?: string;
  paymentMethod?: "paystack" | "bank_transfer";
  paymentEvidence?: string;
  paymentRef?: string;
  deliveryAddress?: Record<string, string>;
  createdAt: string;
}

export interface ApiTransaction extends ApiOrder {
  fee: number;
  net: number;
}

export interface PaginatedOrders {
  items: ApiOrder[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateOrderPayload {
  items: Array<{ productId?: string; vendorId?: string; name: string; quantity: number; price: number; image?: string }>;
  shippingAddress: { street: string; city: string; state: string; country: string; postalCode: string };
  paymentReference?: string;
  paymentMethod?: "paystack" | "bank_transfer";
  deliveryNotes?: string;
}

export function useMyOrders(page = 1, limit = 20) {
  const { isAuthenticated } = useAuthStore();
  return useQuery<PaginatedOrders>({
    queryKey: ["orders", "mine", page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedOrders>("/orders/my-orders", { params: { page, limit } });
      return data;
    },
    enabled: isAuthenticated,
  });
}

export function useVendorOrders(page = 1, limit = 20) {
  const { user } = useAuthStore();
  return useQuery<PaginatedOrders>({
    queryKey: ["orders", "vendor", page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedOrders>("/orders/vendor/orders", { params: { page, limit } });
      return data;
    },
    enabled: user?.role === "vendor",
  });
}

export function useVendorTransactions(page = 1, limit = 20) {
  const { user } = useAuthStore();
  return useQuery<PaginatedOrders>({
    queryKey: ["transactions", "vendor", page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedOrders>("/orders/vendor/transactions", { params: { page, limit } });
      return data;
    },
    enabled: user?.role === "vendor",
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const { data } = await apiClient.post<ApiOrder>("/orders", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Failed to place order", "error");
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await apiClient.patch(`/orders/${id}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      show("Order status updated", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Update failed", "error");
    },
  });
}

export function useUploadEvidence() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async ({ orderId, file }: { orderId: string; file: File }) => {
      const form = new FormData();
      form.append("evidence", file);
      const { data } = await apiClient.patch(`/orders/${orderId}/evidence`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      show("Payment evidence uploaded", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Upload failed", "error");
    },
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (orderId: string) => {
      const { data } = await apiClient.patch(`/orders/${orderId}/confirm-payment`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      show("Payment confirmed — order is now active", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Confirmation failed", "error");
    },
  });
}
