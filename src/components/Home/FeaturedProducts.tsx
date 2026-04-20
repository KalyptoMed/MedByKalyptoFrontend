"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { getFeaturedProducts } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";

export default function FeaturedProducts() {
  const products = getFeaturedProducts();
  const { addItem } = useCartStore();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  return (
    <section className="py-20 bg-[#F8FFFE]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[#D0FF71] bg-[#004D4A] inline-block px-4 py-1 rounded-full text-sm font-bold mb-3">
              Hot Deals
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#004D4A]">Featured Products</h2>
            <p className="text-gray-500 mt-2">Top-rated medications at unbeatable prices</p>
          </div>
          <Link
            href="/products/all"
            className="hidden md:flex items-center gap-2 text-[#004D4A] font-bold hover:gap-3 transition-all"
          >
            View all <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              {/* Image Area */}
              <div className="relative bg-[#EBFFF5] h-52 flex items-center justify-center overflow-hidden">
                {product.discount && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-[#D0FF71] text-[#004D4A] px-3 py-1 rounded-full text-xs font-bold z-10">
                    <Tag size={10} />
                    -{product.discount}%
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center z-10 hover:scale-110 transition-transform"
                >
                  <Heart
                    size={16}
                    className={favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                  />
                </button>
                <Image
                  src={product.image as string}
                  alt={product.name}
                  width={160}
                  height={160}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="text-xs text-[#004D4A] font-semibold uppercase tracking-wide mb-1 opacity-60">
                  {product.category}
                </p>
                <h3 className="font-extrabold text-[#004D4A] text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-0.5 truncate">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className={j < product.rating ? "fill-[#D0FF71] text-[#D0FF71]" : "text-gray-200"}
                    />
                  ))}
                  <span className="text-gray-400 text-xs ml-1">({product.reviewCount})</span>
                </div>

                {/* Price Row */}
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-2xl font-extrabold text-[#004D4A]">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 text-sm line-through ml-2">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="px-3 py-2 border-2 border-[#004D4A] text-[#004D4A] rounded-xl text-sm font-bold hover:bg-[#EBFFF5] transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => addItem(product)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-[#004D4A] text-[#D0FF71] rounded-xl text-sm font-bold hover:bg-[#006B67] transition"
                    >
                      <ShoppingCart size={14} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link
            href="/products/all"
            className="inline-flex items-center gap-2 bg-[#004D4A] text-[#D0FF71] px-8 py-4 rounded-2xl font-bold hover:bg-[#006B67] transition"
          >
            View All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
