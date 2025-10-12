'use client';

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id?: string;
  name: string;
  description: string;
  price: string;
  image: StaticImageData | string;
  category?: string;
}

export default function ProductCard({
  id,
  name, 
  description, 
  price, 
  image,
  category 
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

    // Generate a slug from the product name for the URL
    const productSlug = id || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const handleAddToCart = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent navigation when clicking add to cart
      e.stopPropagation();
      console.log('Added to cart:', name);
      // Add your cart logic here
    };
  
    const handleToggleFavorite = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent navigation when clicking favorite
      e.stopPropagation();
      setIsFavorite(!isFavorite);
    };
  return (
    <Link 
      href={`/products/${productSlug}`}
      className="relative w-[250px] bg-transparent my-4 mb-10 rounded-2xl shadow-lg hover:scale-105 transition-transform"
    >
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
      {category && (
          <p className="text-xs text-teal-700 font-semibold uppercase mb-1">
            {category}
          </p>
        )}
        <div className="flex flex-row justify-between">
          <h5 className="text-left text-xs w-7/10">
            {name}
            <span className="block">{description}</span>
          </h5>
          <p className="text-right text-xs w-3/10">{price}</p>
        </div>

        <div className="flex flex-row justify-between mt-2">
          <button
            onClick={handleToggleFavorite}
            className="mt-2 p-1 transition"
            aria-label="Add to favorites"
          >
            <Heart 
              size={18} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
            />
          </button>

          <button
            onClick={handleAddToCart}
            className="flex flex-row items-center border border-gray-300 rounded-md px-2 py-0.5 hover:bg-gray-100 transition"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} color="#004D4A"/>
            <p className="text-xs ml-1">Add</p>
          </button>
        </div>
      </div>
      </Link>
  );
}
