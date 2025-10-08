import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";
// import DrugIcon from "@/public/assets/images/drugicons.png";
// import Herobackground from "@/public/assets/images/HeroBackground.jpg";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

export default function HeroSection() {
  const Herobackground = "/assets/images/bgimage.png";
  return (
    <div
      className="bg-cover bg-center h-auto pt-4 relative"
      style={{
        backgroundImage: `
        linear-gradient(
        to bottom,
        #004d4a 0%,
        #005c58 50%,
        #005c58 70%,
        #d0ff71 100%
      ),
          url(${Herobackground})
        `,
      }}
    >
      <Navbar />
      <div className="flex flex-col md:flex-row pt-10 md:pt-20 justify-between  items-center md:items-start text-center md:text-left px-4 md:px-20 ">
        <div className="flex flex-col w-full md:w-2/4">
          <div className="h-auto flex flex-col font-sans">
            <h4 className="text-[#ebfff5] text-5xl md:text-6xl font-light mt-10 font-sans">
              <strong className="text-[#d0fe71]  text-7xl font-extrabold italic">
                Medicart{" "}
              </strong>
              Healthcare Solution
            </h4>
          </div>
          <h6 className="text-[#ebfff5] text-[18px] font-light italic mt-8">
            Healthcare should be simple, accessible, and stress-free  and that’s exactly what Medicart brings to you
          </h6>
          <div className="flex justify-center mr-10 mt-10 gap-10">
            <button className="bg-white hover:bg-[#004D4A] text-[#004D4A] hover:text-white px-4 flex gap-2 items-center font-semibold py-2 rounded-lg ">
              Book an appointment
              <BsFillArrowUpRightCircleFill size={18} />
            </button>
            <button className="bg-white hover:bg-[#004D4A] text-[#004D4A] hover:text-white px-4 flex gap-2 items-center font-semibold py-2 rounded-lg ">
              Shop now
              <BsFillArrowUpRightCircleFill size={18} />
            </button>
          </div>
        </div>
        <Image
          src="/assets/images/landingpageimage.png"
          alt="drug"
          width={500}
          height={500}
          className="object-contain "
        />
      </div>
    </div>
  );
}
