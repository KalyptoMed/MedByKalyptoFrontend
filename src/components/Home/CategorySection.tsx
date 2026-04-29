"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Pill, Syringe, Heart, Leaf, FlaskConical, Apple, ArrowRight } from "lucide-react";

const categories = [
  { name: "Antibiotics", icon: Pill, color: "bg-blue-50 text-blue-600", href: "/products/all?category=Antibiotics" },
  { name: "Anti-Malarial", icon: Syringe, color: "bg-red-50 text-red-500", href: "/products/all?category=Anti-Malarial" },
  { name: "Anti-Diabetics", icon: Heart, color: "bg-pink-50 text-pink-500", href: "/products/all?category=Anti-Diabetics" },
  { name: "Antacids", icon: FlaskConical, color: "bg-purple-50 text-purple-500", href: "/products/all?category=Antacids" },
  { name: "Anti-Diarrhoeal", icon: Leaf, color: "bg-green-50 text-green-600", href: "/products/all?category=Anti-Diarrhoeal" },
  { name: "Vitamins", icon: Apple, color: "bg-yellow-50 text-yellow-600", href: "/products/all?category=Vitamins" },
];

const cardVariants = (i: number): Variants => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22, delay: i * 0.07 },
  },
});

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -20 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 320, damping: 18, delay: 0.1 },
  },
};

export default function CategorySection() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-end justify-between mb-8 md:mb-12"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-[#D0FF71] bg-[#004D4A] inline-block px-4 py-1 rounded-full text-sm font-bold mb-3"
            >
              Categories
            </motion.p>
            <h2 className="text-2xl md:text-5xl font-extrabold text-[#004D4A] dark:text-white">Browse by Category</h2>
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={cardVariants(i)}
                whileTap={{ scale: 0.94 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Link
                  href={cat.href}
                  className="flex flex-col items-center gap-2 md:gap-3 p-3 md:p-5 bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl border-2 border-gray-100 dark:border-gray-700 hover:border-[#004D4A] dark:hover:border-[#D0FF71] hover:shadow-card-hover transition-all duration-300 group text-center"
                >
                  <motion.div
                    variants={iconVariants}
                    className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${cat.color} flex items-center justify-center`}
                  >
                    <Icon size={18} />
                  </motion.div>
                  <p className="font-bold text-[#004D4A] dark:text-white text-sm">{cat.name}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile view all */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-8 md:hidden"
        >
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link
              href="/products/all"
              className="flex items-center gap-2 text-[#004D4A] dark:text-[#D0FF71] font-bold border-2 border-[#004D4A] dark:border-[#D0FF71] px-6 py-2.5 rounded-2xl"
            >
              View all <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
