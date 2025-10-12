// src/components/ProductDetails.tsx
'use client';

import React from "react";
import ProductCard from "./ProductCard";
import { allProductCategories } from "@/components/AllProducts/AllProducts";
import HeroBanner from "../AllProducts/HeroBanner";
import TrendingHeader from "../AllProducts/TrendingHeader";


export default function ProductDetails() {
  return (
    <div className="relative">
      <HeroBanner />
      <TrendingHeader/>

      {/* 🗂 Product Categories */}
      {allProductCategories.map((category) => (
        <div key={category.name} className="mt-12 px-4 md:px-10">
          <div
            className="inline-block px-4 py-2 text-[#D0FF71] text-base rounded-full mb-6 font-semibold border border-[#D0FF71]"
          >
            {category.name}
          </div>

          <div className="flex flex-wrap gap-6 justify-start md:justify-start">
            {/* ✅ Only show first 5 products */}
            {category.products.slice(0, 5).map((product, idx) => (
              <ProductCard key={idx} {...product} />
            ))}
          </div>
        </div>
      ))}

      <div className="w-full h-0.5 bg-white my-12"></div>
    </div>
  );
}
