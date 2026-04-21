"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Video, Pill, FlaskConical, Heart, ShieldCheck,
  ArrowRight, Star, Users, Building2, Stethoscope,
  Clock, CheckCircle, Zap, Globe, Lock, BarChart3,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
};

const solutions = [
  {
    id: "telemedicine",
    icon: Video,
    tag: "Most Popular",
    title: "Telemedicine",
    tagline: "See a doctor from anywhere",
    description:
      "Connect with licensed Nigerian doctors via HD video, voice, or chat — without leaving your home. Get diagnoses, prescriptions, and referrals instantly.",
    features: ["Verified MDCN-licensed doctors", "24/7 availability", "Instant digital prescriptions", "Specialist referrals"],
    color: "from-blue-500 to-blue-700",
    light: "bg-blue-50",
    accent: "text-blue-600",
    cta: "/auth/register",
    ctaLabel: "Book Consultation",
  },
  {
    id: "pharmacy",
    icon: Pill,
    tag: "Core Service",
    title: "Online Pharmacy",
    tagline: "Medications delivered to you",
    description:
      "Browse thousands of NAFDAC-verified medications, add to cart, and get them delivered to your doorstep within hours — anywhere in Nigeria.",
    features: ["NAFDAC-approved products only", "Same-day Lagos delivery", "Nationwide 24–72hrs", "Prescription validation"],
    color: "from-[#004D4A] to-[#006B67]",
    light: "bg-[#EBFFF5]",
    accent: "text-[#004D4A]",
    cta: "/products/all",
    ctaLabel: "Shop Now",
  },
  {
    id: "lab",
    icon: FlaskConical,
    tag: "New",
    title: "Lab Tests at Home",
    tagline: "Book tests, get results online",
    description:
      "Schedule over 200+ diagnostic tests. A certified phlebotomist visits your home to collect samples. Results are delivered securely to your Medicart dashboard.",
    features: ["200+ test types", "Certified home visits", "Digital results in 24hrs", "Doctor interpretation included"],
    color: "from-purple-500 to-purple-700",
    light: "bg-purple-50",
    accent: "text-purple-600",
    cta: "/auth/register",
    ctaLabel: "Book a Test",
  },
  {
    id: "chronic",
    icon: Heart,
    tag: "Specialised",
    title: "Chronic Care",
    tagline: "Manage long-term conditions",
    description:
      "Tailored programs for diabetes, hypertension, asthma, and more. Regular check-ins, medication reminders, and specialist oversight — all in one place.",
    features: ["Personalised care plans", "Medication refill automation", "Vital signs tracking", "Monthly specialist reviews"],
    color: "from-red-400 to-red-600",
    light: "bg-red-50",
    accent: "text-red-600",
    cta: "/auth/register",
    ctaLabel: "Get Started",
  },
  {
    id: "vendor",
    icon: Building2,
    tag: "For Business",
    title: "Vendor Platform",
    tagline: "Grow your pharmacy online",
    description:
      "List products, manage inventory, process orders, and reach 50,000+ active buyers nationwide — all from a powerful vendor dashboard.",
    features: ["Easy product listing", "Real-time order management", "Analytics & revenue insights", "Marketing tools"],
    color: "from-yellow-400 to-orange-500",
    light: "bg-yellow-50",
    accent: "text-yellow-700",
    cta: "/auth/register?role=vendor",
    ctaLabel: "Become a Vendor",
  },
  {
    id: "corporate",
    icon: Users,
    tag: "Enterprise",
    title: "Corporate Health",
    tagline: "Healthcare for your entire team",
    description:
      "Provide your employees with access to Medicart&apos;s full suite — telemedicine, discounted medications, lab tests, and health checks — as a company benefit.",
    features: ["Custom health packages", "Employee health dashboard", "Bulk medication discounts", "Dedicated account manager"],
    color: "from-teal-500 to-teal-700",
    light: "bg-teal-50",
    accent: "text-teal-600",
    cta: "/contact",
    ctaLabel: "Contact Sales",
  },
];

const stats = [
  { value: "50,000+", label: "Active Patients", icon: Users },
  { value: "10,000+", label: "Products Listed", icon: Pill },
  { value: "500+", label: "Partner Pharmacies", icon: Building2 },
  { value: "4.8★", label: "Average Rating", icon: Star },
];

const whyUs = [
  { icon: ShieldCheck, title: "NAFDAC Verified", desc: "Every medication is sourced from licensed distributors and verified by NAFDAC." },
  { icon: Zap, title: "Lightning Fast", desc: "Same-day delivery in Lagos. Nationwide in 24–72 hours. No delays." },
  { icon: Lock, title: "Secure & Private", desc: "Bank-grade encryption protects your health data and payment information." },
  { icon: Globe, title: "Nationwide Coverage", desc: "We serve all 36 states and the FCT with reliable logistics partners." },
  { icon: Clock, title: "24/7 Support", desc: "Pharmacists, doctors, and support agents available around the clock." },
  { icon: BarChart3, title: "Data-Driven Care", desc: "Your health history powers personalised medication recommendations." },
];

const steps = [
  { step: "01", title: "Create Your Account", desc: "Sign up in 2 minutes. No paperwork, no waiting." },
  { step: "02", title: "Choose Your Service", desc: "Consult a doctor, shop medications, or book a lab test." },
  { step: "03", title: "Get Care Delivered", desc: "Receive medications, prescriptions, or results at your door." },
];

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-white pt-20 page-wrapper">

      {/* ── HERO ── */}
      <section className="relative bg-[#004D4A] overflow-hidden py-24 px-4 md:px-8">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#006B67] opacity-40 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#D0FF71] opacity-5 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-[#D0FF71] text-sm font-bold mb-6"
            >
              <Stethoscope size={14} /> Complete Healthcare Ecosystem
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6"
            >
              One Platform.<br />
              <span className="text-[#D0FF71]">Every Health Need.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-[#9BD0CC] text-xl leading-relaxed mb-10 max-w-xl"
            >
              From buying medications to consulting a doctor, booking lab tests to managing chronic conditions — Medicart is the only healthcare platform you&apos;ll ever need.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/auth/register"
                className="flex items-center gap-2 bg-[#D0FF71] text-[#004D4A] px-8 py-4 rounded-2xl font-bold hover:bg-[#BEFF3D] transition shadow-lime group">
                Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact"
                className="flex items-center gap-2 glass text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition">
                Talk to Sales
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating service pills */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          {[
            { icon: Video, label: "Telemedicine" },
            { icon: Pill, label: "Pharmacy" },
            { icon: FlaskConical, label: "Lab Tests" },
            { icon: Heart, label: "Chronic Care" },
          ].map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass rounded-2xl px-5 py-3 flex items-center gap-3"
            >
              <Icon size={18} className="text-[#D0FF71]" />
              <span className="text-white font-semibold text-sm">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#F8FFFE] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center py-10 gap-2"
              >
                <Icon size={22} className="text-[#004D4A] mb-1" />
                <p className="text-3xl font-extrabold text-[#004D4A]">{value}</p>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS GRID ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#D0FF71] bg-[#004D4A] inline-block px-4 py-1 rounded-full text-sm font-bold mb-4">Our Solutions</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#004D4A] mb-4">Everything Healthcare, Under One Roof</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Six powerful solutions designed to make Nigerian healthcare accessible, affordable, and effortless.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <motion.div
                  key={sol.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-[2rem] border-2 border-gray-100 hover:border-[#004D4A] shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Top gradient bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${sol.color}`} />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Tag + Icon */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl ${sol.light} flex items-center justify-center`}>
                        <Icon size={26} className={sol.accent} />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${sol.light} ${sol.accent}`}>
                        {sol.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#004D4A] mb-1">{sol.title}</h3>
                    <p className="text-sm font-semibold text-gray-400 mb-3">{sol.tagline}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{sol.description}</p>

                    {/* Features */}
                    <ul className="space-y-2 mb-7 flex-1">
                      {sol.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle size={14} className={sol.accent} />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={sol.cta}
                      className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition group-hover:gap-3 bg-gradient-to-r ${sol.color} text-white shadow-md hover:opacity-90`}
                    >
                      {sol.ctaLabel}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-[#004D4A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#006B67] opacity-40 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D0FF71] opacity-5 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#D0FF71] font-bold mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">How Medicart Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-[#D0FF71]/30" />

            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center relative"
              >
                <div className="w-20 h-20 rounded-3xl bg-[#D0FF71] flex items-center justify-center mx-auto mb-5 shadow-lime">
                  <span className="text-[#004D4A] font-extrabold text-2xl">{step.step}</span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-3">{step.title}</h3>
                <p className="text-[#9BD0CC] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-[#D0FF71] text-[#004D4A] px-10 py-4 rounded-2xl font-bold text-base hover:bg-[#BEFF3D] transition shadow-lime group"
            >
              Start in 2 Minutes
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── WHY MEDICART ── */}
      <section className="py-20 bg-[#F8FFFE]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[#D0FF71] bg-[#004D4A] inline-block px-4 py-1 rounded-full text-sm font-bold mb-4">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#004D4A]">Built for Nigerians, By Nigerians</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EBFFF5] flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#004D4A]" />
                  </div>
                  <h3 className="font-extrabold text-[#004D4A] text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL STRIP ── */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Dr. Ngozi Eze", role: "Consultant Physician, Lagos", quote: "Medicart&apos;s telemedicine platform has allowed me to reach patients I would never have been able to treat in a traditional setting." },
              { name: "Sunrise Pharmacy", role: "Vendor Partner, Abuja", quote: "Our monthly revenue tripled in 3 months after listing on Medicart. The vendor dashboard makes everything so easy to manage." },
              { name: "TechCorp Nigeria", role: "Corporate Client", quote: "We enrolled 200 employees on Medicart&apos;s corporate plan. Healthcare-related absenteeism dropped by 40% in 6 months." },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-[#F8FFFE] rounded-3xl p-7 border-2 border-gray-100"
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="fill-[#D0FF71] text-[#D0FF71]" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-extrabold text-[#004D4A]">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-[#004D4A] rounded-[2.5rem] p-12 md:p-16 overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#006B67] opacity-40 blur-[80px]" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#D0FF71] opacity-10 blur-[60px]" />

            <div className="relative">
              <p className="text-[#D0FF71] font-bold mb-5">Ready to get started?</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Join 50,000+ Nigerians<br />Living Healthier with Medicart
              </h2>
              <p className="text-[#9BD0CC] text-lg mb-10 max-w-xl mx-auto">
                Sign up today and get your first consultation free. No hidden fees, no long-term contracts.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/auth/register"
                  className="flex items-center gap-2 bg-[#D0FF71] text-[#004D4A] px-10 py-4 rounded-2xl font-bold text-base hover:bg-[#BEFF3D] transition shadow-lime group">
                  Create Free Account
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact"
                  className="flex items-center gap-2 glass text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-white/20 transition">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
