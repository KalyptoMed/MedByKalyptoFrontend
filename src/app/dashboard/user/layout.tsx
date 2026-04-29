"use client";

import { useState } from "react";
import { LayoutDashboard, ShoppingBag, Heart, MapPin, User, Settings } from "lucide-react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";
import PortalGuard from "@/components/portal/PortalGuard";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
  { label: "My Orders", href: "/dashboard/user/orders", icon: ShoppingBag },
  { label: "Wishlist", href: "/dashboard/user/wishlist", icon: Heart },
  { label: "Addresses", href: "/dashboard/user/addresses", icon: MapPin },
  { label: "Profile", href: "/dashboard/user/profile", icon: User },
  { label: "Settings", href: "/dashboard/user/settings", icon: Settings },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard/user": { title: "My Dashboard", subtitle: "Welcome back!" },
  "/dashboard/user/orders": { title: "My Orders", subtitle: "Track your purchases" },
  "/dashboard/user/wishlist": { title: "Wishlist", subtitle: "Saved items" },
  "/dashboard/user/addresses": { title: "Addresses", subtitle: "Manage delivery addresses" },
  "/dashboard/user/profile": { title: "Profile", subtitle: "Manage your account" },
  "/dashboard/user/settings": { title: "Settings", subtitle: "Security & preferences" },
};

export default function UserPortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "Dashboard", subtitle: "" };

  return (
    <PortalGuard requiredRole="user">
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <PortalSidebar items={navItems} role="user" open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <PortalHeader title={page.title} subtitle={page.subtitle} onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 md:p-6 max-w-6xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </PortalGuard>
  );
}
