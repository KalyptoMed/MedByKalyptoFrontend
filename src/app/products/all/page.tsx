"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { usePublicProducts, apiProductToUiProduct } from "@/hooks/product.hooks";
import ProductGrid, { ProductCardSkeletonGrid } from "@/components/ProductListing/ProductGrid";
import ProductFilters from "@/components/ProductListing/ProductFilters";

const SORT_OPTIONS = {
  "price-asc": (a: any, b: any) => a.price - b.price,
  "price-desc": (a: any, b: any) => b.price - a.price,
  "rating": (a: any, b: any) => b.rating - a.rating,
  "discount": (a: any, b: any) => (b.discount ?? 0) - (a.discount ?? 0),
};

export default function AllProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("default");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data, isLoading } = usePublicProducts({ page: 1, limit: 100 });

  const products = useMemo(() => (data?.items ?? []).map(apiProductToUiProduct), [data]);

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category).filter((c): c is string => !!c))), [products]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== "ALL") result = result.filter((p) => p.category === selectedCategory);
    if (showInStockOnly) result = result.filter((p) => p.inStock);
    const sorter = SORT_OPTIONS[sortBy as keyof typeof SORT_OPTIONS];
    if (sorter) result = [...result].sort(sorter);
    return result;
  }, [products, searchQuery, selectedCategory, sortBy, showInStockOnly]);

  const resetFilters = () => { setSelectedCategory("ALL"); setSortBy("default"); setShowInStockOnly(false); };

  return (
    <main className="min-h-screen bg-[#F8FFFE] dark:bg-gray-950 pt-20 page-wrapper">
      <div className="bg-[#004D4A] py-14 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#006B67] opacity-30 blur-[80px]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#D0FF71] font-semibold mb-2">All Products</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">Browse Our Catalog</h1>
            <p className="text-[#9BD0CC] mt-2 text-lg">{isLoading ? "Loading..." : `${data?.total ?? 0}+ verified medications`}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-8 max-w-2xl relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medications, generics, categories..."
              className="w-full pl-14 pr-12 py-4 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-2xl text-gray-800 font-medium text-base shadow-card focus:ring-2 focus:ring-[#D0FF71] focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                <X size={18} />
              </button>
            )}
          </motion.div>

          <div className="mt-5 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            <button onClick={() => setSelectedCategory("ALL")}
              className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition ${selectedCategory === "ALL" ? "bg-[#D0FF71] text-[#004D4A]" : "glass text-white hover:bg-white/20"}`}>
              All
            </button>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition ${selectedCategory === cat ? "bg-[#D0FF71] text-[#004D4A]" : "glass text-white hover:bg-white/20"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="text-[#004D4A] dark:text-[#D0FF71] font-semibold">{filtered.length} products</p>
          <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="flex items-center gap-2 bg-[#004D4A] text-[#D0FF71] px-4 py-2 rounded-xl font-bold text-sm">
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-60 flex-shrink-0">
            <ProductFilters
              categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory}
              sortBy={sortBy} onSortChange={setSortBy} showInStockOnly={showInStockOnly}
              onInStockChange={setShowInStockOnly} onReset={resetFilters}
            />
          </div>
          <div className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-[#004D4A] dark:text-[#D0FF71] font-semibold">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>
            </div>
            {isLoading ? <ProductCardSkeletonGrid /> : <ProductGrid products={filtered} />}
          </div>
        </div>
      </div>
    </main>
  );
}
