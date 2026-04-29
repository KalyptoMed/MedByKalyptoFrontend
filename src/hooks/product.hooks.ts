import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";

export interface ApiProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku: string;
  status: "active" | "draft" | "out_of_stock";
  nafdacNumber?: string;
  manufacturer?: string;
  dosage?: string;
  description?: string;
  images?: string[];
  sold?: number;
  vendorId?: string;
}

export interface PaginatedProducts {
  items: ApiProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ProductPayload {
  name: string;
  category?: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku?: string;
  status?: string;
  nafdacNumber?: string;
  manufacturer?: string;
  dosage?: string;
  description?: string;
}

export function useMyProducts(page = 1, limit = 50) {
  const { user } = useAuthStore();
  return useQuery<PaginatedProducts>({
    queryKey: ["products", "mine", page, limit],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedProducts>("/products/vendor/my-products", {
        params: { page, limit },
      });
      return data;
    },
    enabled: user?.role === "vendor",
  });
}

export function usePublicProducts(params?: { page?: number; limit?: number; category?: string; search?: string }) {
  return useQuery<PaginatedProducts>({
    queryKey: ["products", "public", params],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedProducts>("/products", { params });
      return data;
    },
  });
}

export function useProductById(id: string) {
  return useQuery<ApiProduct>({
    queryKey: ["products", "detail", id],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiProduct>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useFeaturedProducts() {
  return useQuery<PaginatedProducts>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const { data } = await apiClient.get<PaginatedProducts>("/products", {
        params: { page: 1, limit: 6 },
      });
      return data;
    },
  });
}

const FALLBACK_IMAGE = "/assets/images/Drug.png";

export function apiProductToUiProduct(p: ApiProduct) {
  const discount = p.comparePrice && p.comparePrice > p.price
    ? Math.round((1 - p.price / p.comparePrice) * 100)
    : undefined;
  return {
    id: p._id,
    name: p.name,
    description: p.description ?? p.dosage ?? "",
    price: p.price,
    originalPrice: p.comparePrice,
    discount,
    rating: (p as any).rating ?? 0,
    reviewCount: (p as any).reviewCount,
    image: p.images?.[0] ?? FALLBACK_IMAGE,
    category: p.category ?? "",
    genericName: p.dosage ?? p.nafdacNumber,
    inStock: p.stock > 0 && p.status === "active",
    vendorId: p.vendorId,
  };
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (payload: ProductPayload) => {
      const { data } = await apiClient.post<ApiProduct>("/products", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      show("Product published", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Failed to publish product", "error");
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<ProductPayload> }) => {
      const { data } = await apiClient.patch<ApiProduct>(`/products/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      show("Product updated", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Update failed", "error");
    },
  });
}

export function useBulkUpdateProducts() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (updates: Array<{ id: string; data: Partial<ProductPayload> }>) => {
      const { data } = await apiClient.patch("/products/bulk/update", { updates });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      show("Products saved", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Bulk save failed", "error");
    },
  });
}

export function useBulkDeleteProducts() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const { data } = await apiClient.patch("/products/bulk/delete", { ids });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      show("Products removed", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Delete failed", "error");
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await apiClient.delete(`/products/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      show("Product removed", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Delete failed", "error");
    },
  });
}
