"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Flag, Trash2 } from "lucide-react";
import StatusBadge from "@/components/portal/StatusBadge";
import DataTable from "@/components/portal/DataTable";
import { useAdminProducts } from "@/hooks/admin.hooks";
import { useDeleteProduct } from "@/hooks/product.hooks";

const categoryFilters = ["All", "Antibiotics", "Anti-Malarial", "Anti-Diabetics", "Antacids", "Vitamins", "Other"];

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { data, isLoading } = useAdminProducts(1, 100, category !== "All" ? category : undefined, search || undefined);
  const { mutate: deleteProduct } = useDeleteProduct();

  const products = data?.items ?? [];

  const columns = [
    { key: "_name", header: "Product", render: (row: any) => (
      <div>
        <p className="font-semibold text-[#004D4A] dark:text-white text-sm">{row.name}</p>
        <p className="text-xs text-gray-400">{row.nafdacNumber ?? "—"}</p>
      </div>
    )},
    { key: "category", header: "Category" },
    { key: "_price", header: "Price", render: (row: any) => `₦${Number(row.price).toLocaleString()}`, className: "font-bold" },
    { key: "_stock", header: "Stock", render: (row: any) => (
      <span className={`font-bold ${row.stock === 0 ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`}>{row.stock}</span>
    )},
    { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
    { key: "_actions", header: "", render: (row: any) => (
      <div className="flex items-center gap-1">
        <motion.button whileTap={{ scale: 0.9 }} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition"><Eye size={14} /></motion.button>
        <motion.button whileTap={{ scale: 0.9 }} className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-500 transition"><Flag size={14} /></motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => deleteProduct(row._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={14} /></motion.button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A]" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categoryFilters.map((c) => (
          <motion.button key={c} whileTap={{ scale: 0.95 }} onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${category === c ? "bg-[#004D4A] text-[#D0FF71]" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
            {c}
          </motion.button>
        ))}
      </div>
      <DataTable columns={columns} data={products} loading={isLoading} emptyMessage="No products found" />
    </div>
  );
}
