"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download } from "lucide-react";
import DataTable from "@/components/portal/DataTable";
import StatusBadge from "@/components/portal/StatusBadge";
import Papa from "papaparse";
import { useAdminOrders } from "@/hooks/admin.hooks";

const statusFilters = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function customerName(c: any) {
  if (!c) return "—";
  return typeof c === "object" ? `${c.firstName} ${c.lastName}` : c;
}

function vendorName(v: any) {
  if (!v) return "—";
  return typeof v === "object" ? v.storeName : v;
}

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { data, isLoading } = useAdminOrders(1, 100);

  const orders = data?.items ?? [];
  const filtered = orders.filter((o) => {
    const matchFilter = filter === "All" || o.status === filter.toLowerCase();
    const id = o.orderId ?? o._id;
    const cust = customerName(o.customer);
    const matchSearch = id.toLowerCase().includes(search.toLowerCase()) || cust.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const exportCSV = () => {
    const rows = filtered.map((o) => ({
      orderId: o.orderId ?? o._id,
      customer: customerName(o.customer),
      vendor: vendorName((o as any).vendor),
      total: o.total,
      status: o.status,
      date: fmtDate(o.createdAt),
    }));
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "orders.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    { key: "_id", header: "Order ID", render: (row: any) => row.orderId ?? row._id },
    { key: "_customer", header: "Customer", render: (row: any) => customerName(row.customer) },
    { key: "_vendor", header: "Vendor", render: (row: any) => vendorName((row as any).vendor) },
    { key: "_date", header: "Date", render: (row: any) => fmtDate(row.createdAt) },
    { key: "_total", header: "Total", render: (row: any) => `₦${Number(row.total).toLocaleString()}`, className: "font-bold" },
    { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID or customer..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A]" />
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:border-[#004D4A] hover:text-[#004D4A] transition">
          <Download size={14} /> Export CSV
        </motion.button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusFilters.map((f) => (
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
