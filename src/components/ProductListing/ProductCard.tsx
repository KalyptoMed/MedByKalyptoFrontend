import React from "react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

export default function ProductCard({
  name,
  description,
  price,
  image,
}: ProductCardProps) {
  return (
    <div className="relative w-[250px] bg-transparent my-4 mb-10 rounded-2xl shadow-lg hover:scale-105 transition-transform">
      {/* Product Image */}
      <div className="flex flex-col">
        <Image
          src={image}
          alt={name}
          width={250}
          height={100}
          className="rounded-t-2xl object-cover"
          loading="lazy"
        />
      </div>

      {/* Product Info Box */}
      <div className="absolute bg-white/90 backdrop-blur-sm bottom-[-56px] w-full p-3 rounded-b-2xl shadow-md">
        <div className="flex flex-row justify-between">
          <h5 className="text-left text-xs w-7/10">
            {name}
            <span className="block">{description}</span>
          </h5>
          <p className="text-right text-xs w-3/10">{price}</p>
        </div>

        <div className="flex flex-row justify-between mt-2">
          <Image
            src="/assets/images/rate.png"
            alt="rate"
            width={20}
            height={10}
            className="object-contain"
          />

          <button className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5 hover:bg-gray-100 transition">
            <Image
              src="/assets/images/Add.png"
              alt="Add"
              width={15}
              height={10}
            />
            <p className="text-xs ml-1">Add</p>
          </button>
        </div>
      </div>
    </div>
  );
}
