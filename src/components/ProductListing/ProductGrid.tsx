"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star, Tag } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

interface ProductGridProps {
  products: Product[];
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden animate-pulse">
      <div className="bg-gray-100 dark:bg-gray-800 h-44" />
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
        <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded w-full" />
        <div className="h-7 bg-gray-100 dark:bg-gray-800 rounded w-1/2 mt-3" />
      </div>
    </div>
  );
}

export function ProductCardSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(10)].map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCartStore();
  const { show } = useToastStore();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [addedToCart, setAddedToCart] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    show(`${product.name} added to cart`);
    setAddedToCart((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedToCart((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-20 h-20 rounded-full bg-[#EBFFF5] dark:bg-gray-800 flex items-center justify-center">
          <ShoppingCart size={32} className="text-[#004D4A] dark:text-[#D0FF71]" />
        </div>
        <p className="text-[#004D4A] dark:text-white font-bold text-xl">No products found</p>
        <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
          whileHover={{ y: -3 }}
          className="group"
        >
          <Link href={`/products/${product.id}`} className="block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
            {/* Image */}
            <div className="relative bg-[#EBFFF5] dark:bg-gray-800 h-44 flex items-center justify-center overflow-hidden">
              {product.discount && (
                <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-[#D0FF71] text-[#004D4A] px-2 py-0.5 rounded-full text-[10px] font-bold z-10">
                  <Tag size={8} /> -{product.discount}%
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center z-10">
                  <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold">Out of Stock</span>
                </div>
              )}
              <button
                onClick={(e) => toggleFavorite(product.id, e)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-card flex items-center justify-center z-10 hover:scale-110 transition-transform"
              >
                <Heart size={13} className={favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
              <Image
                src={product.image as string}
                alt={product.name}
                width={110}
                height={110}
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-[9px] text-[#004D4A] dark:text-[#9BD0CC] font-bold uppercase tracking-widest opacity-60 mb-0.5">{product.category}</p>
              <h3 className="font-extrabold text-[#004D4A] dark:text-white text-sm leading-tight line-clamp-1">{product.name}</h3>
              <p className="text-gray-400 text-[11px] mt-0.5 truncate">{product.description}</p>

              <div className="flex items-center gap-0.5 mt-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={9} className={j < product.rating ? "fill-[#D0FF71] text-[#D0FF71]" : "text-gray-200"} />
                ))}
                {product.reviewCount && (
                  <span className="text-gray-400 text-[9px] ml-0.5">({product.reviewCount})</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-2.5">
                <div>
                  <span className="text-sm font-extrabold text-[#004D4A] dark:text-white">₦{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 text-[10px] line-through ml-1">₦{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={!product.inStock}
                  className={`flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200 ${
                    addedToCart.has(product.id)
                      ? "bg-green-500 text-white scale-95"
                      : product.inStock
                      ? "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {addedToCart.has(product.id) ? (
                    "Added ✓"
                  ) : (
                    <>
                      <ShoppingCart size={10} /> Add
                    </>
                  )}
                </button>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
