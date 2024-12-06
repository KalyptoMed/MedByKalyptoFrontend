import React from "react";
import Navbar from "@/Navbar/Navbar";
import Image from "next/image";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

export default function HeroSection() {
  return (
    <div className=" bg-cover bg-[url('/assets/images/HeroBackground.jpg')] h-auto pt-4">
      <Navbar />
      <div className="flex flex-col md:flex-row p-10">
        <div className="flex flex-col w-full md:w-2/4">
          <div className="h-auto flex flex-col font-sans">
            <h4 className="text-white text-5xl md:text-6xl font-light mt-10 font-sans">
              Distribution and Delivery of drugs made easy with{" "}
              <strong className="text-[#CFFC51]  text-7xl font-extrabold italic">
                Medicart
              </strong>
            </h4>
          </div>
          <h6 className="text-white text-[18px] font-light mt-8">
            How can a fish not take his pill before flying there more to life
            than jusut chopping life after the onmterk pkjtrghji bola say no to
            drugs
          </h6>
          <div className="flex justify-center mr-20 mt-10">
            <button className="bg-white hover:bg-[#0038FF] text-[#0038FF] hover:text-white px-4 flex gap-2 items-center font-semibold py-2 rounded-lg ">
             Shop now
             <BsFillArrowUpRightCircleFill size={18} />
            </button>
          </div>
        </div>
        <Image
          src="/assets/images/drugicons.png"
          alt="drug"
          width={500}
          height={500}
          className="object-contain "
        />
      </div>
    </div>
  );
}
