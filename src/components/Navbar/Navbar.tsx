"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#fcfcfc] flex justify-between items-center mx-1 md:mx-4 px-2 md:px-10 py-3 rounded-xl text-center ">
      <div>
        <Image
          src="/assets/images/logo_no bg 1.png"
          alt="logo"
          width={70}
          height={50}
        />
      </div>
      <div className="hidden md:flex w-3/6 justify-around font-medium text-lg">
        <ul className="flex justify-around w-full">
          <li className="text-[#0B438D] hover:text-[#0038FF]">
            <a href="/">Home</a>
          </li>
          <li className="text-[#0B438D] hover:text-[#0038FF]">
            <a href="/product">Product</a>
          </li>
          <li className="text-[#0B438D] hover:text-[#0038FF]">
            <a href="/solutions">Solutions</a>
          </li>
          <li className="text-[#0B438D] hover:text-[#0038FF]">
            <a href="/contact us">Contact us</a>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex items-center cursor-pointer relative">
        <HiOutlineShoppingCart
          className="text-[#0038FF] hover:text-[#071443]"
          size={25}
        />
        <h4 className="text-[#0B438D] hover:text-[#0038FF] absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-sm">
          1
        </h4>
      </div>
      <div className="md:hidden flex items-center mr-3">
        <button onClick={toggleMenu} className="text-[#0038FF] hover:text-[#071443]">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-20 left-0 w-full pb-6 bg-[#fcfcfc] flex flex-col items-center md:hidden">
          <ul className="flex flex-col items-center w-full font-medium text-lg">
            <li className="text-[#0B438D] hover:text-[#0038FF] py-2">
              <a href="/">Home</a>
            </li>
            <li className="text-[#0B438D] hover:text-[#0038FF] py-2">
              <a href="/product">Product</a>
            </li>
            <li className="text-[#0B438D] hover:text-[#0038FF] py-2">
              <a href="/solutions">Solutions</a>
            </li>
            <li className="text-[#0B438D] hover:text-[#0038FF] py-2">
              <a href="/contact us">Contact us</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}