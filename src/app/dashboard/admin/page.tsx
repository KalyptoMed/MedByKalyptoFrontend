"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/portal/StatCard";
import DataTable from "@/components/portal/DataTable";
import StatusBadge from "@/components/portal/StatusBadge";
import { Users, Store, Package, TrendingUp, AlertTriangle } from "lucide-react";
import { useAdminUsers, useAdminVendors, useAdminOrders } from "@/hooks/admin.hooks";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function customerName(c: any) {
  if (!c) return "—";
  return typeof c === "object" ? `${c.firstName} ${c.lastName}` : c;
}

export default function AdminOverviewPage() {
  const { data: usersData, isLoading: uLoading } = useAdminUsers(1, 1);
  const { data: vendorsData, isLoading: vLoading } = useAdminVendors(1, 50);
  const { data: ordersData, isLoading: oLoading } = useAdminOrders(1, 10);

  const vendors = vendorsData?.items ?? [];
  const pendingVendors = vendors.filter((v) => v.status === "pending");
  const recentOrders = ordersData?.items ?? [];

  const orderCols = [
    { key: "_id", header: "Order ID", render: (row: any) => row.orderId ?? row._id },
    { key: "_customer", header: "Customer", render: (row: any) => customerName(row.customer) },
    { key: "_date", header: "Date", render: (row: any) => fmtDate(row.createdAt) },
    { key: "_total", header: "Total", render: (row: any) => `₦${Number(row.total).toLocaleString()}`, className: "font-bold" },
    { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  const vendorCols = [
    { key: "storeName", header: "Store Name" },
    { key: "phone", header: "Phone" },
    { key: "_date", header: "Applied", render: (row: any) => row.createdAt ? fmtDate(row.createdAt) : "—" },
    { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  const alerts = [
    pendingVendors.length > 0 && { text: `${pendingVendors.length} vendor${pendingVendors.length > 1 ? "s" : ""} awaiting approval`, color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800" },
  ].filter(Boolean) as { text: string; color: string }[];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={uLoading ? "..." : String(usersData?.total ?? 0)} change="Registered" positive icon={Users} color="bg-blue-50 text-blue-600" delay={0} />
        <StatCard title="Active Vendors" value={vLoading ? "..." : String(vendors.filter((v) => v.status === "approved").length)} change="Approved" positive icon={Store} color="bg-purple-50 text-purple-600" delay={0.06} />
        <StatCard title="Total Orders" value={oLoading ? "..." : String(ordersData?.total ?? 0)} change="All time" positive icon={Package} color="bg-[#004D4A]/10 text-[#004D4A]" delay={0.12} />
        <StatCard title="Pending Vendors" value={vLoading ? "..." : String(pendingVendors.length)} icon={TrendingUp} color="bg-yellow-50 text-yellow-600" delay={0.18} />
      </div>

      {alerts.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          {alerts.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 + i * 0.06 }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium flex-1 ${a.color}`}>
              <AlertTriangle size={15} /> {a.text}
            </motion.div>
          ))}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-[#004D4A] dark:text-white">Pending Vendor Approvals</h2>
          <a href="/dashboard/admin/vendors" className="text-xs font-bold text-[#004D4A] dark:text-[#D0FF71] hover:underline">View all</a>
        </div>
        <DataTable columns={vendorCols} data={pendingVendors} loading={vLoading} emptyMessage="No pending vendors" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-[#004D4A] dark:text-white">Recent Orders</h2>
          <a href="/dashboard/admin/orders" className="text-xs font-bold text-[#004D4A] dark:text-[#D0FF71] hover:underline">View all</a>
        </div>
        <DataTable columns={orderCols} data={recentOrders} loading={oLoading} />
      </div>
    </div>
  );
}
