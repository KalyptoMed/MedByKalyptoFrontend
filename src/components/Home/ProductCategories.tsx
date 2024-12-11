import React from "react";
import ProductCard from "./ProductCard";

export default function ProductCategories() {
  const products = [
    {
      id: 1,
      name: "Malaria Tablet",
      price: "$2,000",
      image: "/assets/images/drugPix.png",
    },
    {
      id: 2,
      name: "Syringed Drugs",
      price: "$2,000",
      image: "/assets/images/drugPix.png",
    },
    {
      id: 3,
      name: "Diabetes Drugs",
      price: "$3,000",
      image: "/assets/images/drugPix.png",
    },
    {
      id: 4,
      name: "Pregnancy Kit",
      price: "$5,000",
      image: "/assets/images/drugPix.png",
    },
  ];

  return (
    <div className="bg-[#0038ff] h-auto py-10 flex flex-col justify-center text-center  my-1">
      <h3 className="font-extrabold text-4xl text-white my-3 md:text-left md:pl-20">
        Product Categories
      </h3>
      <h6 className="text-[#d0d0d0] font-thin text-xl mb-10 text-center md:text-left md:pl-20">
        Explore our wide range of medical digital products
      </h6>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-16 lg:px-6 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
