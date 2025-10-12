'use client'

import { DeliveryForm, DeliveryFormData } from "@/components/Checkout/CheckoutForm";
import { OrderItem, OrderSummary } from "@/components/Checkout/OrderSummary";
import DrugImage from "./../../../public/assets/images/Drug.png";

export default function CheckoutPage() {
  const handleFormSubmit = (data: DeliveryFormData) => {
    console.log('Form submitted:', data);
  };

  const handleApplyDiscount = (code: string) => {
    console.log('Applying discount:', code);
    alert(`Discount code "${code}" applied!`);
  };

  const handleContinue = () => {
    alert('Proceeding to payment...');
  };

  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'DOXYCAP',
      description: 'Doxycyline 100mg caps (10x 10)',
      quantity: 1,
      price: 2000,
      image: DrugImage
    }
  ];

  return (
    <div className="h-screen-full bg-[#004D4A] pt-4 max-w-7xl mx-auto p-12 mt-52">
      <div className="bg-white  p-12">
      <h2 className="text-2xl font-bold text-teal-900 mb-6">
        1. Delivery
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                  {/* Left Column - Form */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                      <DeliveryForm onSubmit={handleFormSubmit} />
                    </div>
                  </div>
        
                  {/* Right Column - Order Summary */}
                  <div className="lg:col-span-1">
                    <OrderSummary
                      items={orderItems}
                      subtotal={2000}
                      shipping={3000}
                      onApplyDiscount={handleApplyDiscount}
                      onContinue={handleContinue}
                    />
                  </div>
                </div>
      </div>  

    </div>
  );
}