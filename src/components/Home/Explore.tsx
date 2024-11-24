import React from "react";
import Image from "next/image";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

export default function Explore() {
  return (
    <div className="bg-[#0038ff] h-auto flex flex-col lg:flex-row">
      <div className="w-2/5 h-[400px] m-20 relative">
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

      <div className="bg-cover bg-[url('/assets/images/DrugBackground.png')] h-auto w-3/5 mt-20">
        <h3 className="text-white text-4xl font-extrabold mr-15">
          Explore the benefits and features of Kaly-medic
        </h3>
        <div className="flex flex-row justify-around h-auto my-10 relative">
          <div className=" bg-[#071443] w-36  rounded-3xl flex flex-col items-center py-5 px-3">
            <BsFillArrowUpRightCircleFill color="#fff" size={20} />
            <h4 className="text-[#fff] text-[11px] font-bold my-3">
              Wide Range of Health Products
            </h4>
            <h6 className="text-[#Ddd] text-[8px] ">
              Find everything from medical devices to healthcare software
              solutions
            </h6>
          </div>
          <div className=" bg-[#071443] w-36  rounded-3xl flex flex-col items-center py-5 px-3  ">
            <BsFillArrowUpRightCircleFill color="#fff" size={20} />
            <h4 className="text-[#fff] text-[11px] font-bold my-3">
              Verified Product Supplies
            </h4>
            <h6 className="text-[#Ddd] text-[8px] ">
              Find everything from medical devices to healthcare software
              solutions
            </h6>
          </div>
          <div className=" bg-[#071443] w-36  rounded-3xl flex flex-col items-center py-5 px-3">
            <BsFillArrowUpRightCircleFill color="#fff" size={20} />
            <h4 className="text-[#fff] text-[11px] font-bold my-3">
              Customized Recommendations
            </h4>
            <h6 className="text-[#Ddd] text-[8px] ">
              Find everything from medical devices to healthcare software
              solutions
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
