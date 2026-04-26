"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Share2, Minus, Plus, ShoppingCart, ArrowRight, ChevronRight, Tag, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { allProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductListing/ProductGrid";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "usage">("description");
  const { addItem } = useCartStore();
  const { show } = useToastStore();

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    show(`${product.name} added to cart`);
  };

  return (
    <main className="min-h-screen bg-[#F8FFFE] dark:bg-gray-950 pt-20 page-wrapper">
      {/* Breadcrumb */}
      <div className="bg-[#004D4A] py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#9BD0CC] hover:text-[#D0FF71] transition">Home</Link>
          <ChevronRight size={14} className="text-[#9BD0CC]" />
          <Link href="/products/all" className="text-[#9BD0CC] hover:text-[#D0FF71] transition">All Products</Link>
          <ChevronRight size={14} className="text-[#9BD0CC]" />
          <span className="text-[#D0FF71] font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-[#EBFFF5] rounded-[2.5rem] p-10 flex items-center justify-center min-h-[400px]"
          >
            {product.discount && (
              <div className="absolute top-6 left-6 flex items-center gap-1.5 bg-[#D0FF71] text-[#004D4A] px-4 py-1.5 rounded-full font-bold">
                <Tag size={14} /> -{product.discount}% OFF
              </div>
            )}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white shadow-card flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} />
            </button>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={product.image as string}
                alt={product.name}
                width={300}
                height={320}
                className="object-contain drop-shadow-xl"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-bold text-[#004D4A] uppercase tracking-widest opacity-50 mb-2">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#004D4A] dark:text-white leading-tight">{product.name}</h1>

            {product.brand && (
              <p className="text-gray-500 mt-2">
                By <span className="text-[#004D4A] font-semibold">{product.brand}</span>
                {product.genericName && <> · <span className="italic">{product.genericName}</span></>}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < product.rating ? "fill-[#D0FF71] text-[#D0FF71]" : "text-gray-200"} />
                ))}
              </div>
              <span className="text-[#004D4A] font-bold">{product.rating}.0</span>
              {product.reviewCount && <span className="text-gray-400 text-sm">({product.reviewCount} reviews)</span>}
              <span className={`ml-2 px-3 py-0.5 rounded-full text-xs font-bold ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6 pb-6 border-b border-gray-100">
              <span className="text-4xl font-extrabold text-[#004D4A] dark:text-white">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount && (
                <span className="bg-[#EBFFF5] text-[#004D4A] px-3 py-1 rounded-full text-sm font-bold">
                  Save ₦{(product.originalPrice! - product.price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-5 leading-relaxed">{product.description}</p>

            {/* Quantity + CTA */}
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[#004D4A] font-bold">Quantity</span>
                <div className="flex items-center border-2 border-[#004D4A] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 hover:bg-[#EBFFF5] transition text-[#004D4A]"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-[#004D4A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 hover:bg-[#EBFFF5] transition text-[#004D4A]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/checkout"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#004D4A] text-[#D0FF71] py-4 rounded-2xl font-bold text-base hover:bg-[#006B67] transition shadow-brand group"
                >
                  Buy Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-[#004D4A] text-[#004D4A] py-4 rounded-2xl font-bold text-base hover:bg-[#EBFFF5] transition"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button className="w-14 h-14 flex items-center justify-center border-2 border-gray-200 rounded-2xl hover:border-[#004D4A] transition flex-shrink-0">
                  <Share2 size={18} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck size={16} className="text-green-500" />
              NAFDAC verified · Authentic product guaranteed
            </div>
          </motion.div>
        </div>

        {/* Description / Usage Tabs */}
        {(product.fullDescription || product.howToUse) && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-card mb-16">
            <div className="flex gap-4 border-b border-gray-100 mb-6">
              {[
                { key: "description" as const, label: "Description" },
                { key: "usage" as const, label: "How to Use" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-3 px-1 font-bold text-sm border-b-2 transition ${
                    activeTab === tab.key
                      ? "border-[#004D4A] text-[#004D4A]"
                      : "border-transparent text-gray-400 hover:text-[#004D4A]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-600 leading-relaxed"
            >
              {activeTab === "description"
                ? product.fullDescription || product.description
                : product.howToUse || "Please consult your pharmacist for dosage and usage instructions."}
            </motion.p>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-extrabold text-[#004D4A] dark:text-white mb-8">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </main>
  );
}
