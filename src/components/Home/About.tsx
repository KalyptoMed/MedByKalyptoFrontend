import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="bg-[#0038ff] h-[370px] w-full flex flex-col md:flex-row text-center  ">
      <div className="relative h-auto w-2/6">
        <Image
          src="/assets/images/smiley-male-doctor-with-crossed-arms.png"
          alt="smiling doctor"
          fill
          className="object-cover "
        />
      </div>
      <div className="w-4/6 py-6 flex flex-col justify-center  ">
        <h1 className="font-extrabold text-4xl text-white my-3 md:text-left md:pl-20">
          About Medicart by Kalypto
        </h1>
        <h3 className="text-[#d0d0d0] font-thin text-xl mb-10 text-center md:text-left md:pl-20">
          Provides detailed information about our product
        </h3>
        <div className=" bg-[#071443] h-auto w-3/6 rounded-2xl py-8 px-4 mx-auto relative">
          <h6 className="text-white text-sm ">
            Medicart by Kalypto is at the forefront of the digital healthcare
            revolution, providing a simple, secure, and efficient way to order
            medications online. By combining convenience, accessibility, and
            safety, Medicart is helping users manage their health with ease and
            confidence. Whether it’s managing long-term prescriptions or
            addressing immediate medical needs.
          </h6>
          <div className="absolute right-0 bottom-[-3%] flex-grow justify-end w-[100px] h-[50px]">
            <Image
              src="/assets/images/mobilehealth.png"
              alt="medicart logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
