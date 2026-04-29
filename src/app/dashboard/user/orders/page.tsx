"use client";

import { useState } from "react";
import DataTable from "@/components/portal/DataTable";
import StatusBadge from "@/components/portal/StatusBadge";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMyOrders } from "@/hooks/order.hooks";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function formatItems(order: any) {
  if (!order.items?.length) return "—";
  const first = order.items[0];
  const name = typeof first.product === "object" ? first.product.name : "Item";
  return order.items.length > 1 ? `${name} +${order.items.length - 1} more` : `${name} x${first.quantity}`;
}

const filters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function UserOrdersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useMyOrders(1, 50);
  const allOrders = data?.items ?? [];

  const filtered = allOrders.filter((o) => {
    const matchFilter = filter === "All" || o.status.toLowerCase() === filter.toLowerCase();
    const id = o.orderId ?? o._id;
    const matchSearch = id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const columns = [
    { key: "_id", header: "Order ID", render: (row: any) => row.orderId ?? row._id },
    { key: "_items", header: "Items", render: (row: any) => formatItems(row) },
    { key: "_date", header: "Date", render: (row: any) => formatDate(row.createdAt) },
    { key: "_total", header: "Total", render: (row: any) => `₦${Number(row.total).toLocaleString()}`, className: "font-bold" },
    { key: "_pay", header: "Payment", render: (row: any) => <StatusBadge status={row.paymentStatus ?? "paid"} /> },
    { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A]" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <motion.button key={f} whileTap={{ scale: 0.95 }} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${filter === f ? "bg-[#004D4A] text-[#D0FF71]" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
            {f}
          </motion.button>
        ))}
      </div>
      <DataTable columns={columns} data={filtered} loading={isLoading} emptyMessage="No orders found" />
    </div>
  );
}
