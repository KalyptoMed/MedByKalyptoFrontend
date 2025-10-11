"use client";

import React from "react";
import Image from "next/image";

const ContinueForm: React.FC = () => {
    
  return (
    <div className="min-h-screen flex bg-[#003D33]">
      {/* LEFT IMAGE SECTION */}
      <div className="relative w-3/5 hidden bg-[#55706c] md:block">
        <Image
          src="/assets/images/ladydoctor.png"
          alt="Doctor"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex flex-col justify-center w-full md:w-2/5 p-10 bg-[##003D33] text-white rounded-l-3xl">
        <h2 className="text-3xl font-semibold mb-4">Sign up</h2>
        <p className="mb-8 text-gray-300">
            Are you a Medical <span className="text-[#D0FF71] rounded-full">Professional</span> ? Get your free Medicart account now
        </p>
        {/* <form className="flex flex-col space-y-4 text-[#000000] bg-[##003D33] "> */}
            {/* Document and Certificate */}
            <div>
            <input
            type="file"
            placeholder="Upload Document"
            className="p-3 rounded-full text-gray-800 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />

            </div>

            
          

          <button
            type="submit"
            className="mt-10 bg-[#D0FF71DB] text-[#003D33] text-sm font-semibold py-3 rounded-full hover:bg-[#b8e605] transition duration-200"
          >
            Create account
          </button>
        {/* </form> */}
        <p className="text-xs justify-center text-center">
            <input type="checkbox" className="accent-green-900 mt-3" />
                <span className="mb-1 p-2">Agree with Terms and Conditions</span>
        </p>

        {/* GOOGLE SIGN IN */}
        <div className="mt-20 w-1/2 justify-center flex text-center">
          <button className="text-sm w-full border rounded-full bg-[#D9D9D9D1] px-8 py-2 flex items-center justify-center gap-2 text-[#004D4A] hover:underline">
          <span>Sign in with Google</span>
          <Image
            src="/assets/images/google-icon.png"
            alt="Google"
            width={20}
            height={20}
          />
         </button>
        </div>

        <p className="mt-6 text-sm text-gray-300">
          Already have an account?{" "}
          <a href="/med-login" className="text-[#D9FF06] underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContinueForm;
