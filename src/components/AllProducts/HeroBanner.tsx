// src/components/HeroBanner.tsx
import React from "react";
import Image from "next/image";

interface HeroBannerProps {
  className?: string;
}

export default function HeroBanner({ className = "" }: HeroBannerProps) {
  return (
    <div className={`hidden md:flex flex-col md:flex-row my-20 mx-6 md:mx-12 bg-[#87953f]/90 rounded-2xl px-4 items-center justify-around text-white backdrop-blur-sm ${className}`}>
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
  );
}