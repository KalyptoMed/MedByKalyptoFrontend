import React from "react";
export default function FeaturedProducts() {
  return (
    <div className="bg-[#0038ff] h-auto py-10 pl-20">
      <h3 className="font-extrabold text-4xl text-white my-3">Featured Products</h3>
      <h6 className="text-[#d0d0d0] font-thin text-xl mb-10">
        Discover our selection of top-rated and popular medical digital
        products.
      </h6>
      <div className="w-full justify-between ">
        <div className="w-2/6 relative flex flex-row ">
          <div className="bg-[#071443] h-[350px] w-2/3 rounded-[25px] pr-[35%]  flex flex-col justify-center ">
            <h3 className="text-white font-black  text-sm">Telemedicine Solutions</h3>
            <h5 className="text-[#d0d0d0]">
              Connect with patients remotely and provide quality healthcare
              services.
            </h5>
          </div>
          <div className=" bg-cover bg-[url('/assets/images/drugPix.png')] w-4/6 right-0 h-[350px] rounded-[25px] absolute ">
            <h3>MEDICAL DRUGS</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
