"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Adaeze Okonkwo", role: "Lagos", text: "Medicart has completely changed how I manage my family's health. Fast delivery, genuine products. Highly recommended!", rating: 5, avatar: "A" },
  { name: "Emeka Nwosu", role: "Abuja", text: "I was skeptical at first, but after my first order arrived in less than 24 hours, I was hooked. The prices are unbeatable.", rating: 5, avatar: "E" },
  { name: "Fatima Yusuf", role: "Kano", text: "As someone managing diabetes, having access to my medications at discounted prices is a lifesaver. Thank you Medicart!", rating: 5, avatar: "F" },
  { name: "Chidi Okafor", role: "Port Harcourt", text: "The vendor dashboard is intuitive. My pharmacy's online sales tripled in the first month on Medicart.", rating: 5, avatar: "C" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#004D4A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#006B67] opacity-30 blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#003836] opacity-50 blur-[60px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#D0FF71] font-bold mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">What Our Customers Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-3xl p-6 flex flex-col gap-4"
            >
              <Quote size={24} className="text-[#D0FF71] opacity-60" />
              <p className="text-white/80 text-sm leading-relaxed flex-1">{t.text}</p>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={12} className="fill-[#D0FF71] text-[#D0FF71]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D0FF71] flex items-center justify-center text-[#004D4A] font-extrabold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-[#9BD0CC] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
