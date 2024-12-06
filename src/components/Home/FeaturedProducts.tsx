import React from "react";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

export default function FeaturedProducts() {
  return (
    <div className="bg-[#0038ff] h-auto py-10 flex flex-col justify-center text-center  my-1">
      <h3 className="font-extrabold text-4xl text-white my-3 md:text-left md:pl-20 ">
        Featured Products
      </h3>
      <h6 className="text-[#d0d0d0] font-thin text-xl mb-10 text-center md:text-left md:pl-20">
        Discover our selection of top-rated and popular medical digital
        products.
      </h6>
      <div className="w-[98%]  flex flex-wrap gap-4  justify-center  ">
        {/*each container */}
        <div className="w-[90%] sm:w-[50%] lg:w-[31%] relative flex flex-row mb-4">
          <div className="bg-[#071443] h-[350px] w-2/3 rounded-[25px] pr-[32%]  flex flex-col justify-center px-3">
            <h3 className="text-white font-black  text-sm">
              Telemedicine Solutions
            </h3>
            <h5 className="text-[#d0d0d0] text-[10px] pt-2 ">
              Connect with patients remotely and provide quality healthcare
              services.
            </h5>
          </div>
          <div className=" bg-cover bg-[url('/assets/images/drugPix.png')] w-4/6 right-0 h-[350px] rounded-[25px] absolute flex flex-col items-center pt-8 ">
            <h3 className="text-white font-extrabold text-[24px] text-center">
              MEDICAL DRUGS
            </h3>
            <button className="bg-[#0038FF] hover:bg-white text-white hover:text-[#0038FF] px-2 flex gap-2 mt-auto mb-6 items-center font-semibold py-1 rounded-lg justify-end align-baseline">
              Shop now
              <BsFillArrowUpRightCircleFill size={18} />
            </button>
          </div>
        </div>

        {/*second container */}
        <div className="w-[90%] sm:w-[50%] lg:w-[31%] relative flex flex-row mb-4">
          <div className="bg-[#071443] h-[350px] w-2/3 rounded-[25px] pr-[32%]  flex flex-col justify-center px-3">
            <h3 className="text-white font-black  text-sm">
              Telemedicine Solutions
            </h3>
            <h5 className="text-[#d0d0d0] text-[10px] pt-2 ">
              Connect with patients remotely and provide quality healthcare
              services.
            </h5>
          </div>
          <div className=" bg-cover bg-[url('/assets/images/drugPix.png')] w-4/6 right-0 h-[350px] rounded-[25px] absolute flex flex-col items-center pt-8 ">
            <h3 className="text-white font-extrabold text-[24px] text-center">
              MEDICAL DRUGS
            </h3>
            <button className="bg-[#0038FF] hover:bg-white text-white hover:text-[#0038FF] px-2 flex gap-2 mt-auto mb-6 items-center font-semibold py-1 rounded-lg justify-end align-baseline">
              Shop now
              <BsFillArrowUpRightCircleFill size={18} />
            </button>
          </div>
        </div>

        {/*third container */}
        <div className="w-[90%] sm:w-[50%] lg:w-[31%] relative flex flex-row mb-4">
          <div className="bg-[#071443] h-[350px] w-2/3 rounded-[25px] pr-[32%]  flex flex-col justify-center px-3">
            <h3 className="text-white font-black  text-sm">
              Telemedicine Solutions
            </h3>
            <h5 className="text-[#d0d0d0] text-[10px] pt-2 ">
              Connect with patients remotely and provide quality healthcare
              services.
            </h5>
          </div>
          <div className=" bg-cover bg-[url('/assets/images/drugPix.png')] w-4/6 right-0 h-[350px] rounded-[25px] absolute flex flex-col items-center pt-8 ">
            <h3 className="text-white font-extrabold text-[24px] text-center">
              MEDICAL DRUGS
            </h3>
            <button className="bg-[#0038FF] hover:bg-white text-white hover:text-[#0038FF] px-2 flex gap-2 mt-auto mb-6 items-center font-semibold py-1 rounded-lg justify-end align-baseline">
              Shop now
              <BsFillArrowUpRightCircleFill size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
