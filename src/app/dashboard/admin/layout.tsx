"use client";

import { useState } from "react";
import { LayoutDashboard, Users, Store, Package, ShoppingBag, BarChart3, Settings, ShieldCheck } from "lucide-react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";
import PortalGuard from "@/components/portal/PortalGuard";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Vendors", href: "/dashboard/admin/vendors", icon: Store },
  { label: "Products", href: "/dashboard/admin/products", icon: Package },
  { label: "Orders", href: "/dashboard/admin/orders", icon: ShoppingBag },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard/admin": { title: "Admin Dashboard", subtitle: "Platform overview" },
  "/dashboard/admin/users": { title: "Users", subtitle: "Manage platform users" },
  "/dashboard/admin/vendors": { title: "Vendors", subtitle: "Approve & manage vendors" },
  "/dashboard/admin/products": { title: "Products", subtitle: "Platform product oversight" },
  "/dashboard/admin/orders": { title: "Orders", subtitle: "All platform orders" },
  "/dashboard/admin/analytics": { title: "Analytics", subtitle: "Platform metrics & insights" },
  "/dashboard/admin/settings": { title: "Settings", subtitle: "Platform configuration" },
};

export default function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "Admin Portal", subtitle: "" };

  return (
    <PortalGuard requiredRole="admin">
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <PortalSidebar items={navItems} role="admin" open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <PortalHeader title={page.title} subtitle={page.subtitle} onMenuClick={() => setSidebarOpen(true)} badge={<span className="hidden sm:flex items-center gap-1 text-xs font-bold bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full"><ShieldCheck size={11} /> Admin</span>} />
          <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </PortalGuard>
  );
}
