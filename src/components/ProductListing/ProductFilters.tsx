"use client";

import { motion } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/products";

interface FilterProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showInStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
  onReset: () => void;
}

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  showInStockOnly,
  onInStockChange,
  onReset,
}: FilterProps) {
  const hasFilters = selectedCategory !== "ALL" || sortBy !== "default" || showInStockOnly;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[#004D4A]" />
          <h3 className="font-extrabold text-[#004D4A]">Filters</h3>
        </div>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:text-red-600 transition"
          >
            <X size={12} /> Reset
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="mb-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Sort By</p>
        <div className="space-y-1">
          {[
            { value: "default", label: "Default" },
            { value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" },
            { value: "rating", label: "Highest Rated" },
            { value: "discount", label: "Best Deals" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                sortBy === opt.value
                  ? "bg-[#EBFFF5] text-[#004D4A]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#004D4A]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => onInStockChange(!showInStockOnly)}
            className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 ${
              showInStockOnly ? "bg-[#004D4A]" : "bg-gray-200"
            }`}
          >
            <motion.div
              animate={{ x: showInStockOnly ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
            />
          </div>
          <span className="text-sm font-semibold text-gray-700">In Stock Only</span>
        </label>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Category</p>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange("ALL")}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
              selectedCategory === "ALL"
                ? "bg-[#004D4A] text-[#D0FF71]"
                : "text-gray-600 hover:bg-gray-50 hover:text-[#004D4A]"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                selectedCategory === cat
                  ? "bg-[#004D4A] text-[#D0FF71]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#004D4A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
