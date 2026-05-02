import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/store/authStore";
import { useToastStore } from "@/store/toastStore";

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface VendorProfile {
  _id: string;
  userId: string | { _id: string; firstName: string; lastName: string; email: string; phone?: string };
  storeName: string;
  storeDescription: string;
  phone: string;
  address: string;
  cacNumber: string;
  nafdacNumber: string;
  status: "pending" | "approved" | "suspended";
  logo?: string;
  storeLogo?: string;
  bankAccount?: BankAccount;
}

export interface VendorStats {
  totalRevenue: number;
  totalOrders: number;
  activeProducts: number;
  growthPercent: number;
  pendingPayout: number;
}

interface UpdateVendorPayload {
  storeName?: string;
  storeDescription?: string;
  phone?: string;
  address?: string;
  cacNumber?: string;
  nafdacNumber?: string;
  logo?: string;
  bankAccount?: Partial<BankAccount>;
}

export function useVendorProfile() {
  const { user } = useAuthStore();
  return useQuery<VendorProfile>({
    queryKey: ["vendor", "profile"],
    queryFn: async () => {
      const { data } = await apiClient.get<VendorProfile>("/vendors/me");
      return data;
    },
    enabled: user?.role === "vendor",
  });
}

export function useVendorStats() {
  const { user } = useAuthStore();
  return useQuery<VendorStats>({
    queryKey: ["vendor", "stats"],
    queryFn: async () => {
      const { data } = await apiClient.get<VendorStats>("/vendors/me/stats");
      return data;
    },
    enabled: user?.role === "vendor",
  });
}

export function useUpdateVendorProfile() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (payload: UpdateVendorPayload) => {
      const { data } = await apiClient.patch<VendorProfile>("/vendors/me", payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["vendor", "profile"], data);
      show("Store settings saved", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Update failed", "error");
    },
  });
}

export function useVendorById(vendorId: string | undefined) {
  return useQuery<VendorProfile>({
    queryKey: ["vendor", "public", vendorId],
    queryFn: async () => {
      const { data } = await apiClient.get<VendorProfile>(`/vendors/${vendorId}`);
      return data;
    },
    enabled: !!vendorId,
  });
}

export function useOnboardVendor() {
  const queryClient = useQueryClient();
  const { show } = useToastStore();

  return useMutation({
    mutationFn: async (payload: UpdateVendorPayload) => {
      const { data } = await apiClient.post<VendorProfile>("/vendors/onboard", payload);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["vendor", "profile"], data);
      show("Vendor profile created", "success");
    },
    onError: (error: any) => {
      show(error?.response?.data?.message ?? "Onboarding failed", "error");
    },
  });
}
