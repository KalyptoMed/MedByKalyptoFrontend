"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StatCard from "@/components/portal/StatCard";
import DataTable from "@/components/portal/DataTable";
import StatusBadge from "@/components/portal/StatusBadge";
import { Wallet, ShoppingBag, Package, TrendingUp, Plus, TableProperties } from "lucide-react";
import { useVendorStats } from "@/hooks/vendor.hooks";
import { useVendorOrders } from "@/hooks/order.hooks";

function fmt(n: number) { return `₦${n.toLocaleString()}`; }
function fmtDate(iso: string) { return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }); }

function orderLabel(o: any) {
  const first = o.items?.[0];
  if (!first) return "—";
  const name = typeof first.product === "object" ? first.product.name : "Item";
  return o.items.length > 1 ? `${name} +${o.items.length - 1}` : `${name} x${first.quantity}`;
}

const columns = [
  { key: "_id", header: "Order ID", render: (row: any) => row.orderId ?? row._id },
  { key: "_customer", header: "Customer", render: (row: any) => {
    const c = row.customer;
    return typeof c === "object" ? `${c.firstName} ${c.lastName}` : (c ?? "—");
  }},
  { key: "_product", header: "Product", render: orderLabel },
  { key: "_date", header: "Date", render: (row: any) => fmtDate(row.createdAt) },
  { key: "_total", header: "Total", render: (row: any) => fmt(row.total), className: "font-bold" },
  { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
];

const quickActions = [
  { label: "Add Product", sub: "List a new item", href: "/dashboard/vendor/products/add", icon: Plus, accent: "bg-[#004D4A] text-[#D0FF71]" },
  { label: "Bulk Editor", sub: "Edit many at once", href: "/dashboard/vendor/products/bulk", icon: TableProperties, accent: "bg-[#D0FF71] text-[#004D4A]" },
];

export default function VendorOverviewPage() {
  const { data: stats, isLoading: statsLoading } = useVendorStats();
  const { data: ordersData, isLoading: ordersLoading } = useVendorOrders(1, 5);
  const orders = ordersData?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={statsLoading ? "..." : fmt(stats?.totalRevenue ?? 0)} change="All time" positive icon={Wallet} color="bg-[#004D4A]/10 text-[#004D4A]" delay={0} />
        <StatCard title="Total Orders" value={statsLoading ? "..." : String(stats?.totalOrders ?? 0)} change="All time" positive icon={ShoppingBag} color="bg-blue-50 text-blue-600" delay={0.06} />
        <StatCard title="Active Products" value={statsLoading ? "..." : String(stats?.activeProducts ?? 0)} icon={Package} color="bg-purple-50 text-purple-600" delay={0.12} />
        <StatCard title="Growth" value={statsLoading ? "..." : `+${stats?.growthPercent ?? 0}%`} change="vs last month" positive icon={TrendingUp} color="bg-green-50 text-green-600" delay={0.18} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map(({ label, sub, href, icon: Icon, accent }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 + i * 0.08 }}>
            <Link href={href}>
              <div className="flex items-center gap-4 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-md transition cursor-pointer group">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}><Icon size={20} /></div>
                <div>
                  <p className="font-extrabold text-[#004D4A] dark:text-white group-hover:text-[#006B67] transition">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-[#004D4A] dark:text-white">Recent Orders</h2>
          <Link href="/dashboard/vendor/orders" className="text-xs font-bold text-[#004D4A] dark:text-[#D0FF71] hover:underline">View all</Link>
        </div>
        <DataTable columns={columns} data={orders} loading={ordersLoading} emptyMessage="No orders yet" />
      </div>
    </div>
  );
}
