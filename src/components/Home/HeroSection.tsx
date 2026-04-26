"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";

const stats = [
  { icon: ShieldCheck, label: "Verified Products", value: "10,000+" },
  { icon: Truck, label: "Fast Delivery", value: "24hrs" },
  { icon: Clock, label: "Active Users", value: "50,000+" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const statsContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#004D4A] overflow-hidden flex items-center pt-20">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.5, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[#006B67] blur-[100px]"
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#003836] opacity-60 blur-[80px]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#D0FF71] blur-[60px]"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 glass px-3 py-1.5 md:px-4 md:py-2 rounded-full"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#D0FF71] block"
              />
              <span className="text-[#D0FF71] text-xs md:text-sm font-semibold">Nigeria&apos;s #1 Medical Marketplace</span>
            </motion.div>

            {/* Headline */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white">
                Your Health,{" "}
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-[#D0FF71] italic"
                >
                  Simplified.
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 md:mt-6 text-[#9BD0CC] text-base md:text-xl leading-relaxed max-w-lg"
              >
                Access verified medications, book doctor appointments, and manage your healthcare — all from one trusted platform.
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}>
                <Link
                  href="/products/all"
                  className="flex items-center gap-2 bg-[#D0FF71] text-[#004D4A] px-6 py-3.5 md:px-8 md:py-4 rounded-2xl font-bold text-sm md:text-base hover:bg-[#BEFF3D] transition-all duration-200 shadow-lime group"
                >
                  Shop Now
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}>
                <Link
                  href="/solutions"
                  className="flex items-center gap-2 glass text-white px-6 py-3.5 md:px-8 md:py-4 rounded-2xl font-bold text-sm md:text-base hover:bg-white/20 transition-all duration-200"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats — each card animates individually */}
            <motion.div
              variants={statsContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-2 md:gap-4 pt-2 md:pt-4"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  variants={statItem}
                  whileTap={{ scale: 0.96 }}
                  className="glass rounded-xl md:rounded-2xl p-3 md:p-4 text-center"
                >
                  <Icon size={16} className="text-[#D0FF71] mx-auto mb-1" />
                  <p className="text-white font-bold text-sm md:text-lg leading-tight">{value}</p>
                  <p className="text-[#9BD0CC] text-[10px] md:text-xs">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex relative justify-center lg:justify-end"
          >
            {/* Glow Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-80 h-80 rounded-full border border-[#D0FF71]/20"
              />
              <div className="absolute w-64 h-64 rounded-full border border-[#D0FF71]/10" />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 -left-4 glass rounded-2xl p-3 flex items-center gap-2 w-44 z-10"
            >
              <div className="w-8 h-8 rounded-full bg-[#D0FF71] flex items-center justify-center">
                <ShieldCheck size={14} className="text-[#004D4A]" />
              </div>
              <div>
                <p className="text-white text-xs font-bold">100% Verified</p>
                <p className="text-[#9BD0CC] text-[10px]">NAFDAC Approved</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 -left-8 glass rounded-2xl p-3 flex items-center gap-2 w-44 z-10"
            >
              <div className="w-8 h-8 rounded-full bg-[#D0FF71] flex items-center justify-center">
                <Truck size={14} className="text-[#004D4A]" />
              </div>
              <div>
                <p className="text-white text-xs font-bold">Fast Delivery</p>
                <p className="text-[#9BD0CC] text-[10px]">Nationwide</p>
              </div>
            </motion.div>

            <motion.div
              className="relative z-10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Image
                src="/assets/images/landingpageimage.png"
                alt="Healthcare"
                width={480}
                height={520}
                className="object-contain drop-shadow-2xl w-64 md:w-80 lg:w-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 80L60 72C120 64 240 48 360 44C480 40 600 48 720 52C840 56 960 56 1080 50C1200 44 1320 32 1380 26L1440 20V80H0Z"
            className="fill-white dark:fill-[#030a09]"
          />
        </svg>
      </div>
    </section>
  );
}
