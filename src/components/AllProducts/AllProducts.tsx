// src/components/AllProducts.tsx
'use client';

import React, { useState } from "react";
import ProductCard from "@/components/ProductListing/ProductCard";
import HeroBanner from "./HeroBanner";
import TrendingHeader from "./TrendingHeader";
import DrugImage from "./../../../public/assets/images/Drug.png";
import { StaticImageData } from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: StaticImageData | string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  products: Product[];
}

// ✅ All product categories with full data
export const allProductCategories: Category[] = [
  {
    id: "antibiotics",
    name: "ANTIBIOTICS",
    color: "#AABE43",
    products: [
      {
        id: "doxycap-100mg",
        name: "DOXYCAP",
        description: "Doxycline 100mg caps (10x10)",
        price: "N2,000",
        image: DrugImage,
      },
      {
        id: "amoxil-500mg",
        name: "AMOXIL",
        description: "Amoxicillin 500mg (5x20)",
        price: "N1,800",
        image: DrugImage,
      },
      {
        id: "ciprofloxacin-500mg",
        name: "CIPROFLOXACIN",
        description: "Ciprofloxacin 500mg tabs (10x10)",
        price: "N2,500",
        image: DrugImage,
      },
      {
        id: "azithromycin-500mg",
        name: "AZITHROMYCIN",
        description: "Azithromycin 500mg tabs (3x6)",
        price: "N3,200",
        image: DrugImage,
      },
      {
        id: "metronidazole-400mg",
        name: "METRONIDAZOLE",
        description: "Metronidazole 400mg tabs (10x10)",
        price: "N1,500",
        image: DrugImage,
      },
      {
        id: "cephalexin-500mg",
        name: "CEPHALEXIN",
        description: "Cephalexin 500mg caps (10x10)",
        price: "N2,800",
        image: DrugImage,
      },
      {
        id: "erythromycin-250mg",
        name: "ERYTHROMYCIN",
        description: "Erythromycin 250mg tabs (10x10)",
        price: "N1,900",
        image: DrugImage,
      },
    ],
  },
  {
    id: "anti-diarrhoeal",
    name: "ANTI-DIARRHOEAL",
    color: "#6180EF",
    products: [
      {
        id: "coloseal-caps",
        name: "COLOSEAL CAPS",
        description: "Loperamide 2mg caps (10x10)",
        price: "N2,000",
        image: DrugImage,
      },
      {
        id: "imodium",
        name: "IMODIUM",
        description: "Loperamide 2mg caps (6x6)",
        price: "N1,800",
        image: DrugImage,
      },
    ],
  },
  {
    id: "antacids",
    name: "ANTACIDS/ANTI-ULCER",
    color: "#6180EF",
    products: [
      {
        id: "omezole-20",
        name: "OMEZOLE 20",
        description: "Omeprazole 20mg caps (4x7)",
        price: "N2,000",
        image: DrugImage,
      },
      {
        id: "ranitidine-150mg",
        name: "RANITIDINE",
        description: "Ranitidine 150mg tabs (10x10)",
        price: "N1,500",
        image: DrugImage,
      },
    ],
  },
  {
    id: "anti-diabetics",
    name: "ANTI-DIABETICS",
    color: "#FF6B6B",
    products: [
      {
        id: "metformin-500mg",
        name: "METFORMIN",
        description: "Metformin 500mg tabs (10x10)",
        price: "N2,500",
        image: DrugImage,
      },
      {
        id: "glimepiride-2mg",
        name: "GLIMEPIRIDE",
        description: "Glimepiride 2mg tabs (10x10)",
        price: "N3,000",
        image: DrugImage,
      },
    ],
  },
  {
    id: "anti-malarial",
    name: "ANTI-MALARIAL",
    color: "#4ECDC4",
    products: [
      {
        id: "coartem",
        name: "COARTEM",
        description: "Artemether/Lumefantrine tabs",
        price: "N2,800",
        image: DrugImage,
      },
      {
        id: "lonart",
        name: "LONART",
        description: "Artemether/Lumefantrine tabs",
        price: "N2,600",
        image: DrugImage,
      },
    ],
  },
  {
    id: "vitamins",
    name: "VITAMINS/HEALTH SUPPLEMENTS",
    color: "#95E1D3",
    products: [
      {
        id: "vitamin-c-1000mg",
        name: "VITAMIN C",
        description: "Vitamin C 1000mg tabs (10x10)",
        price: "N3,500",
        image: DrugImage,
      },
      {
        id: "multivitamin",
        name: "MULTIVITAMIN",
        description: "Complete multivitamin caps",
        price: "N4,000",
        image: DrugImage,
      },
    ],
  },
];

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState<string>(allProductCategories[0].id);

  // Filter products based on selected category
  const displayCategories = allProductCategories.filter(cat => cat.id === selectedCategory);

  return (
    <div className="relative bg-[#0C5C5A] min-h-screen">
      {/* Hero Banner */}
      <HeroBanner className="my-8" />

      {/* Trending Section Header */}
      <TrendingHeader showSeeAll={false} />

      {/* Category Filter Pills */}
      <div className="mx-6 md:mx-12 mb-8 overflow-x-auto">
        <div className="flex gap-3 flex-nowrap md:flex-wrap pb-2">
          {allProductCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full font-semibold transition border-2 whitespace-nowrap uppercase ${
                selectedCategory === category.id
                  ? "bg-[#CFFC51] text-teal-900 border-[#CFFC51]"
                  : "bg-transparent text-[#D0FF71] border-[#D0FF71] hover:bg-[#D0FF71]/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-6 md:mx-12 mb-12">
        {displayCategories.map((category) => (
          <div key={category.id} className="mb-12">
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {category.products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  category={category.name}
                />
              ))}
            </div>
          </div>
        ))}

        {displayCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-white/70">No products found</p>
          </div>
        )}
      </div>

      {/* Footer Line */}
      <div className="w-full h-0.5 bg-white/20 my-12"></div>
    </div>
  );
}