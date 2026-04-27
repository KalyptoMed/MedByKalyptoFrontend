"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Store, TrendingUp } from "lucide-react";

const featureCards = [
  {
    icon: Store,
    title: "Easy Setup",
    desc: "Register and start selling in minutes",
  },
  {
    icon: TrendingUp,
    title: "Grow Fast",
    desc: "Access 50,000+ active buyers nationwide",
  },
];

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 240, damping: 22, delay: i * 0.15 + 0.2 },
  }),
};

export default function CTASection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#004D4A] rounded-[2.5rem] overflow-hidden p-8 md:p-16"
        >
          {/* Decorations */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.55, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#006B67] blur-[80px]"
          />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#D0FF71] opacity-10 blur-[60px]" />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-8 right-8 w-32 h-32 rounded-full border-2 border-[#D0FF71]/20"
          />
          <div className="absolute top-16 right-16 w-16 h-16 rounded-full border-2 border-[#D0FF71]/10" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#D0FF71] font-bold mb-4"
              >
                Are you a pharmacy or medical vendor?
              </motion.p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Grow Your Business <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-[#D0FF71]"
                >
                  With Medicart
                </motion.span>
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-[#9BD0CC] mt-4 text-base md:text-lg leading-relaxed"
              >
                Join thousands of vendors reaching millions of customers. List your products, manage orders, and grow your pharmacy business online.
              </motion.p>
            </motion.div>

            {/* Right */}
            <div className="flex flex-col gap-4">
              {featureCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideRight}
                    whileTap={{ scale: 0.97 }}
                    className="glass rounded-2xl p-5 flex items-center gap-4"
                  >
                    <motion.div
                      whileInView={{ rotate: [0, -10, 10, 0] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                      className="w-12 h-12 rounded-xl bg-[#D0FF71] flex items-center justify-center flex-shrink-0"
                    >
                      <Icon size={22} className="text-[#004D4A]" />
                    </motion.div>
                    <div>
                      <p className="text-white font-bold">{card.title}</p>
                      <p className="text-[#9BD0CC] text-sm">{card.desc}</p>
                    </div>
                  </motion.div>
                );
              })}

              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideRight}
                whileTap={{ scale: 0.95 }}
                className="mt-2"
              >
                <Link
                  href="/auth/register?role=vendor"
                  className="flex items-center justify-center gap-2 bg-[#D0FF71] text-[#004D4A] px-8 py-4 rounded-2xl font-bold text-base hover:bg-[#BEFF3D] transition shadow-lime group"
                >
                  Become a Vendor
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
