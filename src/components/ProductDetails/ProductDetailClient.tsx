"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Share2, Minus, Plus, ShoppingCart, ArrowRight, ChevronRight, Tag, ShieldCheck, Copy, Check, X } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import ProductGrid from "@/components/ProductListing/ProductGrid";

const SOCIALS = [
  {
    name: "WhatsApp",
    color: "bg-green-500 hover:bg-green-600",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.557 4.118 1.529 5.845L0 24l6.335-1.51A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.193-1.367l-.372-.22-3.862.921.977-3.767-.242-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
    ),
    getUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  },
  {
    name: "X (Twitter)",
    color: "bg-black hover:bg-gray-800",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
    getUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    color: "bg-[#1877F2] hover:bg-[#166fe5]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
    getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Telegram",
    color: "bg-[#229ED9] hover:bg-[#1a8bbf]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
    ),
    getUrl: (url: string, title: string) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

export default function ProductDetailClient({ product, relatedProducts = [] }: { product: Product; relatedProducts?: Product[] }) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "usage">("description");
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  const { show } = useToastStore();

  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      show("Link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      show("Failed to copy link", "error");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
                {/* Share button + dropdown */}
                <div className="relative flex-shrink-0" ref={shareRef}>
                  <button
                    onClick={() => setShowShare((v) => !v)}
                    className={`w-14 h-14 flex items-center justify-center border-2 rounded-2xl transition ${
                      showShare ? "border-[#004D4A] bg-[#EBFFF5]" : "border-gray-200 hover:border-[#004D4A]"
                    }`}
                  >
                    <Share2 size={18} className={showShare ? "text-[#004D4A]" : "text-gray-400"} />
                  </button>

                  <AnimatePresence>
                    {showShare && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 bottom-full mb-3 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-card-hover border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="font-bold text-[#004D4A] dark:text-white text-sm">Share this product</p>
                          <button onClick={() => setShowShare(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={15} />
                          </button>
                        </div>

                        {/* Copy URL */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-xs text-gray-400 mb-2">Product link</p>
                          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
                            <p className="text-xs text-gray-600 dark:text-gray-300 truncate flex-1">{productUrl}</p>
                            <button
                              onClick={copyToClipboard}
                              className={`flex-shrink-0 transition-colors ${copied ? "text-green-500" : "text-[#004D4A] dark:text-[#D0FF71] hover:opacity-70"}`}
                            >
                              {copied ? <Check size={15} /> : <Copy size={15} />}
                            </button>
                          </div>
                        </div>

                        {/* Social platforms */}
                        <div className="px-4 py-3">
                          <p className="text-xs text-gray-400 mb-3">Share on</p>
                          <div className="grid grid-cols-2 gap-2">
                            {SOCIALS.map(({ name, color, icon, getUrl }) => (
                              <a
                                key={name}
                                href={getUrl(productUrl, product.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white transition ${color}`}
                              >
                                {icon}
                                {name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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

        {/* Similar Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[#D0FF71] bg-[#004D4A] inline-block px-3 py-0.5 rounded-full text-xs font-bold mb-2">
                  More Like This
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#004D4A] dark:text-white">Similar Products</h2>
                <p className="text-gray-400 text-sm mt-1">Other products in the {product.category} category</p>
              </div>
              <Link
                href={`/products/all`}
                className="hidden sm:flex items-center gap-1.5 text-[#004D4A] dark:text-[#D0FF71] font-bold text-sm hover:gap-2.5 transition-all"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </main>
  );
}
