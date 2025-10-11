// src/components/ProductDetails.tsx
import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";

// ✅ Product data structure
const productCategories = [
  {
    name: "ANTIBIOTICS",
    color: "#AABE43",
    products: [
      {
        name: "DOXYCAP",
        description: "Doxycline 100mg caps (10x10)",
        price: "N2,000",
        image: "/assets/images/Drug.png",
      },
      {
        name: "AMOXIL",
        description: "Amoxicillin 500mg (5x20)",
        price: "N1,800",
        image: "/assets/images/Drug.png",
      },
      {
        name: "AMOXIL",
        description: "Amoxicillin 500mg (5x20)",
        price: "N1,800",
        image: "/assets/images/Drug.png",
      },
      {
        name: "AMOXIL",
        description: "Amoxicillin 500mg (5x20)",
        price: "N1,800",
        image: "/assets/images/Drug.png",
      },
      {
        name: "AMOXIL",
        description: "Amoxicillin 500mg (5x20)",
        price: "N1,800",
        image: "/assets/images/Drug.png",
      },
      {
        name: "AMOXIL",
        description: "Amoxicillin 500mg (5x20)",
        price: "N1,800",
        image: "/assets/images/Drug.png",
      },
      {
        name: "AMOXIL",
        description: "Amoxicillin 500mg (5x20)",
        price: "N1,800",
        image: "/assets/images/Drug.png",
      },
    ],
  },
  {
    name: "ANTI-DIARRHOEAL",
    color: "#6180EF",
    products: [
      {
        name: "COLOSEAL CAPS",
        description: "Loperamide 2mg caps (10x10)",
        price: "N2,000",
        image: "/assets/images/Drug.png",
      },
    ],
  },
  {
    name: "ANTACIDS/ANTI-ULCER",
    color: "#6180EF",
    products: [
      {
        name: "OMEZOLE 20",
        description: "Omeprazole 20mg caps (4x7)",
        price: "N2,000",
        image: "/assets/images/Drug.png",
      },
    ],
  },
  // ✅ Add other categories like ANTI-DIABETICS, VITAMINS, etc. here
];

export default function ProductDetails() {
  return (
    <div className="relative">
      <div className="hidden md:flex flex-col md:flex-row my-20 mx-6 md:mx-12 bg-[#87953f]/90 rounded-2xl px-4 items-center justify-around text-white backdrop-blur-sm">
        <div className="text-[32px] md:text-[30px] pl-10 text-center font-semibold italic">
          <h1>LET&apos;S SKIP TO THE</h1>
          <h1>HEALTHY PART</h1>
        </div>

        <div className="h-32 w-64 relative md:my-0">
          <Image
            src="/assets/images/shopping.png"
            alt="shopping"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="text-left font-semibold relative">
          <div>
            <p>ORDER ONLINE</p>
            <p>PICKUP AT NEAREST LOCATION</p>
            <p>OR TO YOUR DOORSTEP</p>
          </div>
          <Image
            src="/assets/images/Vector 5 (1).png"
            alt="Vector"
            width={60}
            height={20}
            className="absolute top-0 left-8 -translate-x-full -translate-y-1/2 hidden md:block"
          />
        </div>
      </div>

      {/* 🧠 Trending Section */}
      <div className="m-6 md:m-12 flex justify-between items-center text-white font-extrabold">
        <div>
          <h1 className="text-[28px] md:text-[32px] leading-[32px]">
            Trending Products
            <span className="flex items-center">
              for you!
              <Image
                src="/assets/images/love.png"
                alt="love"
                width={50}
                height={30}
                className="ml-1"
              />
            </span>
          </h1>
        </div>
        <div className="text-[#CFFC51] text-xl cursor-pointer hover:underline">
          See all products →
        </div>
      </div>

      {/* 🗂 Product Categories */}
      {productCategories.map((category) => (
        <div key={category.name} className="mt-12 px-4 md:px-10">
          <div
            className="inline-block px-4 py-2 text-[#D0FF71] text-base rounded-full mb-6 font-semibold border border-[#D0FF71]"
            // style={{ backgroundColor: category.color }}
          >
            {category.name}
          </div>

          <div className="flex flex-wrap gap-6 justify-start md:justify-start">
            {category.products.map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      ))}

      {/* Footer Line */}
      <div className="w-full h-0.5 bg-white my-12"></div>
    </div>
  );
}
