"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import StatusBadge from "@/components/portal/StatusBadge";
import { useMyProducts, useDeleteProduct } from "@/hooks/product.hooks";

const statusFilters = ["All", "Active", "Draft", "Out of Stock"];

export default function VendorProductsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const { data, isLoading } = useMyProducts();
  const { mutate: deleteProduct } = useDeleteProduct();

  const products = data?.items ?? [];
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.status.replace("_", " ").toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A]" />
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/vendor/products/bulk">
            <motion.button whileTap={{ scale: 0.95 }} className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:border-[#004D4A] transition">
              Bulk Edit
            </motion.button>
          </Link>
          <Link href="/dashboard/vendor/products/add">
            <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#004D4A] text-[#D0FF71] text-sm font-bold hover:bg-[#006B67] transition">
              <Plus size={16} /> Add Product
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusFilters.map((f) => (
          <motion.button key={f} whileTap={{ scale: 0.95 }} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${filter === f ? "bg-[#004D4A] text-[#D0FF71]" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
            {f}
          </motion.button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-x-auto">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Product", "Category", "Price", "Stock", "Sold", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map((p, i) => (
                  <motion.tr key={p._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#004D4A] dark:text-white">{p.name}</td>
                    <td className="px-4 py-3 text-gray-500">{p.category}</td>
                    <td className="px-4 py-3 font-bold text-[#004D4A] dark:text-white">₦{p.price.toLocaleString()}</td>
                    <td className={`px-4 py-3 font-bold ${p.stock === 0 ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`}>{p.stock}</td>
                    <td className="px-4 py-3 text-gray-500">{p.sold ?? 0}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <motion.button whileTap={{ scale: 0.9 }} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Eye size={14} /></motion.button>
                        <Link href={`/dashboard/vendor/products/${p._id}/edit`}>
                          <motion.button whileTap={{ scale: 0.9 }} className="p-1.5 rounded-lg hover:bg-[#EBFFF5] text-[#004D4A] transition"><Pencil size={14} /></motion.button>
                        </Link>
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => deleteProduct(p._id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={14} /></motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
        {!isLoading && filtered.length === 0 && <p className="text-center py-12 text-gray-400">No products found</p>}
      </div>
    </div>
  );
}
