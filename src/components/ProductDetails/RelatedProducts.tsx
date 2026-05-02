// src/components/ProductDetail/RelatedProducts.tsx
import React from 'react';
import ProductCard from '@/components/ProductListing/ProductCard';
import { ShoppingBag } from 'lucide-react';
import { StaticImageData } from 'next/image';

type Product = {
  id: string;
  image: string | StaticImageData;
  name: string;
  description: string;
  category: string;
  price: string;
};

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return (
      <div className="mb-12 w-full mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">You may also like</h2>
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
            <ShoppingBag size={28} className="text-[#D0FF71]" />
          </div>
          <p className="text-white font-bold text-lg">No related products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 w-full mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}