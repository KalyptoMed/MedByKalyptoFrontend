import { ShoppingCart, Heart } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

type Product = {
  image: string | StaticImageData;
  name: string;
  category: string;
  price: number;
};

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-blue-200/50 to-blue-100/30 rounded-2xl p-4 hover:shadow-lg transition"
          >
           <div className="relative w-full h-48 mb-4">
              <Image 
                src={product.image || "/api/placeholder/200/250"} 
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-teal-700 uppercase mb-1">{product.category}</p>
              <h3 className="text-sm font-semibold text-teal-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-teal-900">
                  ₦{product.price.toLocaleString()}
                </span>
                <button className="p-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg transition">
                  <ShoppingCart size={16} />
                </button>
              </div>
              <button className="mt-2 p-1 text-gray-400 hover:text-red-500 transition">
                <Heart size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}