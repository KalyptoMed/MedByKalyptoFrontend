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
    <div className="bg-[#fcfcfc] flex justify-between items-center h-24 px-2 md:px-10 py-3 text-center fixed top-0 left-0 right-0 z-50">
      <div>
        <Image
          src="/assets/images/logo_no bg 1.png"
          alt="logo"
          width={70}
          height={50}
        />
      </div>
      <div className="hidden md:flex w-3/6 justify-around font-bold text-lg">
        <ul className="flex justify-around w-full ">
          <li className="text-[#004D4A] hover:cursor-pointer hover:underline">
            <a href="/">Home</a>
          </li>
          <li className="text-[#004D4A] hover:cursor-pointer hover:underline">
            <a href="/productlisting">Product</a>
          </li>
          <li className="text-[#004D4A] hover:cursor-pointer hover:underline">
            <a href="/solutions">Solutions</a>
          </li>
          <li className="text-[#004D4A] hover:cursor-pointer hover:underline">
            <a href="/contact us">Contact us</a>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex items-center cursor-pointer relative">
        <HiOutlineShoppingCart
          className="text-[#004D4A] hover:text-[#071443]"
          size={25}
        />
        <h4 className="text-[#004D4A] hover:text-[#071443] absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-sm">
          1
        </h4>
      </div>
      <div className="md:hidden flex items-center mr-3">
        <button onClick={toggleMenu} className="text-[#004D4A] hover:text-[#071443] focus:outline-none">
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-20 left-0 w-full pb-6 bg-[#fcfcfc] flex flex-col items-center md:hidden">
          <ul className="flex flex-col items-center w-full font-medium text-lg">
            <li className="text-[#004D4A] hover:text-[#D0FF71] py-2">
              <a href="/">Home</a>
            </li>
            <li className="text-[#004D4A] hover:text-[#D0FF71] py-2">
              <a href="/product">Product</a>
            </li>
            <li className="text-[#004D4A] hover:text-[#D0FF71] py-2">
              <a href="/solutions">Solutions</a>
            </li>
            <li className="text-[#004D4A] hover:text-[#D0FF71] py-2">
              <a href="/contact us">Contact us</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}