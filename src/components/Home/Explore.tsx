import React from "react";
import Image from "next/image";
import {  BsTrophyFill } from "react-icons/bs";
import { FaCompass } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

export default function Explore() {
  return (
    <div className="bg-[#0038ff] h-auto flex flex-col lg:flex-row my-1">
      <div className="w-4/5 lg:w-2/5 h-[300px] lg:h-[400px] m-10 lg:m-20 relative">
        <div className="bg-white rounded-e-[45px]  rounded-t-[40px]  h-[371px] mt-10">
          <div className=" bg-[#071443]  rounded-e-[40px] rounded-t-[40px] h-[370px] ml-[2px]   ">
            <Image
              src="/assets/images/ladydoctor.png"
              alt="Picture of the author"
              width={325}
              height={325}
              className="absolute top-0 "
            />
          </div>
        </div>
      </div>

      <div className="bg-cover bg-[url('/assets/images/DrugBackground.png')] h-auto  lg:w-3/5 items-center lg:items-start p-5 mt-20">
        <h3 className="text-white text-3xl lg:text-4xl font-extrabold w-[90%] text-center lg:text-left">
          Explore the benefits and features of Kaly-medic
        </h3>

        {/*Box section */}
        <div className="relative flex justify-center items-center h-[300px] lg:h-[280px] mx-[5%] lg:w-4/5 lg:my-10">
           <div className="absolute bg-[#071443] w-32 h-38 lg:w-36 lg:h-40 rounded-3xl flex flex-col items-center justify-center py-3 px-3 left-0 lg:left-2">
            <FaCompass color="#fff" size={20} />
            <h4 className="text-white text-xs lg:text-[11px] font-bold my-2 text-center">
              Wide Range of Health Products
            </h4>
            <h6 className="text-[#Ddd] text-[9px] lg:text-[8px] text-center">
              Find everything from medical devices to healthcare software
              solutions
            </h6>
          </div>

          {/* Box 2 */}
          <div className="absolute bg-[#071443] w-32 h-38 lg:w-36 lg:h-40 rounded-3xl flex flex-col items-center justify-center py-3 px-3  bottom-0 lg:bottom-2">
            <BsTrophyFill color="#fff" size={20} />
            <h4 className="text-white text-xs lg:text-[11px] font-bold my-2 text-center">
              Verified Product Supplies
            </h4>
            <h6 className="text-[#Ddd] text-[9px] lg:text-[8px] text-center">
              Trusted suppliers who meet industry standards with all goodies attached.
            </h6>
          </div>

          {/* Box 3 */}
          <div className="absolute bg-[#071443] w-32 h-38 lg:w-36 lg:h-40 rounded-3xl flex flex-col items-center justify-center py-3 px-3 animate-clockwise-3 right-0 lg:right-2">
            <RiSendPlaneFill color="#fff" size={20} />
            <h4 className="text-white text-xs lg:text-[11px] font-bold my-2 text-center">
              Customized Recommendations
            </h4>
            <h6 className="text-[#Ddd] text-[9px] lg:text-[8px] text-center">
              Personalized health product recommendations.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
