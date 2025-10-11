"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#EBFFF5]">
      {/* LEFT SIDE IMAGE */}
      <div className="relative md:flex w-3/5 bg-gray-100 items-center justify-center">
        <Image
          src="/assets/images/login_img.png" 
          alt="Doctor"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-col justify-center items-center w-full rounded-l-3xl md:w-2/5 p-6 md:p-12">
        <div className="w-full max-w-md mb-20 text-center">
          <h1 className="text-5xl font-bold mt-10 leading-snug text-[#004D4A]">
            Welcome   
          </h1>
          <p className="text-3xl font-bold mb-10 leading-snug text-[#004D4A]">
            Login
          </p>

          {/* Email Input */}
         <div className="relative w-full mb-6">
         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D0FF71] w-5 h-5" />
           <input
             type="email"
             placeholder="Email"
             className="w-full bg-[#004D4A] text-[#D0FF71] rounded-full pl-10 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
           />
         </div>

          {/* Password Input */}
       <div className="relative w-full mb-6">
       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D0FF71] w-5 h-5" />
         <input
           type={showPassword ? "text" : "password"}
           placeholder="Password"
           className="w-full bg-[#004D4A] text-[#D0FF71] rounded-full pl-10 pr-10 py-4 focus:outline-none focus:ring-2 focus:ring-green-500"
         />
       <span
         className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
         onClick={() => setShowPassword(!showPassword)}
        >
           {showPassword ? <FaEyeSlash /> : <FaEye />}
       </span>
     </div>
          
          {/* Remember + Forgot */}
            <div className="flex justify-between items-center mb-28 text-sm">
              <label className="flex items-center space-x-1">
                <input type="checkbox" className="accent-green-900" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[##00000080] hover:underline">
                Forgot password?
              </a>
            </div>

          {/* Login Button */}
          <button
            className="w-full bg-[#004D4A] text-[#D0FF71] py-4 rounded-full hover:bg-green-900 transition"
            type="button"
          >
            <span>Login</span>
            <Image
              src="/assets/images/login-logo.png"
              alt="Logo"
              width={20}
              height={20}
              className="inline-block ml-2" 
            />
          </button>
          

          {/* Redirect to signup */}
          <p className="text-sm py-2 text-center text-gray-600 mt-2">
            Don’t have an account?{" "}
            <Link href="/med-form" className="text-[#004D4A] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          </div>

          {/* GOOGLE SIGN IN */}
          <div className="mb-8">
            <button className="text-sm w-full border rounded-full bg-[#D9D9D9D1] px-8 py-2 mb-20 flex items-center justify-center gap-2 text-[#004D4A] hover:underline">
              <span>Sign in with Google</span>
              <Image
                src="/assets/images/google-icon.png"
                alt="Google"
                width={20}
                height={20}
              />
            </button>
          </div>
          
          {/* TERMS AND CONDITIONS */}
          <p className="text-xs mt-6 text-center">
            By signing up you acknowledge and agree to Medicart <br/> 
            <span className="text-[#004D4A]">General Terms of Use</span> and 
            <span className="text-[#004D4A]"> Privacy Policy</span>
          </p>
      </div>
    </div>
  );
};

export default LoginPage;


