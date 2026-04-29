"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useProductById, usePublicProducts, apiProductToUiProduct } from "@/hooks/product.hooks";
import ProductDetailClient from "@/components/ProductDetails/ProductDetailClient";
import { useMemo } from "react";

export default function ProductPage() {
  const params = useParams();
  const id = params?.slug as string;

  const { data: product, isLoading, isError } = useProductById(id);
  const { data: allData } = usePublicProducts({ page: 1, limit: 50 });

  const uiProduct = useMemo(() => product ? apiProductToUiProduct(product) : null, [product]);

  const relatedProducts = useMemo(() => {
    if (!product || !allData?.items) return [];
    return allData.items
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 5)
      .map(apiProductToUiProduct);
  }, [product, allData]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FFFE] dark:bg-gray-950 pt-20 flex items-center justify-center">
        <span className="w-10 h-10 border-2 border-[#004D4A]/20 border-t-[#004D4A] rounded-full animate-spin" />
      </main>
    );
  }

  if (isError || !uiProduct) return notFound();

  return <ProductDetailClient product={uiProduct} relatedProducts={relatedProducts} />;
}
