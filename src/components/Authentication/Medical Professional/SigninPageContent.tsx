"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; 


const SigninPageContent: React.FC = () => {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push("/med-form");
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#EBFFF5]">
      {/* LEFT SIDE IMAGE */}
      <div className="relative md:flex w-3/5 bg-gray-100 items-center justify-center">
        <Image 
          src="/assets/images/Female doctor.png"
          alt="DoctorCare"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="flex flex-col justify-center items-center w-full rounded-l-3xl md:w-2/5 p-8 md:p-12">
        <div className="w-full max-w-md text-center">
          <h1 className="text-5xl font-bold mb-20 leading-snug">
            Explore simple, <br />
            secure, smarter <br />
            healthcare.
          </h1>

          <button
            onClick={handleSignupClick}
            className="w-full mt-2 bg-green-900 text-white py-4 rounded-full hover:bg-green-700 transition"
            type="button"
          >
            <a href="/med-form" className="text-[#004D4A] underline"></a>
            <span className="text-[#D0FF71]">Sign in</span>
          </button>

          <p className="text-sm mt-6 py-4 bg-green-200 rounded-full text-[#004D4A] transition-shadow">
            Have account already?{" "}
            <a href="/med-login" className="text-[#004D4A] underline">
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

export default SigninPageContent;
