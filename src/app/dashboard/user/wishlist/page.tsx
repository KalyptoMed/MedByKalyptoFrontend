"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist, useRemoveFromWishlist } from "@/hooks/user.hooks";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { apiProductToUiProduct } from "@/hooks/product.hooks";

export default function UserWishlistPage() {
  const { data: raw = [], isLoading } = useWishlist();
  const { mutate: remove } = useRemoveFromWishlist();
  const { addItem } = useCartStore();
  const { show } = useToastStore();

  const items = raw.map((p: any) => ({
    raw: p,
    ui: apiProductToUiProduct(p),
  }));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => <div key={i} className="h-56 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Heart size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold mb-2">Your wishlist is empty</p>
          <Link href="/products/all" className="text-[#004D4A] dark:text-[#D0FF71] font-bold hover:underline text-sm">Browse products</Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {items.map(({ raw: p, ui }, i) => (
            <motion.div key={p._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="relative h-36 bg-[#EBFFF5] dark:bg-gray-800 flex items-center justify-center">
                <Image src={ui.image as string} alt={ui.name} width={100} height={100} className="object-contain" />
                {!ui.inStock && (
                  <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center">
                    <span className="text-xs font-bold text-red-500 bg-white dark:bg-gray-900 px-2 py-0.5 rounded-full">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide">{ui.category}</p>
                <p className="font-bold text-[#004D4A] dark:text-white text-sm mt-0.5">{ui.name}</p>
                <p className="font-extrabold text-[#004D4A] dark:text-white mt-1">₦{ui.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-3">
                  <motion.button whileTap={{ scale: 0.93 }} disabled={!ui.inStock}
                    onClick={() => { addItem(ui); show(`${ui.name} added to cart`); }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${ui.inStock ? "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                    <ShoppingCart size={12} /> Add to Cart
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => remove(p._id)}
                    className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-red-500 hover:bg-red-50 transition">
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
