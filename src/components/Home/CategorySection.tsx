"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pill, Syringe, Heart, Leaf, FlaskConical, Apple, ArrowRight } from "lucide-react";

const categories = [
  { name: "Antibiotics", icon: Pill, color: "bg-blue-50 text-blue-600", href: "/products/all?category=ANTIBIOTICS", count: "120+ items" },
  { name: "Anti-Malarial", icon: Syringe, color: "bg-red-50 text-red-500", href: "/products/all?category=ANTI-MALARIAL", count: "45+ items" },
  { name: "Anti-Diabetics", icon: Heart, color: "bg-pink-50 text-pink-500", href: "/products/all?category=ANTI-DIABETICS", count: "60+ items" },
  { name: "Antacids", icon: FlaskConical, color: "bg-purple-50 text-purple-500", href: "/products/all?category=ANTACIDS", count: "38+ items" },
  { name: "Anti-Diarrhoeal", icon: Leaf, color: "bg-green-50 text-green-600", href: "/products/all?category=ANTI-DIARRHOEAL", count: "25+ items" },
  { name: "Vitamins", icon: Apple, color: "bg-yellow-50 text-yellow-600", href: "/products/all?category=VITAMINS", count: "80+ items" },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[#D0FF71] bg-[#004D4A] inline-block px-4 py-1 rounded-full text-sm font-bold mb-3">Categories</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#004D4A] dark:text-white">Browse by Category</h2>
          </div>
          <Link
            href="/products/all"
            className="hidden md:flex items-center gap-2 text-[#004D4A] dark:text-[#D0FF71] font-bold hover:gap-3 transition-all"
          >
            View all <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={cat.href}
                  className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-100 dark:border-gray-700 hover:border-[#004D4A] dark:hover:border-[#D0FF71] hover:shadow-card-hover transition-all duration-300 group text-center"
                >
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <p className="font-bold text-[#004D4A] dark:text-white text-sm">{cat.name}</p>
                  <p className="text-gray-400 text-xs">{cat.count}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
