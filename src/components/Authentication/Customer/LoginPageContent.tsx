"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const LoginPageContent: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#EBFFF5]">
      {/* LEFT SIDE IMAGE */}
      <div className="relative md:w-1/2 h-screen">
        <Image
          src="/assets/image/ladydoctor.png" 
          alt="Lady Doctor"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md mb-20 text-center">
          <h1 className="text-5xl font-bold mt-10 leading-snug text-[#004D4A]">
            Welcome   
          </h1>
          <p className="text-3xl font-bold mb-10 leading-snug text-[#004D4A]">
            Login
          </p>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
        className="w-full bg-[#004D4A] text-[#D0FF71] rounded-full px-4 py-4 mb-8 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#004D4A] text-[#D0FF71] rounded-full px-4 py-4 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="mb-28 w-full flex justify-between items-center"> 
            {/* Forgot Password & Remember Me */}
            <p className=" text-sm text-left">
            <a href="#" className="text-[##000000] hover:underline"> 
              Remember me
            </a>
          </p>

            <p className="text-sm text-right">
            <a href="#" className="text-[##00000080] hover:underline"> 
              Forgot Password?
            </a>
          </p>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-[#004D4A] text-[#D0FF71] py-4 rounded-full hover:bg-green-900 transition"
            type="button"
          >
            Log in
          </button>

          {/* Redirect to signup */}
          <p className="text-sm py-2">
            Don’t have an account?{" "}
            <Link href="/customer-signup" className="text-[#004D4A] font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          
          <p className="text-sm mt-6 py-3 rounded-full bg-[#D9D9D9D1]">
            <a href="#" className="text-[#004D4A] hover:underline">
                Sign in with Google
            </a>
          </p>
          <p className="text-sm mt-24 py-4">
            By signing up you acknowledge and agree to Medicart  <span className="text-[#004D4A]">General Terms of Use</span> and 
              <span className="text-[#004D4A]"> Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPageContent;
