"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useLogin } from "@/hooks/auth.hooks";

const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? undefined;
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin({ redirectTo });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => login(data);

  return (
    <main className="min-h-screen bg-[#004D4A] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#006B67] opacity-40 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#D0FF71] opacity-5 blur-[80px]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <ShieldCheck size={32} className="text-[#D0FF71]" />
            <span className="text-white font-extrabold text-2xl">Medicart</span>
          </div>
          <p className="text-[#9BD0CC]">Welcome back</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-glass">
          <h1 className="text-2xl font-extrabold text-[#004D4A] dark:text-white mb-1">Sign In</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition focus:outline-none focus:border-[#004D4A] dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200"}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold text-[#004D4A] block mb-1.5">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3.5 pr-12 rounded-xl border-2 text-sm font-medium transition focus:outline-none focus:border-[#004D4A] dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 ${errors.password ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004D4A] transition">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
              <Link href="#" className="text-sm text-[#004D4A] font-semibold hover:underline">Forgot password?</Link>
            </div>

            <button type="submit" disabled={isPending}
              className="w-full bg-[#004D4A] text-[#D0FF71] py-4 rounded-xl font-bold text-base hover:bg-[#006B67] transition shadow-brand flex items-center justify-center gap-2 disabled:opacity-70">
              {isPending ? <span className="w-5 h-5 border-2 border-[#D0FF71]/40 border-t-[#D0FF71] rounded-full animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-[#004D4A] font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
