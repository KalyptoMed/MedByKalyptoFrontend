"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

interface ProductGridProps {
  products: Product[];
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-100 dark:bg-gray-800" />
      <div className="p-3 space-y-2">
        <div className="h-3.5 bg-gray-100 dark:bg-gray-800 rounded w-3/4" />
        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded mt-2" />
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
  const { addItem, removeItem, items: cartItems } = useCartStore();
  const { show } = useToastStore();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const inCart = (id: string) => cartItems.some((i) => i.product.id === id);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const handleCartToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    if (inCart(product.id)) {
      removeItem(product.id);
      show(`${product.name} removed from cart`, "info");
    } else {
      addItem(product);
      show(`${product.name} added to cart`);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-20 h-20 rounded-full bg-[#EBFFF5] dark:bg-gray-800 flex items-center justify-center">
          <ShoppingBag size={32} className="text-[#004D4A] dark:text-[#D0FF71]" />
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
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className="group relative bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image as string}
                alt={product.name}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                loading="lazy"
              />
            </Link>

            {/* Hover actions */}
            <div className="absolute right-2 top-2 flex flex-col gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10">
              <button
                onClick={(e) => toggleFavorite(product.id, e)}
                className={`w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all hover:scale-110 ${
                  favorites.has(product.id) ? "text-red-500" : "text-gray-500"
                }`}
              >
                <Heart size={14} className={favorites.has(product.id) ? "fill-current" : ""} />
              </button>
              <button
                onClick={(e) => handleCartToggle(product, e)}
                disabled={!product.inStock}
                className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40 ${
                  inCart(product.id)
                    ? "bg-[#004D4A] text-[#D0FF71]"
                    : "bg-white dark:bg-gray-800 text-gray-500"
                }`}
              >
                <ShoppingBag size={14} />
              </button>
            </div>

            {/* Discount badge */}
            {product.discount && (
              <div className="absolute left-2 top-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold z-10">
                {product.discount}% OFF
              </div>
            )}

            {/* Out of stock */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center">
                <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-2.5">
            <div className="flex items-start justify-between gap-1 mb-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate flex-1">
                <Link href={`/products/${product.id}`} className="hover:text-[#004D4A] dark:hover:text-[#D0FF71] transition-colors">
                  {product.name}
                </Link>
              </h3>
              {product.rating > 0 && (
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{product.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>

            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-sm font-bold text-gray-900 dark:text-white">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {product.inStock ? (
              <button
                onClick={(e) => handleCartToggle(product, e)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  inCart(product.id)
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-red-600"
                    : "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]"
                }`}
              >
                <ShoppingBag size={13} />
                {inCart(product.id) ? "Remove from Cart" : "Add to Cart"}
              </button>
            ) : (
              <p className="w-full text-center text-xs font-bold text-[#004D4A] dark:text-[#D0FF71] animate-pulse">
                Out of Stock
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
