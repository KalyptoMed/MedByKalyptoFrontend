'use client';

import React from 'react';
import { Breadcrumb } from '@/components/ProductDetails/NavigationBreadcrumb';
import { ProductDetail } from '@/components/ProductDetails/ProductDetail';
import { ProductDescription } from '@/components/ProductDetails/ProductDescription';
import { RelatedProducts } from '@/components/ProductDetails/RelatedProducts';
import DrugImage from "./../../../public/assets/images/Drug.png";

// This would typically come from a database or API
function getProductBySlug(slug: string) {
  console.log(slug)
  // Mock data - replace with actual data fetching
  return {
    name: "Doxycyline 100mg caps",
    brand: "Medicart",
    genericName: "Doxycycline Hyclate",
    price: 2000,
    originalPrice: 3500,
    discount: 43,
    rating: 4,
    image: DrugImage,
    description: "Doxycycline is a broad-spectrum antibiotic of the tetracycline class used in the treatment of infections caused by bacteria and certain parasites. It is used to treat bacterial pneumonia, acne, chlamydia infections, Lyme disease, cholera, typhus, and syphilis. It is also used to prevent malaria.",
    howToUse: "Take tablets or capsules with a full glass of water. Drink plenty of liquids while you are taking this medicine.",
  };
}

const relatedProductsData = [
  { 
    id: "doxycap-100mg-1",
    name: "DOXYCAP",
    description: "Doxycyline 100mg caps/10x", 
    category: "ANTIBIOTICS", 
    price: "N2,000", 
    image: DrugImage 
  },
  { 
    id: "doxycap-100mg-2",
    name: "DOXYCAP",
    description: "Doxycyline 100mg caps/10x", 
    category: "ANTIBIOTICS", 
    price: "N2,000", 
    image: DrugImage 
  },
  { 
    id: "doxycap-100mg-3",
    name: "DOXYCAP",
    description: "Doxycyline 100mg caps/10x", 
    category: "ANTIBIOTICS", 
    price: "N2,000", 
    image: DrugImage 
  },
  { 
    id: "doxycap-100mg-4",
    name: "DOXYCAP",
    description: "Doxycyline 100mg caps/10x", 
    category: "ANTIBIOTICS", 
    price: "N2,000", 
    image: DrugImage 
  },
  { 
    id: "doxycap-100mg-5",
    name: "DOXYCAP",
    description: "Doxycyline 100mg caps/10x", 
    category: "ANTIBIOTICS", 
    price: "N2,000", 
    image: DrugImage 
  },
];


// Demo Implementation
export default function ProductDetailsPage({ 
  params 
}: { 
  params: { slug: string } 
  }) {
    const product = getProductBySlug(params.slug);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/products/all" },
    { label: "Antibiotics", href: "/products/all" },
    { label: "Doxycap", href: "/products/all" },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <ProductDetail product={product} />
        <ProductDescription 
          description={product.description}
          howToUse={product.howToUse}
        />
        <RelatedProducts products={relatedProductsData} />
      </div>
    </div>
  );
}