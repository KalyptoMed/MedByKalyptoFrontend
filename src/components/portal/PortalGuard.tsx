"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import PageLoader from "@/components/ui/PageLoader";

interface Props {
  children: React.ReactNode;
  requiredRole?: "user" | "vendor" | "admin";
}

export default function PortalGuard({ children, requiredRole }: Props) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated || !user) {
      router.replace("/auth/login");
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, [mounted, isAuthenticated, user, requiredRole, router]);

  // Hold until the Zustand persist store has rehydrated from localStorage
  if (!mounted || !isAuthenticated || !user) {
    return <PageLoader message="Verifying session..." />;
  }

  // Prevent flash of wrong-role content while redirect fires
  if (requiredRole && user.role !== requiredRole) {
    return <PageLoader message="Redirecting..." />;
  }

  return <>{children}</>;
}
