import React from "react";

export default function About() {
  return (
    <div className="bg-[#0038ff] h-auto py-10 flex flex-col justify-center text-center  my-1">
      <h1 className="text-6xl font-bold text-white">
        About Medicart by Kalypto
      </h1>
      <h3 className="text-3xl font-bold text-white">
        Provides detailed information about our product
      </h3>
      <div className="flex justify-center">
        <h6 className="text-white text-lg">
          Medicart by Kalypto is at the forefront of the digital healthcare
          revolution, providing a simple, secure, and efficient way to order
          medications online. By combining convenience, accessibility, and
          safety, Medicart is helping users manage their health with ease and
          confidence. Whether it’ s managing long-term prescriptions or
          addressing immediate medical needs.
        </h6>
      </div>
    </div>
  );
}
