"use client";

import { useState } from "react";
import { LayoutDashboard, Package, ShoppingBag, Wallet, Settings, PlusCircle, TableProperties, Clock, AlertTriangle } from "lucide-react";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalHeader from "@/components/portal/PortalHeader";
import PortalGuard from "@/components/portal/PortalGuard";
import { usePathname } from "next/navigation";
import { useVendorProfile } from "@/hooks/vendor.hooks";

const ALL_NAV_ITEMS = [
  { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard, requiresApproval: false },
  { label: "My Products", href: "/dashboard/vendor/products", icon: Package, requiresApproval: true },
  { label: "Add Product", href: "/dashboard/vendor/products/add", icon: PlusCircle, requiresApproval: true },
  { label: "Bulk Editor", href: "/dashboard/vendor/products/bulk", icon: TableProperties, requiresApproval: true },
  { label: "Orders", href: "/dashboard/vendor/orders", icon: ShoppingBag, requiresApproval: true },
  { label: "Transactions", href: "/dashboard/vendor/transactions", icon: Wallet, requiresApproval: true },
  { label: "Settings", href: "/dashboard/vendor/settings", icon: Settings, requiresApproval: false },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard/vendor": { title: "Vendor Dashboard", subtitle: "Manage your store" },
  "/dashboard/vendor/products": { title: "My Products", subtitle: "Manage your catalogue" },
  "/dashboard/vendor/products/add": { title: "Add Product", subtitle: "List a new product" },
  "/dashboard/vendor/products/bulk": { title: "Bulk Editor", subtitle: "Edit multiple products at once" },
  "/dashboard/vendor/orders": { title: "Orders", subtitle: "Manage incoming orders" },
  "/dashboard/vendor/transactions": { title: "Transactions", subtitle: "View your earnings" },
  "/dashboard/vendor/settings": { title: "Store Settings", subtitle: "Manage your store profile" },
};

function ApprovalBanner({ status }: { status: "pending" | "suspended" }) {
  if (status === "suspended") {
    return (
      <div className="mx-4 md:mx-6 mt-4 flex items-start gap-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl px-4 py-3">
        <AlertTriangle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-bold text-red-700 dark:text-red-400 text-sm">Account Suspended</p>
          <p className="text-red-600 dark:text-red-500 text-xs mt-0.5">Your vendor account has been suspended. Contact support to resolve this.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-4 md:mx-6 mt-4 flex items-start gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-3">
      <Clock size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-bold text-amber-700 dark:text-amber-400 text-sm">Pending Approval</p>
        <p className="text-amber-600 dark:text-amber-500 text-xs mt-0.5">Your account is under review. You will be able to list products once an admin approves your store.</p>
      </div>
    </div>
  );
}

export default function VendorPortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const page = pageTitles[pathname] ?? { title: "Vendor Portal", subtitle: "" };
  const { data: vendorProfile } = useVendorProfile();

  const isApproved = vendorProfile?.status === "approved";
  const navItems = ALL_NAV_ITEMS.filter((item) => !item.requiresApproval || isApproved);

  return (
    <PortalGuard requiredRole="vendor">
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <PortalSidebar items={navItems} role="vendor" open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <PortalHeader title={page.title} subtitle={page.subtitle} onMenuClick={() => setSidebarOpen(true)} />
          {vendorProfile && vendorProfile.status !== "approved" && (
            <ApprovalBanner status={vendorProfile.status} />
          )}
          <main className="flex-1 p-4 md:p-6 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </PortalGuard>
  );
}
