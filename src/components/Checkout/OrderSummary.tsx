import { Package } from "lucide-react";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

export interface OrderItem {
    id: string;
    name: string;
    description: string;
    quantity: number;
    price: number;
    image?: string | StaticImageData; 
  }

interface OrderSummaryProps {
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    discountCode?: string;
    onApplyDiscount?: (code: string) => void;
    onContinue?: () => void;
  }
  
  export function OrderSummary({ 
    items, 
    subtotal, 
    shipping, 
    discountCode = '',
    onApplyDiscount,
    onContinue 
  }: OrderSummaryProps) {
    const [discount, setDiscount] = useState(discountCode);
    const total = subtotal + shipping;
  
    return (
      <div className="bg-[#F8F9FD] rounded-2xl p-6 shadow-lg sticky top-6">
        {/* Order Items */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                {item.image ? (
                 <Image
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-contain rounded-lg"
                    sizes="80px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="text-gray-400" size={32} />
                  </div>
                )}
                {item.quantity > 1 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.quantity}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-teal-900 text-sm">{item.name}</h4>
                <p className="text-xs text-teal-700 mt-1">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-teal-900">₦{item.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Discount Code */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount code"
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none transition text-sm"
            />
            <button
              onClick={() => onApplyDiscount?.(discount)}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-teal-900 font-semibold rounded-lg transition text-sm"
            >
              Apply
            </button>
          </div>
        </div>
  
        {/* Price Breakdown */}
        <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
          <div className="flex justify-between text-teal-800">
            <span>Subtotal</span>
            <span className="font-medium">₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-teal-800">
            <div className="flex items-center gap-1">
              <span>Shipping</span>
              <span className="text-xs text-gray-500">ⓘ</span>
            </div>
            <span className="font-medium">₦{shipping.toLocaleString()}</span>
          </div>
        </div>
  
        {/* Total */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-teal-900">Total</span>
          <div className="text-right">
            <div className="text-xs text-gray-500">NGN</div>
            <div className="text-2xl font-bold text-teal-900">₦{total.toLocaleString()}</div>
          </div>
        </div>
  
        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-4 bg-teal-800 hover:bg-teal-900 text-white font-semibold rounded-lg transition"
        >
          Save and Continue
        </button>
      </div>
    );
  }