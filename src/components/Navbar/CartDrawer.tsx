"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, Minus, Plus, Trash2, AlertTriangle } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useQueries } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import { ApiProduct } from "@/hooks/product.hooks";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const productQueries = useQueries({
    queries: items.map((item) => ({
      queryKey: ["products", "detail", item.product.id],
      queryFn: async () => {
        const { data } = await apiClient.get<ApiProduct>(`/products/${item.product.id}`);
        return data;
      },
      enabled: isOpen && !!item.product.id,
      retry: false,
    })),
  });

  // Auto-remove items whose products have been deleted from the catalogue
  const errorIds = productQueries
    .map((q, i) => (q.isError ? items[i]?.product.id : null))
    .filter(Boolean) as string[];

  useEffect(() => {
    if (!isOpen || errorIds.length === 0) return;
    errorIds.forEach((id) => removeItem(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, errorIds.join(",")]);

  const validItems = items.filter((item) => !errorIds.includes(item.product.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-[#004D4A]">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-[#D0FF71]" size={22} />
                <h2 className="text-white font-bold text-lg">My Cart</h2>
                {validItems.length > 0 && (
                  <span className="bg-[#D0FF71] text-[#004D4A] text-xs font-bold px-2 py-0.5 rounded-full">
                    {validItems.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="text-white/70 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {validItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-64 gap-4 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#EBFFF5] dark:bg-gray-800 flex items-center justify-center">
                    <ShoppingCart size={32} className="text-[#004D4A] dark:text-[#D0FF71]" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">Your cart is empty</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">Add some products to get started</p>
                  <Link
                    href="/products/all"
                    onClick={closeCart}
                    className="bg-[#004D4A] text-[#D0FF71] px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#006B67] transition"
                  >
                    Browse Products
                  </Link>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {validItems.map((item, index) => {
                    const query = productQueries[items.indexOf(item)];
                    const isChecking = query?.isLoading;
                    const isOutOfStock =
                      !isChecking &&
                      query?.data &&
                      (query.data.stock <= 0 || query.data.status !== "active");

                    return (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`flex gap-4 p-4 rounded-2xl ${
                          isOutOfStock
                            ? "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
                            : "bg-gray-50 dark:bg-gray-800"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#EBFFF5] dark:bg-gray-700 flex-shrink-0">
                          <Image
                            src={item.product.image as string}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className={`w-full h-full object-cover ${isOutOfStock ? "opacity-50" : ""}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#004D4A] dark:text-white text-sm truncate">{item.product.name}</h4>
                          {isOutOfStock ? (
                            <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-semibold mt-0.5">
                              <AlertTriangle size={11} /> Out of stock
                            </span>
                          ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{item.product.description}</p>
                          )}
                          <p className={`font-bold mt-1 ${isOutOfStock ? "text-gray-400" : "text-[#004D4A] dark:text-[#D0FF71]"}`}>
                            ₦{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                          {!isOutOfStock && (
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-[#EBFFF5] dark:hover:bg-gray-600 transition"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-semibold w-6 text-center dark:text-gray-200">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-[#EBFFF5] dark:hover:bg-gray-600 transition"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition self-start"
                        >
                          <Trash2 size={16} />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {validItems.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-5 space-y-4">
                {validItems.some((item) => {
                  const q = productQueries[items.indexOf(item)];
                  return q?.data && (q.data.stock <= 0 || q.data.status !== "active");
                }) && (
                  <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5">
                    <AlertTriangle size={13} />
                    Remove out-of-stock items before checking out.
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300 font-medium">Subtotal</span>
                  <span className="text-[#004D4A] dark:text-[#D0FF71] font-bold text-xl">₦{totalPrice().toLocaleString()}</span>
                </div>
                <Link
                  href={isAuthenticated ? "/checkout" : "/auth/login?redirect=/checkout"}
                  onClick={closeCart}
                  className="block w-full bg-[#004D4A] text-[#D0FF71] text-center py-4 rounded-2xl font-bold text-lg hover:bg-[#006B67] transition shadow-brand"
                >
                  {isAuthenticated ? "Proceed to Checkout" : "Log in to Checkout"}
                </Link>
                <button
                  onClick={closeCart}
                  className="block w-full text-center text-[#004D4A] dark:text-[#9BD0CC] font-medium text-sm hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
