"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useToastStore } from "@/store/toastStore";
import { useCartStore } from "@/store/cartStore";

export default function ToastContainer() {
  const { toasts, dismiss } = useToastStore();
  const { openCart } = useCartStore();

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-card-hover pl-4 pr-3 py-3 min-w-[260px] max-w-[320px]"
          >
            <div className="w-8 h-8 rounded-full bg-[#EBFFF5] dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
              <Check size={16} className="text-[#004D4A] dark:text-[#D0FF71]" />
            </div>
            <p className="flex-1 text-sm font-semibold text-[#004D4A] dark:text-[#D0FF71] truncate">
              {toast.message}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  openCart();
                  dismiss(toast.id);
                }}
                className="text-xs font-bold text-[#004D4A] dark:text-[#D0FF71] hover:underline px-1 whitespace-nowrap"
              >
                View Cart
              </button>
              <button
                onClick={() => dismiss(toast.id)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
