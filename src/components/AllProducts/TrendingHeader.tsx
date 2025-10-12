// src/components/TrendingHeader.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TrendingHeaderProps {
  showSeeAll?: boolean;
  seeAllLink?: string;
  className?: string;
}

export default function TrendingHeader({ 
  showSeeAll = true, 
  seeAllLink = "/allproducts",
  className = "" 
}: TrendingHeaderProps) {
  return (
    <div className={`mx-6 md:mx-12 mb-8 flex justify-between items-center text-white ${className}`}>
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
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
      {showSeeAll && (
        <Link 
          href={seeAllLink}
          className="text-[#CFFC51] text-lg md:text-xl font-semibold cursor-pointer hover:underline hidden md:block"
        >
          See all products →
        </Link>
      )}
    </div>
  );
}