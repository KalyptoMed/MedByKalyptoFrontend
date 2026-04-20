"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star, Tag } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

interface ProductGridProps {
  products: Product[];
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden animate-pulse">
      <div className="bg-gray-100 h-52" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-5 bg-gray-100 rounded w-2/3" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-8 bg-gray-100 rounded w-1/2 mt-4" />
      </div>
    </div>
  );
}

export function ProductCardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCartStore();
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
        <div className="w-20 h-20 rounded-full bg-[#EBFFF5] flex items-center justify-center">
          <ShoppingCart size={32} className="text-[#004D4A]" />
        </div>
        <p className="text-[#004D4A] font-bold text-xl">No products found</p>
        <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          whileHover={{ y: -4 }}
          className="group"
        >
          <Link href={`/products/${product.id}`} className="block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
            {/* Image */}
            <div className="relative bg-[#EBFFF5] h-52 flex items-center justify-center overflow-hidden">
              {product.discount && (
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#D0FF71] text-[#004D4A] px-2.5 py-1 rounded-full text-xs font-bold z-10">
                  <Tag size={9} /> -{product.discount}%
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                  <span className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-xs font-bold">Out of Stock</span>
                </div>
              )}
              <button
                onClick={(e) => toggleFavorite(product.id, e)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-card flex items-center justify-center z-10 hover:scale-110 transition-transform"
              >
                <Heart size={15} className={favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>
              <Image
                src={product.image as string}
                alt={product.name}
                width={140}
                height={140}
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-[10px] text-[#004D4A] font-bold uppercase tracking-widest opacity-50 mb-1">{product.category}</p>
              <h3 className="font-extrabold text-[#004D4A] text-base leading-tight">{product.name}</h3>
              <p className="text-gray-400 text-xs mt-0.5 truncate">{product.description}</p>

              <div className="flex items-center gap-1 mt-1.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={10} className={j < product.rating ? "fill-[#D0FF71] text-[#D0FF71]" : "text-gray-200"} />
                ))}
                {product.reviewCount && (
                  <span className="text-gray-400 text-[10px] ml-1">({product.reviewCount})</span>
                )}
              </div>

              <div className="flex items-center justify-between mt-3">
                <div>
                  <span className="text-lg font-extrabold text-[#004D4A]">₦{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 text-xs line-through ml-1.5">₦{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={!product.inStock}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    addedToCart.has(product.id)
                      ? "bg-green-500 text-white scale-95"
                      : product.inStock
                      ? "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {addedToCart.has(product.id) ? (
                    "Added ✓"
                  ) : (
                    <>
                      <ShoppingCart size={12} /> Add
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
