"use client";

import { ShoppingBag, Heart, Package, Clock } from "lucide-react";
import StatCard from "@/components/portal/StatCard";
import DataTable from "@/components/portal/DataTable";
import StatusBadge from "@/components/portal/StatusBadge";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMyOrders } from "@/hooks/order.hooks";

function formatOrderItems(order: any) {
  if (!order.items?.length) return "—";
  const first = order.items[0];
  const name = typeof first.product === "object" ? first.product.name : "Item";
  return order.items.length > 1 ? `${name} +${order.items.length - 1} more` : `${name} x${first.quantity}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

const columns = [
  { key: "orderId", header: "Order" },
  { key: "_items", header: "Items", render: (row: any) => formatOrderItems(row) },
  { key: "_date", header: "Date", render: (row: any) => formatDate(row.createdAt) },
  { key: "_total", header: "Total", render: (row: any) => `₦${Number(row.total).toLocaleString()}`, className: "font-bold" },
  { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
];

export default function UserOverviewPage() {
  const { data, isLoading } = useMyOrders(1, 20);
  const orders = data?.items ?? [];
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const pending = orders.filter((o) => ["pending", "processing", "shipped"].includes(o.status)).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={String(data?.total ?? 0)} change="All time" positive icon={ShoppingBag} color="bg-blue-50 text-blue-600" delay={0} />
        <StatCard title="Delivered" value={String(delivered)} change="Completed" positive icon={Package} color="bg-green-50 text-green-600" delay={0.08} />
        <StatCard title="Wishlist Items" value="—" icon={Heart} color="bg-pink-50 text-pink-600" delay={0.16} />
        <StatCard title="Pending" value={String(pending)} icon={Clock} color="bg-yellow-50 text-yellow-600" delay={0.24} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-[#004D4A] dark:text-white">Recent Orders</h2>
          <Link href="/dashboard/user/orders" className="text-sm text-[#004D4A] dark:text-[#D0FF71] font-semibold hover:underline">View all</Link>
        </div>
        <DataTable columns={columns} data={orders.slice(0, 5)} loading={isLoading} emptyMessage="No orders yet" />
      </motion.div>
    </div>
  );
}
