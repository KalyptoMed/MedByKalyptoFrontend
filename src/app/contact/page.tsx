"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, Phone, MapPin, Clock, MessageSquare,
  Send, CheckCircle, ChevronDown, HeadphonesIcon, Store,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+234 814 444 0000",
    sub: "Mon – Fri, 8am – 8pm",
    color: "bg-blue-50 text-blue-600",
    href: "tel:+2348144440000",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@medicart.ng",
    sub: "We reply within 24 hours",
    color: "bg-[#EBFFF5] text-[#004D4A]",
    href: "mailto:hello@medicart.ng",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "14 Healthcare Drive, Lekki Phase 1",
    sub: "Lagos, Nigeria",
    color: "bg-purple-50 text-purple-600",
    href: "#map",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sat: 8am – 8pm",
    sub: "Sun: 10am – 5pm",
    color: "bg-orange-50 text-orange-600",
    href: null,
  },
];

const subjects = [
  "General Enquiry",
  "Order & Delivery",
  "Product Information",
  "Partnership / Vendor",
  "Complaint",
  "Returns & Refunds",
  "Other",
];

const faqs = [
  {
    q: "How long does delivery take?",
    a: "We deliver within Lagos in 4–8 hours. Nationwide delivery takes 24–72 hours depending on your location.",
  },
  {
    q: "Are all products NAFDAC verified?",
    a: "Yes. Every product listed on Medicart is NAFDAC-approved and sourced from licensed pharmaceutical distributors.",
  },
  {
    q: "How do I become a vendor?",
    a: "Register as a vendor on our platform, submit your pharmacy license and NAFDAC registration, and our team will review your application within 2 business days.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 7 days of delivery for unopened, properly stored medications. Contact support to initiate a return.",
  },
  {
    q: "Can I speak with a pharmacist?",
    a: "Yes! Call our pharmacist hotline at +234 814 444 0001 or use the live chat on our platform. Available 24/7.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-bold text-[#004D4A]">{q}</span>
        <ChevronDown
          size={18}
          className={`text-[#004D4A] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-gray-500 pb-5 leading-relaxed text-sm">{a}</p>
      </motion.div>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    console.log("Contact form submitted:", data);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setSubmitted(true);
    reset();
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition focus:outline-none focus:border-[#004D4A] ${
      hasError ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
    }`;

  return (
    <main className="min-h-screen bg-white pt-20 page-wrapper">
      {/* Hero */}
      <section className="bg-[#004D4A] py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#006B67] opacity-40 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#D0FF71] opacity-5 blur-[80px]" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-[#D0FF71]/20 text-[#D0FF71] px-4 py-1.5 rounded-full text-sm font-bold mb-5">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
              We&apos;re Here<br />
              <span className="text-[#D0FF71]">to Help You.</span>
            </h1>
            <p className="text-[#9BD0CC] text-lg max-w-xl leading-relaxed">
              Have a question, complaint, or just want to say hello? Our team is ready to assist you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-14 bg-[#F8FFFE]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}>
                    <Icon size={22} />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="font-extrabold text-[#004D4A] text-base leading-snug">{item.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
                </motion.div>
              );
              return item.href ? (
                <a key={item.label} href={item.href}>{content}</a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="text-3xl font-extrabold text-[#004D4A] mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-8">Fill the form below and we&apos;ll get back to you as soon as possible.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center bg-[#EBFFF5] rounded-3xl"
                >
                  <div className="w-20 h-20 rounded-full bg-[#004D4A] flex items-center justify-center mb-5">
                    <CheckCircle size={36} className="text-[#D0FF71]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#004D4A] mb-2">Message Sent!</h3>
                  <p className="text-gray-600 max-w-sm mb-6">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#004D4A] text-[#D0FF71] px-8 py-3 rounded-xl font-bold hover:bg-[#006B67] transition"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Full Name *</label>
                      <input {...register("name")} placeholder="John Doe" className={inputClass(!!errors.name)} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Email Address *</label>
                      <input {...register("email")} type="email" placeholder="you@email.com" className={inputClass(!!errors.email)} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Phone (Optional)</label>
                      <input {...register("phone")} type="tel" placeholder="080XXXXXXXX" className={inputClass()} />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Subject *</label>
                      <select {...register("subject")} className={`${inputClass(!!errors.subject)} cursor-pointer`}>
                        <option value="">Select a subject</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Message *</label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className={`${inputClass(!!errors.message)} resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#004D4A] text-[#D0FF71] py-4 rounded-2xl font-bold text-base hover:bg-[#006B67] transition shadow-brand flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-[#D0FF71]/40 border-t-[#D0FF71] rounded-full animate-spin" />
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Sidebar Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Connect */}
              <div className="bg-[#004D4A] rounded-3xl p-7 text-white">
                <h3 className="font-extrabold text-xl mb-5">Quick Connect</h3>
                <div className="space-y-4">
                  {[
                    { icon: HeadphonesIcon, label: "Customer Support", value: "+234 814 444 0000", note: "24/7 Helpline" },
                    { icon: Store, label: "Vendor Support", value: "+234 814 444 0002", note: "Mon–Fri 9am–6pm" },
                    { icon: MessageSquare, label: "WhatsApp", value: "+234 814 444 0003", note: "Click to chat" },
                  ].map(({ icon: Icon, label, value, note }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#D0FF71]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={17} className="text-[#D0FF71]" />
                      </div>
                      <div>
                        <p className="text-[#9BD0CC] text-xs font-semibold">{label}</p>
                        <p className="text-white font-bold">{value}</p>
                        <p className="text-[#D0FF71] text-xs">{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div id="map" className="bg-[#EBFFF5] rounded-3xl overflow-hidden h-60 relative flex items-center justify-center border-2 border-[#004D4A]/10">
                <div className="text-center">
                  <MapPin size={32} className="text-[#004D4A] mx-auto mb-2" />
                  <p className="font-bold text-[#004D4A]">14 Healthcare Drive</p>
                  <p className="text-gray-500 text-sm">Lekki Phase 1, Lagos</p>
                </div>
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(0,77,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,77,74,0.3) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              {/* Social */}
              <div className="bg-[#F8FFFE] rounded-3xl p-6 border-2 border-gray-100">
                <p className="font-bold text-[#004D4A] mb-4">Follow Us</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Instagram", handle: "@medicartng", color: "bg-pink-50 text-pink-600" },
                    { name: "Twitter / X", handle: "@medicartng", color: "bg-sky-50 text-sky-600" },
                    { name: "Facebook", handle: "Medicart Nigeria", color: "bg-blue-50 text-blue-700" },
                    { name: "LinkedIn", handle: "Medicart by Kalypto", color: "bg-blue-50 text-blue-800" },
                  ].map(({ name, handle, color }) => (
                    <div key={name} className={`${color} rounded-2xl px-4 py-3`}>
                      <p className="font-bold text-xs">{name}</p>
                      <p className="text-xs opacity-70 mt-0.5">{handle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#F8FFFE]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#D0FF71] bg-[#004D4A] inline-block px-4 py-1 rounded-full text-sm font-bold mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold text-[#004D4A]">Frequently Asked Questions</h2>
          </motion.div>
          <div className="bg-white rounded-3xl p-8 shadow-card divide-y divide-gray-100">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-14 bg-[#004D4A]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Still have questions? <span className="text-[#D0FF71]">We&apos;ve got answers.</span>
          </h2>
          <p className="text-[#9BD0CC] mb-8">Our pharmacists are available 24/7 to help with medication queries.</p>
          <a
            href="tel:+2348144440000"
            className="inline-flex items-center gap-2 bg-[#D0FF71] text-[#004D4A] px-8 py-4 rounded-2xl font-bold text-base hover:bg-[#BEFF3D] transition shadow-lime"
          >
            <Phone size={18} /> Call Us Now
          </a>
        </div>
      </section>
    </main>
  );
}
