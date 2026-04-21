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
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#004D4A] overflow-hidden flex items-center pt-20">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-[#006B67] opacity-40 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#003836] opacity-60 blur-[80px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#D0FF71] opacity-5 blur-[60px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#D0FF71] animate-pulse-slow" />
              <span className="text-[#D0FF71] text-sm font-semibold">Nigeria&apos;s #1 Medical Marketplace</span>
            </motion.div>

            {/* Headline */}
            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white">
                Your Health,{" "}
                <span className="text-[#D0FF71] italic">Simplified.</span>
              </h1>
              <p className="mt-6 text-[#9BD0CC] text-lg md:text-xl leading-relaxed max-w-lg">
                Access verified medications, book doctor appointments, and manage your healthcare — all from one trusted platform.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/products/all"
                className="flex items-center gap-2 bg-[#D0FF71] text-[#004D4A] px-8 py-4 rounded-2xl font-bold text-base hover:bg-[#BEFF3D] transition-all duration-200 shadow-lime group"
              >
                Shop Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/solutions"
                className="flex items-center gap-2 glass text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition-all duration-200"
              >
                Book Appointment
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass rounded-2xl p-4 text-center">
                  <Icon size={20} className="text-[#D0FF71] mx-auto mb-1" />
                  <p className="text-white font-bold text-lg leading-tight">{value}</p>
                  <p className="text-[#9BD0CC] text-xs">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full border border-[#D0FF71]/20 animate-pulse-slow" />
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

            <div className="relative z-10">
              <Image
                src="/assets/images/landingpageimage.png"
                alt="Healthcare"
                width={480}
                height={520}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L60 72C120 64 240 48 360 44C480 40 600 48 720 52C840 56 960 56 1080 50C1200 44 1320 32 1380 26L1440 20V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
