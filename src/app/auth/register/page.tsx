"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ShieldCheck, User, Store, ArrowRight } from "lucide-react";
import { useRegister } from "@/hooks/auth.hooks";

const registerSchema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Minimum 8 characters"),
  confirmPassword: z.string(),
  phone: z.string().min(10, "Valid phone required"),
  businessName: z.string().optional(),
  agreeTerms: z.boolean().refine((v) => v === true, "You must agree to the terms"),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

type RegisterData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "vendor" ? "vendor" : "user";
  const [role, setRole] = useState<"user" | "vendor">(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerUser, isPending } = useRegister();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    const [firstName, ...rest] = data.name.trim().split(" ");
    const lastName = rest.join(" ") || firstName;
    registerUser({ firstName, lastName, email: data.email, password: data.password, role, phone: data.phone });
  };

  const inputClass = (error?: { message?: string }) =>
    `w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition focus:outline-none focus:border-[#004D4A] dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 ${error ? "border-red-300 bg-red-50" : "border-gray-200"}`;

  return (
    <main className="min-h-screen bg-[#004D4A] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#006B67] opacity-40 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#D0FF71] opacity-5 blur-[80px]" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <ShieldCheck size={32} className="text-[#D0FF71]" />
            <span className="text-white font-extrabold text-2xl">Medicart</span>
          </div>
          <p className="text-[#9BD0CC]">Join thousands of satisfied users</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-glass">
          <h1 className="text-2xl font-extrabold text-[#004D4A] mb-1">Create Account</h1>
          <p className="text-gray-500 text-sm mb-6">Tell us about yourself to get started</p>

          <div className="grid grid-cols-2 gap-3 mb-7 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
            {[
              { value: "user" as const, label: "Customer", icon: User, desc: "Buy medications" },
              { value: "vendor" as const, label: "Vendor", icon: Store, desc: "Sell products" },
            ].map(({ value, label, icon: Icon, desc }) => (
              <button key={value} onClick={() => setRole(value)} type="button"
                className={`flex flex-col items-center gap-1 py-3 px-4 rounded-xl font-bold text-sm transition ${role === value ? "bg-[#004D4A] text-[#D0FF71] shadow" : "text-gray-500 hover:text-[#004D4A]"}`}>
                <Icon size={18} />
                {label}
                <span className={`text-[10px] font-normal ${role === value ? "text-[#9BD0CC]" : "text-gray-400"}`}>{desc}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Full Name *</label>
              <input {...register("name")} placeholder="John Doe" className={inputClass(errors.name)} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Email *</label>
                <input {...register("email")} type="email" placeholder="you@email.com" className={inputClass(errors.email)} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Phone *</label>
                <input {...register("phone")} placeholder="080XXXXXXXX" className={inputClass(errors.phone)} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <AnimatePresence>
              {role === "vendor" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Business / Pharmacy Name</label>
                  <input {...register("businessName")} placeholder="e.g. Sunrise Pharmacy" className={inputClass()} />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Password *</label>
              <div className="relative">
                <input {...register("password")} type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" className={inputClass(errors.password) + " pr-12"} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004D4A] transition">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Confirm Password *</label>
              <input {...register("confirmPassword")} type="password" placeholder="Repeat password" className={inputClass(errors.confirmPassword)} />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" {...register("agreeTerms")} className="mt-0.5 w-4 h-4 accent-[#004D4A] flex-shrink-0" />
              <span className="text-sm text-gray-500">
                I agree to the{" "}<Link href="#" className="text-[#004D4A] font-semibold hover:underline">Terms of Service</Link>{" "}and{" "}<Link href="#" className="text-[#004D4A] font-semibold hover:underline">Privacy Policy</Link>
              </span>
            </label>
            {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms.message}</p>}

            <button type="submit" disabled={isPending}
              className="w-full bg-[#004D4A] text-[#D0FF71] py-4 rounded-xl font-bold text-base hover:bg-[#006B67] transition shadow-brand flex items-center justify-center gap-2 disabled:opacity-70">
              {isPending ? <span className="w-5 h-5 border-2 border-[#D0FF71]/40 border-t-[#D0FF71] rounded-full animate-spin" /> : <>Create Account <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#004D4A] font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}

export default function RegisterPage() {
  return <Suspense><RegisterForm /></Suspense>;
}
