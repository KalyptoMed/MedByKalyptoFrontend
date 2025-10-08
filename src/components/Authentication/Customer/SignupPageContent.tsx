"use client";

import Image from "next/image";
import React from "react";


const SignupPageContent: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-[#EBFFF5]">
      {/* LEFT SIDE IMAGE */}
      <div className="relative md:flex md:w-1/2 h-screen">
        <Image
          // src="/doctor.jpg" 
          src="/assets/image/ladydoctor.png"
          alt="Lady_Doctor"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <div className="w-full max-w-md  text-center">
          <h1 className="text-5xl font-bold mb-20 leading-snug">
            Explore simple, <br />
            secure, smarter <br />
            healthcare.
          </h1>
          {/* <p className="text-gray-500 text-sm mb-6">
            Our app gives you total control over your health
          </p> */}

          <button
            className="w-full mt-2 bg-green-900 text-white py-4 rounded-full hover:bg-green-700 transition"
            type="button"
          >
            <span className="text-[#D0FF71]">Sign in</span>
          </button>

          <p className="text-sm mt-6 py-4 bg-green-200 rounded-full text-[#004D4A] transition-shadow">
            Have account already?{" "}
            <a
              href="/(authentication)/(customer)/customer-login"
              className="text-[#004D4A] hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
        <p className="text-sm mt-40 text-center max-w-xs">
            <span className="text-[#88b59ecc]">By</span> signing up, you acknowledge and agree to <span className="text-[#88b59ecc]">Medi</span>cart{" "}
            <a href="#" className="text-[#004D4A] hover:underline">
              General Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#004D4A] hover:underline">
              Privacy Policy
            </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPageContent;
