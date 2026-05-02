"use client";

import { motion } from "framer-motion";
import StatCard from "@/components/portal/StatCard";
import { DollarSign, Users, ShoppingBag, Store, Package } from "lucide-react";
import { useAdminOrders, useAdminUsers, useAdminVendors, useAdminProducts } from "@/hooks/admin.hooks";

export default function AdminAnalyticsPage() {
  const { data: ordersData, isLoading: oLoading } = useAdminOrders(1, 100);
  const { data: usersData, isLoading: uLoading } = useAdminUsers(1, 1);
  const { data: vendorsData, isLoading: vLoading } = useAdminVendors(1, 1);
  useAdminProducts(1, 1);

  const orders = ordersData?.items ?? [];
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);

  // Group orders by month for chart
  const monthMap: Record<string, number> = {};
  orders.forEach((o) => {
    const month = new Date(o.createdAt).toLocaleString("en-NG", { month: "short" });
    monthMap[month] = (monthMap[month] ?? 0) + Number(o.total);
  });
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = months.map((m) => ({ month: m, value: monthMap[m] ?? 0 })).filter((d, i) => {
    const now = new Date();
    return i <= now.getMonth();
  });
  const maxVal = Math.max(...chartData.map((d) => d.value), 1);

  // Top vendors by order count
  const vendorCounts: Record<string, { name: string; count: number; revenue: number }> = {};
  orders.forEach((o) => {
    const v = (o as any).vendor;
    const id = typeof v === "object" ? v._id : v ?? "unknown";
    const name = typeof v === "object" ? v.storeName : "Unknown Vendor";
    if (!vendorCounts[id]) vendorCounts[id] = { name, count: 0, revenue: 0 };
    vendorCounts[id].count++;
    vendorCounts[id].revenue += Number(o.total);
  });
  const topVendors = Object.values(vendorCounts).sort((a, b) => b.revenue - a.revenue).slice(0, 4);
  const maxVRevenue = Math.max(...topVendors.map((v) => v.revenue), 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Platform GMV" value={oLoading ? "..." : `₦${totalRevenue.toLocaleString()}`} change="Gross" positive icon={DollarSign} color="bg-green-50 text-green-600" delay={0} />
        <StatCard title="Total Orders" value={oLoading ? "..." : String(ordersData?.total ?? 0)} change="All time" positive icon={ShoppingBag} color="bg-blue-50 text-blue-600" delay={0.06} />
        <StatCard title="Total Users" value={uLoading ? "..." : String(usersData?.total ?? 0)} change="Registered" positive icon={Users} color="bg-purple-50 text-purple-600" delay={0.12} />
        <StatCard title="Active Vendors" value={vLoading ? "..." : String(vendorsData?.total ?? 0)} change="Total" positive icon={Store} color="bg-[#004D4A]/10 text-[#004D4A]" delay={0.18} />
      </div>

      {/* Revenue chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="font-extrabold text-[#004D4A] dark:text-white mb-6">Revenue by Month</h2>
        <div className="flex items-end gap-2" style={{ height: "160px" }}>
          {chartData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative flex items-end justify-center" style={{ height: "120px" }}>
                <motion.div
                  initial={{ height: 0 }} animate={{ height: d.value > 0 ? `${(d.value / maxVal) * 100}%` : "4px" }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: "easeOut" }}
                  className={`w-full rounded-t-xl ${d.value > 0 ? "bg-[#004D4A]" : "bg-gray-100 dark:bg-gray-800"}`} />
              </div>
              <p className="text-xs text-gray-400 font-semibold">{d.month}</p>
              {d.value > 0 && <p className="text-[10px] text-[#004D4A] dark:text-[#D0FF71] font-bold">₦{(d.value / 1000).toFixed(0)}k</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top vendors */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-extrabold text-[#004D4A] dark:text-white mb-4 flex items-center gap-2"><Store size={16} /> Top Vendors</h2>
          {topVendors.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet</p>
          ) : (
            <div className="space-y-4">
              {topVendors.map((v, i) => (
                <motion.div key={v.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{v.name}</p>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-[#004D4A] dark:text-[#D0FF71]">₦{v.revenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">{v.count} orders</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(v.revenue / maxVRevenue) * 100}%` }}
                      transition={{ duration: 0.7, delay: 0.3 + i * 0.06 }}
                      className="h-full bg-[#004D4A] dark:bg-[#D0FF71] rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Order status breakdown */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-extrabold text-[#004D4A] dark:text-white mb-4 flex items-center gap-2"><Package size={16} /> Order Status</h2>
          {oLoading ? (
            <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />)}</div>
          ) : (
            <div className="space-y-3">
              {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((status, i) => {
                const count = orders.filter((o) => o.status === status).length;
                const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
                const colors: Record<string, string> = { pending: "bg-yellow-400", confirmed: "bg-blue-400", shipped: "bg-purple-400", delivered: "bg-green-500", cancelled: "bg-red-400" };
                return (
                  <motion.div key={status} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">{status}</p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{count} <span className="text-xs text-gray-400">({pct}%)</span></p>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, delay: 0.3 + i * 0.06 }}
                        className={`h-full rounded-full ${colors[status]}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
