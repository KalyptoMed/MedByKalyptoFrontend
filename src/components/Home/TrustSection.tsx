"use client";

import { motion } from "framer-motion";
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

export default function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-start gap-4 p-6 rounded-3xl border-2 border-gray-100 hover:border-[#004D4A] hover:shadow-card transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center`}>
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#004D4A] text-lg">{feature.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
