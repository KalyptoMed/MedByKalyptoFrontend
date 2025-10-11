'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Share2, Heart, Minus, Plus } from 'lucide-react';


interface Product {
  image: string | StaticImageData;
  name: string;
  brand: string;
  genericName: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
}

export function ProductDetail({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
  
    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));
  
    return (
      <div className="flex from-blue-100 to-white mb-10 shadow-lg w-[90%] mx-auto mt-14 rounded-[50px]">
                <Image
                  src={product.image || "/api/placeholder/300/400"}
                  alt={product.name}
                  width={300}
                  height={500}
                  className="w-full max-w-sm rounded-l-[50px] object-contain"
                  style={{ objectFit: 'cover' }}
                  priority
            />
          {/* Product Info */}
          <div className="flex flex-col justify-center bg-[#EBFFF5] w-full rounded-[50px] px-12 -ml-20" >
          
            <h1 className="text-5xl font-bold text-teal-900 mb-2 mt-12">
              {product.name}
            </h1>
            
            <p className="text-[#B4E32D] text-base mb-4 ">
              Brand: {product.brand} | Generic Name: {product.genericName}
            </p>
  
            {/* Price */}
            <div className='border-y border-black my-6 mb-10'>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-bold text-teal-900">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.discount && (
                  <span className="bg-[#CFFC51] text-teal-900 px-3 py-1 rounded-full text-sm font-semibold">
                    -{product.discount}%
                  </span>
                )}
              </div>
    
              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-teal-700">In stock |</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < product.rating ? "text-[#CFFC51]" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                </div>
            </div>
  
            {/* Quantity Selector */}
            <div className="mb-6 flex gap-12">
              <label className="block text-teal-900 font-semibold align-middle">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-teal-800 rounded-lg overflow-hidden">
                  <button 
                    onClick={decrementQuantity}
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-teal-800 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="text" 
                    value={quantity}
                    readOnly
                    className="w-16 text-center py-2 border-x-2 border-teal-800 bg-white text-teal-900 font-semibold"
                  />
                  <button 
                    onClick={incrementQuantity}
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-teal-800 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
  
            <div className='flex justify-between mb-8'>
              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button className="bg-[#004D4A] text-xl hover:bg-teal-900 text-[#D0FF71] px-8 py-3 rounded-lg font-semibold transition">
                  Buy Now
                </button>
                <button className="bg-[#004D4A4D] text-xl hover:bg-teal-300 text-[#004D4A] px-8 py-3 rounded-lg font-semibold transition">
                  Add to Cart
                </button>
              </div>
              {/* Share Options */}
              <div className="items-center justify-between">
                <span className="text-teal-700 text-sm">Share this product</span>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full ${isFavorite ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-80 transition`}
                  >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
        </div>
        </div>
    );
  }