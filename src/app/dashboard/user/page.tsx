"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, User, Settings, LogOut, Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { allProducts } from "@/lib/products";
import Image from "next/image";

const mockOrders = [
  { id: "MC-ABC123", date: "2026-04-15", status: "delivered" as const, items: 3, total: 7500 },
  { id: "MC-DEF456", date: "2026-04-10", status: "shipped" as const, items: 1, total: 2000 },
  { id: "MC-GHI789", date: "2026-04-05", status: "processing" as const, items: 2, total: 5800 },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "Processing", icon: Package, color: "bg-blue-100 text-blue-700" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-700" },
};

const navItems = [
  { id: "overview", label: "Overview", icon: Package },
  { id: "orders", label: "My Orders", icon: ShoppingBag },
  { id: "saved", label: "Saved Items", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, logout } = useAuthStore();
  const router = useRouter();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F8FFFE] pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#004D4A] font-bold text-xl mb-4">Please sign in to view your dashboard</p>
          <Link href="/auth/login" className="bg-[#004D4A] text-[#D0FF71] px-8 py-4 rounded-2xl font-bold">Sign In</Link>
        </div>
      </main>
    );
  }

  const savedProducts = allProducts.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F8FFFE] pt-20 page-wrapper">
      {/* Header */}
      <div className="bg-[#004D4A] py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#D0FF71] flex items-center justify-center text-[#004D4A] font-extrabold text-2xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="text-[#9BD0CC] text-sm">Welcome back</p>
            <h1 className="text-3xl font-extrabold text-white">{user.name}</h1>
            <p className="text-[#9BD0CC] text-sm">{user.email}</p>
          </div>
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
                  <Icon size={17} />
                  {label}
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
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Total Orders", value: "12", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
                    { label: "Delivered", value: "9", icon: CheckCircle, color: "bg-green-50 text-green-600" },
                    { label: "In Transit", value: "2", icon: Truck, color: "bg-purple-50 text-purple-600" },
                    { label: "Saved Items", value: "7", icon: Heart, color: "bg-red-50 text-red-500" },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card">
                        <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                          <Icon size={18} />
                        </div>
                        <p className="text-2xl font-extrabold text-[#004D4A]">{stat.value}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
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
                    {mockOrders.map((order) => {
                      const status = statusConfig[order.status];
                      const StatusIcon = status.icon;
                      return (
                        <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-[#EBFFF5] flex items-center justify-center flex-shrink-0">
                            <Package size={18} className="text-[#004D4A]" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-[#004D4A] text-sm">{order.id}</p>
                            <p className="text-gray-400 text-xs">{order.items} item{order.items > 1 ? "s" : ""} · {order.date}</p>
                          </div>
                          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                            <StatusIcon size={11} /> {status.label}
                          </span>
                          <p className="font-extrabold text-[#004D4A] text-sm">₦{order.total.toLocaleString()}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ORDERS */}
            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 shadow-card">
                <h2 className="font-extrabold text-[#004D4A] text-xl mb-6">My Orders</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => {
                    const status = statusConfig[order.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={order.id} className="border-2 border-gray-100 rounded-2xl p-5 hover:border-[#004D4A] transition">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-extrabold text-[#004D4A]">{order.id}</p>
                            <p className="text-gray-400 text-sm">Placed on {order.date}</p>
                          </div>
                          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${status.color}`}>
                            <StatusIcon size={12} /> {status.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600 text-sm">{order.items} item{order.items > 1 ? "s" : ""}</p>
                          <p className="font-extrabold text-[#004D4A] text-lg">₦{order.total.toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* SAVED */}
            {activeTab === "saved" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-extrabold text-[#004D4A] text-xl mb-6">Saved Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#EBFFF5] flex items-center justify-center flex-shrink-0">
                        <Image src={product.image as string} alt={product.name} width={48} height={48} className="object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#004D4A]">{product.name}</p>
                        <p className="text-gray-400 text-xs">{product.description}</p>
                        <p className="text-[#004D4A] font-extrabold mt-1">₦{product.price.toLocaleString()}</p>
                      </div>
                      <Link href={`/products/${product.id}`} className="text-[#004D4A] hover:bg-[#EBFFF5] p-2 rounded-xl transition">
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PROFILE */}
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 shadow-card">
                <h2 className="font-extrabold text-[#004D4A] text-xl mb-8">My Profile</h2>
                <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100">
                  <div className="w-20 h-20 rounded-2xl bg-[#004D4A] flex items-center justify-center text-[#D0FF71] font-extrabold text-3xl">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#004D4A]">{user.name}</h3>
                    <p className="text-gray-500">{user.email}</p>
                    <span className="inline-block mt-1 px-3 py-0.5 bg-[#EBFFF5] text-[#004D4A] text-xs font-bold rounded-full capitalize">{user.role}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", value: user.name },
                    { label: "Email", value: user.email },
                    { label: "Phone", value: "+234 800 000 0000" },
                    { label: "Member Since", value: "April 2026" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#F8FFFE] rounded-2xl p-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                      <p className="text-[#004D4A] font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-6 bg-[#004D4A] text-[#D0FF71] px-8 py-3 rounded-xl font-bold hover:bg-[#006B67] transition">
                  Edit Profile
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
