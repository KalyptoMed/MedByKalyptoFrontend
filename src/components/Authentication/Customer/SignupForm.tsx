"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    
  return (
    <div className="min-h-screen flex bg-[#003D33]">
      {/* LEFT IMAGE SECTION */}
      <div className="relative w-3/5 hidden md:block">
        <Image
          src="/assets/images/MediGroup.png"
          alt="MediCart Staff"
          layout="fill"
          objectFit="cover"
        //   className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex flex-col justify-center w-full rounded-l-3xl md:w-2/5 p-10 bg-[##003D33] text-white">
        <h2 className="text-3xl font-semibold mb-4">Sign up</h2>
        <p className="mb-8 text-gray-300">
          Hey! Welcome to MediCart. Get your free MediCart account now.
        </p>

        <form className="flex flex-col space-y-4 text-[#000000] bg-[##003D33] ">
            {/* <div className="mb-4"> */}
            {/* <label htmlFor="surname" className="">
              Surname
            </label> */}
            {/* <div className="p-3 rounded-full text-gray-600 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300">  */}
          <input
            type="text"
            placeholder="Enter Surname"
            className="p-3 rounded-full text-gray-800 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
            {/* </div> */}
            {/* </div>  */}

          <input
            type="text"
            placeholder="First Name"
            className="p-3 rounded-full text-gray-800 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="text"
            placeholder="Contact Address"
            className="p-3 rounded-full text-gray-800 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <div className="flex gap-3 text-gray-800 text-sm">
            <input
              type="text"
              placeholder="Country"
              className="p-3 w-1/2 rounded-full bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="State"
              className="p-3 w-1/2 rounded-full bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/*  PASSWORD FIELD WITH EYE ICON */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-3 w-full rounded-full text-gray-300 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 pr-10"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-300 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="mt-10 bg-[#D0FF71DB] text-[#003D33] text-sm font-semibold py-3 rounded-full hover:bg-[#b8e605] transition duration-200"
          >
            Create account
          </button>
        </form>
        <p className="text-xs justify-center text-center">
            <input type="checkbox" className="accent-green-900 mt-3" />
                <span className="mb-1 p-2">Agree with terms and conditions</span>
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
          <a href="/customer-login" className="text-[#D9FF06] underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
