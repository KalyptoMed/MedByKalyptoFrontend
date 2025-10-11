'use client';

import React from 'react';
import { Breadcrumb } from '@/components/ProductDetails/NavigationBreadcrumb';
import { ProductDetail } from '@/components/ProductDetails/ProductDetail';
import { ProductDescription } from '@/components/ProductDetails/ProductDescription';
import { RelatedProducts } from '@/components/ProductDetails/RelatedProducts';
import DrugImage from "@/public/assets/images/Drug.png";



// Demo Implementation
export default function ProductPageDemo() {
  const productData = {
    name: "Doxycyline 100mg caps",
    brand: "Medicart",
    genericName: "Doxycycline Hyclate",
    price: 2000,
    originalPrice: 3500,
    discount: 43,
    rating: 4,
    image: DrugImage,
  };

  const relatedProductsData = [
    { name: "Doxycyline 100mg caps/10x", category: "DOXYCAP", price: 2000, image: DrugImage},
    { name: "Doxycyline 100mg caps/10x", category: "DOXYCAP", price: 2000, image: DrugImage },
    { name: "Doxycyline 100mg caps/10x", category: "DOXYCAP", price: 2000, image: DrugImage },
    { name: "Doxycyline 100mg caps/10x", category: "DOXYCAP", price: 2000, image: DrugImage },
    { name: "Doxycyline 100mg caps/10x", category: "DOXYCAP", price: 2000, image: DrugImage },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/products" },
    { label: "Antibiotics", href: "/products/antibiotics" },
    { label: "Doxycap", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-teal-800 p-6">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <ProductDetail product={productData} />
        <ProductDescription 
          description="Doxycycline is a broad-spectrum antibiotic of the tetracycline class used in the treatment of infections caused by bacteria and certain parasites. It is used to treat bacterial pneumonia, acne, chlamydia infections, Lyme disease, cholera, typhus, and syphilis. It is also used to prevent malaria."
          howToUse="Take tablets or capsules with a full glass of water. Drink plenty of liquids while you are taking this medicine."
        />
        <RelatedProducts products={relatedProductsData} />
      </div>
    </div>
  );
}