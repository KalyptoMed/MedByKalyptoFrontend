"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Star, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";
import { getFeaturedProducts } from "@/lib/products";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22, delay: i * 0.12 },
  }),
};

export default function FeaturedProducts() {
  const products = getFeaturedProducts();
  const { addItem } = useCartStore();
  const { show } = useToastStore();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  return (
    <section className="py-20 bg-[#F8FFFE] dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-[#D0FF71] bg-[#004D4A] inline-block px-4 py-1 rounded-full text-sm font-bold mb-3"
            >
              Hot Deals
            </motion.p>
            <h2 className="text-2xl md:text-5xl font-extrabold text-[#004D4A] dark:text-white">Featured Products</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-base">Top-rated medications at unbeatable prices</p>
          </div>
          <Link
            href="/products/all"
            className="hidden md:flex items-center gap-2 text-[#004D4A] dark:text-[#D0FF71] font-bold hover:gap-3 transition-all"
          >
            View all <ArrowRight size={18} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
            >
              <div className="relative bg-[#EBFFF5] dark:bg-gray-800 h-52 flex items-center justify-center overflow-hidden">
                {product.discount && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.2 }}
                    className="absolute top-4 left-4 flex items-center gap-1 bg-[#D0FF71] text-[#004D4A] px-3 py-1 rounded-full text-xs font-bold z-10"
                  >
                    <Tag size={10} />
                    -{product.discount}%
                  </motion.div>
                )}
                <motion.button
                  onClick={() => toggleFavorite(product.id)}
                  whileTap={{ scale: 1.35 }}
                  animate={favorites.has(product.id) ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white dark:bg-gray-700 shadow-card flex items-center justify-center z-10"
                >
                  <Heart
                    size={16}
                    className={favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                  />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product.image as string}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </motion.div>
              </div>

              <div className="p-5">
                <p className="text-xs text-[#004D4A] dark:text-[#9BD0CC] font-semibold uppercase tracking-wide mb-1 opacity-60">
                  {product.category}
                </p>
                <h3 className="font-extrabold text-[#004D4A] dark:text-white text-lg">{product.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 truncate">{product.description}</p>

                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className={j < product.rating ? "fill-[#D0FF71] text-[#D0FF71]" : "text-gray-200 dark:text-gray-700"}
                    />
                  ))}
                  <span className="text-gray-400 text-xs ml-1">({product.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-2xl font-extrabold text-[#004D4A] dark:text-white">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 text-sm line-through ml-2">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <motion.div whileTap={{ scale: 0.93 }}>
                      <Link
                        href={`/products/${product.id}`}
                        className="px-3 py-2 border-2 border-[#004D4A] dark:border-[#D0FF71] text-[#004D4A] dark:text-[#D0FF71] rounded-xl text-sm font-bold hover:bg-[#EBFFF5] dark:hover:bg-gray-800 transition"
                      >
                        View
                      </Link>
                    </motion.div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => { addItem(product); show(`${product.name} added to cart`); }}
                      className="flex items-center gap-1.5 px-3 py-2 bg-[#004D4A] text-[#D0FF71] rounded-xl text-sm font-bold hover:bg-[#006B67] transition"
                    >
                      <ShoppingCart size={14} />
                      Add
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10 md:hidden"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/products/all"
              className="inline-flex items-center gap-2 bg-[#004D4A] text-[#D0FF71] px-8 py-4 rounded-2xl font-bold hover:bg-[#006B67] transition"
            >
              View All Products <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
