"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatCard({ title, value, change, positive, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, type: "spring", stiffness: 260, damping: 20 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon size={18} />
        </div>
        {change && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
            {positive ? "+" : ""}{change}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold text-[#004D4A] dark:text-white">{value}</p>
      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{title}</p>
    </motion.div>
  );
}
