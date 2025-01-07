import { PiPackage } from "react-icons/pi";
import Image from "next/image";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

export default function Delivery() {
  return (
    <div className="bg-[#0038ff] h-[370px] w-full flex flex-col md:flex-row text-center my-1">
      <div className="flex flex-col w-1/2 justify-center md:pl-20">
        <div className="flex flex-row  w-28 justify-center items-center bg-[#AABE43] rounded-lg py-1 px-2 gap-2">
          <PiPackage color="#fff" />
          <p className="text-white text-sm">Delivery</p>
        </div>
        <h1 className="font-extrabold text-4xl text-white my-3 md:text-left ">
          Enjoy free delivery from Medicart by Kalypto
        </h1>
        <div className="w-4/6 py-6 flex flex-col justify-center  ">
        <button className="bg-[#fff] hover:bg-[#0038FF] text-[#0038FF] hover:text-white px-2 flex gap-2  items-center font-semibold py-1 rounded-lg  w-32">
              Shop now
              <BsFillArrowUpRightCircleFill size={18} />
            </button>
        </div>
      </div>
      <div className="relative h-[80%]">
        <Image
          src="/assets/images/delivery.png"
          alt="delivery"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
