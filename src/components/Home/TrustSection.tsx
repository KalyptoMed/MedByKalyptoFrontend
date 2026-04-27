"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Truck, HeadphonesIcon, RotateCcw } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "NAFDAC Verified",
    desc: "Every product is verified and approved by NAFDAC. Your safety is our priority.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    desc: "Fast, reliable delivery to every state in Nigeria within 24–72 hours.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Our pharmacists and support agents are always available to help you.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "Not satisfied? Return within 7 days for a full refund, no questions asked.",
    color: "bg-orange-100 text-orange-600",
  },
];

const cardVariants = (i: number): Variants => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 240, damping: 22, delay: i * 0.1 },
  },
});

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: 30 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 350, damping: 16, delay: 0.15 },
  },
};

export default function TrustSection() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={cardVariants(i)}
                whileTap={{ scale: 0.96 }}
                className="flex flex-col items-start gap-2 md:gap-3 p-3 md:p-6 rounded-2xl md:rounded-3xl border-2 border-gray-100 dark:border-gray-800 hover:border-[#004D4A] dark:hover:border-[#D0FF71] hover:shadow-card transition-all duration-300 cursor-default"
              >
                <motion.div
                  variants={iconVariants}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${feature.color} flex items-center justify-center`}
                >
                  <Icon size={20} />
                </motion.div>
                <div>
                  <h3 className="font-extrabold text-[#004D4A] dark:text-white text-sm md:text-lg">{feature.title}</h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.25 }}
                    className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-1 leading-relaxed"
                  >
                    {feature.desc}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
