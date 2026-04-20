import { notFound } from "next/navigation";
import { getProductBySlug, allProducts } from "@/lib/products";
import ProductDetailClient from "@/components/ProductDetails/ProductDetailClient";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.id }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
