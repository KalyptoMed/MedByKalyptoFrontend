"use client";

import React from "react";
import Image from "next/image";

const SignupForm: React.FC = () => {
    
  return (
    <div className="min-h-screen flex bg-[#003D33]">
      {/* LEFT IMAGE SECTION */}
      <div className="relative w-3/5 hidden md:block bg-[#b1cecd59]">
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
            Are you a Medical <span className="text-[#D0FF71] rounded-full">Professional</span>? Get your free Medicart account now
        </p>

        <form className="flex flex-col space-y-4 text-[#000000] bg-[##003D33] ">
          <input
            type="text"
            placeholder="Enter Surname"
            className="p-3 rounded-full text-gray-800 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="text"
            placeholder="First Name"
            className="p-3 rounded-full text-gray-800 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <input
            type="text"
            placeholder="Profession"
            className="p-3 rounded-full text-gray-800 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
         <input
            type="text"
            placeholder="Contact Address"
            className="p-3 rounded-full text-gray-800 text-sm bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          
          {/* <button
            type="submit"
            className="mt-30 bg-[#D0FF71DB] text-[#003D33] text-sm font-semibold py-3 rounded-full hover:bg-[#b8e605] transition duration-200"
          >
            <a href="/med-form2" className="text-[#004D4A] underline">
            <span>Continue</span>
                        <Image
                          src="/assets/images/Arrow.png"
                          alt="Arrow"
                          width={20}
                          height={20}
                          className="inline-block ml-2" 
                        />
        
            </a>
          </button> */}

          <button
            type="submit"  
            className="w-full bg-[#D0FF71DB] text-[#003D33] text-sm py-3 rounded-full hover:bg-[#b8e605] transition"         
        >
            <a href="/med-form2" className="text-[#004D4A] underline">
               <span>Continue</span>
                <Image
                   src="/assets/images/Arrow.png"
                   alt="Arrow"
                   width={20}
                   height={20}
                   className="inline-block ml-2 text-[#004D4A]" 
                />
                </a>
        </button>


        </form>
      </div>
    </div>
  );
};

export default SignupForm;
