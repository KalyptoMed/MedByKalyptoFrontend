"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-[#004D4A] flex flex-col items-center justify-center z-[9999]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#006B67] opacity-40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-[#D0FF71] opacity-5 blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated icon ring */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-20 h-20 rounded-full border-2 border-[#D0FF71]/20"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-14 h-14 rounded-full border-2 border-[#D0FF71]/30"
            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-16 h-16 rounded-2xl bg-[#D0FF71]/10 border border-[#D0FF71]/20 flex items-center justify-center backdrop-blur-sm"
          >
            <ShieldCheck size={32} className="text-[#D0FF71]" />
          </motion.div>
        </div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-white font-extrabold text-xl tracking-wide">Medicart</p>
          <p className="text-[#9BD0CC] text-sm mt-1">{message}</p>
        </motion.div>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#D0FF71]"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Inline section loader — use inside pages/cards */
export function SectionLoader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-[#004D4A]/15 border-t-[#004D4A]"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D0FF71]" />
        </div>
      </div>
      {label && <p className="text-sm text-gray-400 font-medium">{label}</p>}
    </div>
  );
}

/** Skeleton pulse bar — drop-in for text/card placeholders */
export function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse ${className}`} />;
}
