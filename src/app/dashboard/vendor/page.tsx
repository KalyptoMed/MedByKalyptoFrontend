"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, Package, ShoppingBag, BarChart3, Settings, LogOut,
  Plus, TrendingUp, TrendingDown, DollarSign, Eye, Edit, Trash2, ChevronRight,
  Users, Star, CheckCircle, Clock, Truck,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { allProducts } from "@/lib/products";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "My Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const mockOrders = [
  { id: "MC-V001", customer: "Adaeze O.", product: "DOXYCAP", qty: 2, total: 4000, status: "delivered" as const, date: "Apr 15" },
  { id: "MC-V002", customer: "Emeka N.", product: "AMOXIL", qty: 1, total: 1800, status: "shipped" as const, date: "Apr 17" },
  { id: "MC-V003", customer: "Fatima Y.", product: "METFORMIN", qty: 3, total: 7500, status: "processing" as const, date: "Apr 19" },
  { id: "MC-V004", customer: "Chidi O.", product: "COARTEM", qty: 1, total: 2800, status: "pending" as const, date: "Apr 20" },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-700", icon: Package },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-700", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-700", icon: Clock },
};

const analyticsData = [
  { month: "Jan", sales: 45000 }, { month: "Feb", sales: 62000 }, { month: "Mar", sales: 55000 },
  { month: "Apr", sales: 78000 }, { month: "May", sales: 0 }, { month: "Jun", sales: 0 },
];
const maxSales = Math.max(...analyticsData.map((d) => d.sales));

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const vendorProducts = allProducts.slice(0, 6);

  if (!user || user.role !== "vendor") {
    return (
      <main className="min-h-screen bg-[#F8FFFE] pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#004D4A] font-bold text-xl mb-4">Vendor access required</p>
          <Link href="/auth/login" className="bg-[#004D4A] text-[#D0FF71] px-8 py-4 rounded-2xl font-bold">Sign In as Vendor</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FFFE] pt-20 page-wrapper">
      {/* Header */}
      <div className="bg-[#004D4A] py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#D0FF71] flex items-center justify-center text-[#004D4A] font-extrabold text-2xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-[#9BD0CC] text-sm">Vendor Dashboard</p>
              <h1 className="text-3xl font-extrabold text-white">{user.name}</h1>
              <p className="text-[#9BD0CC] text-sm">{user.email}</p>
            </div>
          </div>
          <Link
            href="#"
            className="hidden md:flex items-center gap-2 bg-[#D0FF71] text-[#004D4A] px-5 py-2.5 rounded-xl font-bold hover:bg-[#BEFF3D] transition"
          >
            <Plus size={18} /> Add Product
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-60 flex-shrink-0">
            <div className="bg-white rounded-3xl p-4 shadow-card">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition mb-1 ${
                    activeTab === id ? "bg-[#004D4A] text-[#D0FF71]" : "text-gray-600 hover:bg-[#EBFFF5] hover:text-[#004D4A]"
                  }`}
                >
                  <Icon size={17} /> {label}
                </button>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => { logout(); router.push("/"); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut size={17} /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Revenue", value: "₦240,000", icon: DollarSign, trend: "+18%", up: true, color: "bg-green-50 text-green-600" },
                    { label: "Total Orders", value: "48", icon: ShoppingBag, trend: "+12%", up: true, color: "bg-blue-50 text-blue-600" },
                    { label: "Active Products", value: "24", icon: Package, trend: "+3", up: true, color: "bg-purple-50 text-purple-600" },
                    { label: "Avg. Rating", value: "4.7", icon: Star, trend: "+0.2", up: true, color: "bg-yellow-50 text-yellow-600" },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card">
                        <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                          <Icon size={18} />
                        </div>
                        <p className="text-2xl font-extrabold text-[#004D4A]">{stat.value}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
                        <div className={`flex items-center gap-1 mt-1 text-xs font-semibold ${stat.up ? "text-green-600" : "text-red-500"}`}>
                          {stat.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                          {stat.trend} this month
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-3xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-extrabold text-[#004D4A] text-lg">Recent Orders</h2>
                    <button onClick={() => setActiveTab("orders")} className="text-sm text-[#004D4A] font-semibold hover:underline flex items-center gap-1">
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {mockOrders.slice(0, 3).map((order) => {
                      const status = statusConfig[order.status];
                      const StatusIcon = status.icon;
                      return (
                        <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-[#EBFFF5] flex items-center justify-center flex-shrink-0">
                            <ShoppingBag size={17} className="text-[#004D4A]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#004D4A] text-sm">{order.customer}</p>
                            <p className="text-gray-400 text-xs truncate">{order.product} × {order.qty} · {order.date}</p>
                          </div>
                          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${status.color}`}>
                            <StatusIcon size={10} /> {status.label}
                          </span>
                          <p className="font-extrabold text-[#004D4A] text-sm flex-shrink-0">₦{order.total.toLocaleString()}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRODUCTS */}
            {activeTab === "products" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-extrabold text-[#004D4A] text-xl">My Products</h2>
                  <button className="flex items-center gap-2 bg-[#004D4A] text-[#D0FF71] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#006B67] transition">
                    <Plus size={16} /> Add Product
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vendorProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#EBFFF5] flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <Image src={product.image as string} alt={product.name} width={48} height={48} className="object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#004D4A] truncate">{product.name}</p>
                        <p className="text-gray-400 text-xs truncate">{product.category}</p>
                        <p className="text-[#004D4A] font-extrabold text-sm mt-1">₦{product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button className="p-2 rounded-xl hover:bg-[#EBFFF5] text-gray-400 hover:text-[#004D4A] transition"><Eye size={15} /></button>
                        <button className="p-2 rounded-xl hover:bg-[#EBFFF5] text-gray-400 hover:text-[#004D4A] transition"><Edit size={15} /></button>
                        <button className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition"><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ORDERS */}
            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 shadow-card">
                <h2 className="font-extrabold text-[#004D4A] text-xl mb-6">All Orders</h2>
                <div className="space-y-3">
                  {mockOrders.map((order) => {
                    const status = statusConfig[order.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={order.id} className="border-2 border-gray-100 rounded-2xl p-5 hover:border-[#004D4A] transition">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-extrabold text-[#004D4A]">{order.id}</p>
                            <p className="text-gray-500 text-sm">{order.customer} · {order.product} × {order.qty}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${status.color}`}>
                              <StatusIcon size={11} /> {status.label}
                            </span>
                            <p className="font-extrabold text-[#004D4A]">₦{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ANALYTICS */}
            {activeTab === "analytics" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-card">
                  <h2 className="font-extrabold text-[#004D4A] text-xl mb-6">Revenue Overview (2026)</h2>
                  <div className="flex items-end gap-3 h-48">
                    {analyticsData.map((d) => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full relative flex items-end justify-center" style={{ height: "160px" }}>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: d.sales > 0 ? `${(d.sales / maxSales) * 100}%` : "4px" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className={`w-full rounded-t-xl ${d.sales > 0 ? "bg-[#004D4A]" : "bg-gray-100"}`}
                          />
                        </div>
                        <p className="text-xs text-gray-400 font-semibold">{d.month}</p>
                        {d.sales > 0 && <p className="text-[10px] text-[#004D4A] font-bold">₦{(d.sales / 1000).toFixed(0)}k</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Best Selling", value: "DOXYCAP", sub: "42 units sold", icon: TrendingUp },
                    { label: "Total Customers", value: "128", sub: "+23 this month", icon: Users },
                    { label: "Avg. Order Value", value: "₦5,200", sub: "+₦400 this month", icon: DollarSign },
                  ].map(({ label, value, sub, icon: Icon }) => (
                    <div key={label} className="bg-white rounded-2xl p-5 shadow-card">
                      <Icon size={20} className="text-[#004D4A] mb-3" />
                      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{label}</p>
                      <p className="text-2xl font-extrabold text-[#004D4A]">{value}</p>
                      <p className="text-gray-400 text-xs mt-1">{sub}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
