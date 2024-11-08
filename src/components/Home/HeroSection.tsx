import React from "react";

export default function HeroSection() {
  return (
    <div className="justify-center flex">
      <div className="h-auto bg-[#0038FF] flex flex-col w-2/4">
        <h4 className="text-white text-4xl text-center mt-10">Distribution and Delivery of drugs made easy with <strong>Medicart</strong></h4>
      </div>
      <div className="flex justify-center mt-10">
        <button className="bg-[#0038FF] text-white px-4 py-2 rounded-lg">Get Started</button>
        </div>
    </div>
  );
}
