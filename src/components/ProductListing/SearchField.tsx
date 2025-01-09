import React from "react";
import Image from "next/image";

function SearchField() {
  return (
    <div>
      <div className="text-white font-sans ml-2 pr-56 align-center flex">
        <div className="text-[40px] leading-[40px] font-semibold italic text-center">
          <h1>LET&apos;S SKIP TO THE</h1>
          <h1>HEALTHY PART</h1>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <Image
          src="/assets/Images/shopping.png"
          alt="shopping"
          width={260}
          height={300}
        />
      </div>
      <div className="text-white flex flex-col justify-end items-center relative">
        <div className="font-semibold">
          <h4>ORDER ONLINE</h4>
          <h4>PICKUP AT NEAREST LOCATION</h4>
          <h4>OR TO YOUR DOORSTEP</h4>
        </div>

        <Image
          src="/assets/Images/Vector 5 (1).png"
          alt="Vector 5"
          width={60}
          height={20}
          className="absolute top-0 left-8 transform -translate-x-full -translate-y-1/2"
        />
      </div>
    </div>
  );
}

export default SearchField;
