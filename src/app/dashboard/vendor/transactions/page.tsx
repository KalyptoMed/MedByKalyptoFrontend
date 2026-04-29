"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import StatCard from "@/components/portal/StatCard";
import DataTable from "@/components/portal/DataTable";
import StatusBadge from "@/components/portal/StatusBadge";
import { Wallet, TrendingUp, ArrowDownLeft, Download } from "lucide-react";
import Papa from "papaparse";
import { useVendorTransactions } from "@/hooks/order.hooks";
import { useVendorStats } from "@/hooks/vendor.hooks";

const COMMISSION = 0.03;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function customerName(c: any) {
  if (!c) return "—";
  return typeof c === "object" ? `${c.firstName} ${c.lastName}` : c;
}

export default function VendorTransactionsPage() {
  const [period, setPeriod] = useState("all");
  const { data: txData, isLoading } = useVendorTransactions(1, 50);
  const { data: stats } = useVendorStats();

  const transactions = txData?.items ?? [];

  const exportCSV = () => {
    const rows = transactions.map((t) => ({
      ref: t._id,
      order: t.orderId ?? t._id,
      customer: customerName(t.customer),
      amount: t.total,
      fee: +(t.total * COMMISSION).toFixed(2),
      net: +(t.total * (1 - COMMISSION)).toFixed(2),
      status: t.paymentStatus ?? t.status,
      date: fmtDate(t.createdAt),
    }));
    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "transactions.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    { key: "_ref", header: "Reference", render: (row: any) => <span className="font-mono text-xs">{row._id.slice(-8).toUpperCase()}</span> },
    { key: "_order", header: "Order", render: (row: any) => row.orderId ?? row._id },
    { key: "_customer", header: "Customer", render: (row: any) => customerName(row.customer) },
    { key: "_date", header: "Date", render: (row: any) => fmtDate(row.createdAt) },
    { key: "_amount", header: "Amount", render: (row: any) => `₦${Number(row.total).toLocaleString()}` },
    { key: "_fee", header: "Fee (3%)", render: (row: any) => `₦${(row.total * COMMISSION).toFixed(0)}` },
    { key: "_net", header: "Net", render: (row: any) => `₦${(row.total * (1 - COMMISSION)).toFixed(0)}`, className: "font-bold text-[#004D4A] dark:text-[#D0FF71]" },
    { key: "_status", header: "Status", render: (row: any) => <StatusBadge status={row.paymentStatus ?? row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Earned" value={stats ? `₦${stats.totalRevenue.toLocaleString()}` : "..."} change="All time" positive icon={Wallet} color="bg-[#004D4A]/10 text-[#004D4A]" delay={0} />
        <StatCard title="Pending Payout" value={stats ? `₦${stats.pendingPayout.toLocaleString()}` : "..."} icon={ArrowDownLeft} color="bg-yellow-50 text-yellow-600" delay={0.08} />
        <StatCard title="Growth" value={stats ? `+${stats.growthPercent}%` : "..."} change="vs last month" positive icon={TrendingUp} color="bg-green-50 text-green-600" delay={0.16} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex gap-2">
          {["all", "this_month", "last_month"].map((p) => (
            <motion.button key={p} whileTap={{ scale: 0.95 }} onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${period === p ? "bg-[#004D4A] text-[#D0FF71]" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
              {p === "all" ? "All Time" : p === "this_month" ? "This Month" : "Last Month"}
            </motion.button>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:border-[#004D4A] hover:text-[#004D4A] transition">
          <Download size={14} /> Export CSV
        </motion.button>
      </div>

      <DataTable columns={columns} data={transactions} loading={isLoading} emptyMessage="No transactions yet" />
    </div>
  );
}
