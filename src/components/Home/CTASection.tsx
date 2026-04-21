"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Store } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-[#004D4A] rounded-[2.5rem] overflow-hidden p-10 md:p-16"
        >
          {/* Decorations */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#006B67] opacity-40 blur-[80px]" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#D0FF71] opacity-10 blur-[60px]" />
          <div className="absolute top-8 right-8 w-32 h-32 rounded-full border-2 border-[#D0FF71]/20" />
          <div className="absolute top-16 right-16 w-16 h-16 rounded-full border-2 border-[#D0FF71]/10" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <p className="text-[#D0FF71] font-bold mb-4">Are you a pharmacy or medical vendor?</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Grow Your Business <br />
                <span className="text-[#D0FF71]">With Medicart</span>
              </h2>
              <p className="text-[#9BD0CC] mt-4 text-lg leading-relaxed">
                Join thousands of vendors reaching millions of customers. List your products, manage orders, and grow your pharmacy business online.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4">
              <div className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D0FF71] flex items-center justify-center flex-shrink-0">
                  <Store size={22} className="text-[#004D4A]" />
                </div>
                <div>
                  <p className="text-white font-bold">Easy Setup</p>
                  <p className="text-[#9BD0CC] text-sm">Register and start selling in minutes</p>
                </div>
              </div>
              <div className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D0FF71] flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={22} className="text-[#004D4A]" />
                </div>
                <div>
                  <p className="text-white font-bold">Grow Fast</p>
                  <p className="text-[#9BD0CC] text-sm">Access 50,000+ active buyers nationwide</p>
                </div>
              </div>
              <Link
                href="/auth/register?role=vendor"
                className="flex items-center justify-center gap-2 bg-[#D0FF71] text-[#004D4A] px-8 py-4 rounded-2xl font-bold text-base hover:bg-[#BEFF3D] transition shadow-lime group mt-2"
              >
                Become a Vendor
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
