import Image from "next/image";
import { BsHeart, BsCart4 } from "react-icons/bs";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
    <div key={product.id} className=" bg-[#d3d3d6] h-[350px] rounded-t-3xl">
    <div className="h-[75%] relative">
      <Image src={product.image} alt={product.name} fill className="object-cover rounded-t-3xl"/>
    </div>
    <div className="py-2 text-left px-[6%] ">
      <h5 className="font-semibold">{product.name}</h5>
      <p className="card-text">{product.price}</p>
      <div className="flex justify-between items-center">
        <BsHeart size={18} />
        <div className="flex gap-2 border border-[#071443] rounded-md px-2 items-center text-sm hover:bg-[#0038ff] hover:text-white">
          <BsCart4 size={14} />
          Add
        </div>
      </div>
    </div>
  </div>
    );
};