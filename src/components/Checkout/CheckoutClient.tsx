"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight, Package, MapPin, CreditCard, CheckCircle,
  Truck, ShoppingBag, Tag, X,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { usePaystackPayment } from "react-paystack";
import { CartItem } from "@/types";

const deliverySchema = z.object({
  firstName: z.string().min(2, "First name required"),
  surname: z.string().min(2, "Surname required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(5, "Address required"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  postalCode: z.string().optional(),
  deliveryMethod: z.enum(["shipping", "pickup"]),
  saveDetails: z.boolean().optional(),
});

type DeliveryFormData = z.infer<typeof deliverySchema>;

const nigerianStates = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

export default function CheckoutClient() {
  const [step, setStep] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [formValues, setFormValues] = useState<DeliveryFormData | null>(null);

  const { items, totalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryMethod: "shipping",
      email: user?.email || "",
      firstName: user?.name?.split(" ")[0] || "",
      surname: user?.name?.split(" ")[1] || "",
    },
  });

  const deliveryMethod = watch("deliveryMethod");
  const shippingFee = deliveryMethod === "pickup" ? 0 : 1500;
  const subtotal = totalPrice();
  const total = subtotal + shippingFee - appliedDiscount;

  const paystackConfig = {
    reference: `MEDICART-${Date.now()}`,
    email: formValues?.email || user?.email || "customer@medicart.ng",
    amount: total * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_xxxxxxxxxxxx",
    currency: "NGN",
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onPaystackSuccess = () => {
    const id = `MC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setOrderId(id);
    clearCart();
    setStep(3);
  };

  const handleDeliverySubmit = (data: DeliveryFormData) => {
    setFormValues(data);
    setStep(2);
  };

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === "MEDICART10") setAppliedDiscount(Math.floor(subtotal * 0.1));
    else if (discountCode.toUpperCase() === "SAVE500") setAppliedDiscount(500);
    else alert("Invalid discount code");
  };

  if (items.length === 0 && step !== 3) {
    return (
      <main className="min-h-screen bg-[#F8FFFE] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-[#EBFFF5] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-[#004D4A]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#004D4A] mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products before checking out.</p>
          <Link href="/products/all" className="bg-[#004D4A] text-[#D0FF71] px-8 py-4 rounded-2xl font-bold hover:bg-[#006B67] transition">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FFFE] pt-20 page-wrapper">
      {/* Header */}
      <div className="bg-[#004D4A] py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white mb-6">Checkout</h1>
          <div className="flex items-center gap-2">
            {["Delivery", "Payment", "Confirmation"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition ${
                  step === i + 1 ? "bg-[#D0FF71] text-[#004D4A]"
                  : step > i + 1 ? "bg-white/20 text-[#D0FF71]"
                  : "glass text-white/50"
                }`}>
                  {step > i + 1 ? <CheckCircle size={14} /> : <span>{i + 1}</span>}
                  {s}
                </div>
                {i < 2 && <ChevronRight size={14} className="text-white/40" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        <AnimatePresence mode="wait">
          {/* STEP 1 — DELIVERY */}
          {step === 1 && (
            <motion.div key="delivery" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl p-8 shadow-card">
                    <h2 className="text-xl font-extrabold text-[#004D4A] mb-6 flex items-center gap-2">
                      <MapPin size={20} /> Delivery Details
                    </h2>
                    <form onSubmit={handleSubmit(handleDeliverySubmit)} className="space-y-4">
                      {/* Delivery Method */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          { value: "shipping" as const, label: "Home Delivery", icon: Truck, desc: "₦1,500" },
                          { value: "pickup" as const, label: "Store Pickup", icon: Package, desc: "Free" },
                        ].map(({ value, label, icon: Icon, desc }) => (
                          <label key={value} className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${deliveryMethod === value ? "border-[#004D4A] bg-[#EBFFF5]" : "border-gray-200 hover:border-gray-300"}`}>
                            <input type="radio" value={value} {...register("deliveryMethod")} className="sr-only" />
                            <Icon size={20} className={deliveryMethod === value ? "text-[#004D4A]" : "text-gray-400"} />
                            <div>
                              <p className="font-bold text-sm text-[#004D4A]">{label}</p>
                              <p className="text-xs text-gray-400">{desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-[#004D4A] block mb-1">First Name *</label>
                          <input {...register("firstName")} placeholder="First name" className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:border-[#004D4A] focus:outline-none transition ${errors.firstName ? "border-red-300" : "border-gray-200"}`} />
                          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-[#004D4A] block mb-1">Surname *</label>
                          <input {...register("surname")} placeholder="Surname" className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:border-[#004D4A] focus:outline-none transition ${errors.surname ? "border-red-300" : "border-gray-200"}`} />
                          {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-[#004D4A] block mb-1">Email *</label>
                          <input {...register("email")} type="email" placeholder="Email" className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:border-[#004D4A] focus:outline-none transition ${errors.email ? "border-red-300" : "border-gray-200"}`} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-[#004D4A] block mb-1">Phone *</label>
                          <input {...register("phone")} type="tel" placeholder="080XXXXXXXX" className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:border-[#004D4A] focus:outline-none transition ${errors.phone ? "border-red-300" : "border-gray-200"}`} />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#004D4A] block mb-1">Address *</label>
                        <input {...register("address")} placeholder="Street address" className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:border-[#004D4A] focus:outline-none transition ${errors.address ? "border-red-300" : "border-gray-200"}`} />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-[#004D4A] block mb-1">Apartment / Suite (Optional)</label>
                        <input {...register("apartment")} placeholder="Apartment, suite, unit etc." className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#004D4A] focus:outline-none transition" />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-[#004D4A] block mb-1">City *</label>
                          <input {...register("city")} placeholder="City" className={`w-full px-4 py-3 rounded-xl border-2 text-sm focus:border-[#004D4A] focus:outline-none transition ${errors.city ? "border-red-300" : "border-gray-200"}`} />
                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-[#004D4A] block mb-1">State *</label>
                          <select {...register("state")} className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-white focus:border-[#004D4A] focus:outline-none transition ${errors.state ? "border-red-300" : "border-gray-200"}`}>
                            <option value="">Select state</option>
                            {nigerianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-[#004D4A] block mb-1">Postal Code</label>
                          <input {...register("postalCode")} placeholder="Postal code" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:border-[#004D4A] focus:outline-none transition" />
                        </div>
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer pt-2">
                        <input type="checkbox" {...register("saveDetails")} className="w-4 h-4 accent-[#004D4A]" />
                        <span className="text-sm font-medium text-gray-600">Save delivery details for future orders</span>
                      </label>

                      <button type="submit" className="w-full bg-[#004D4A] text-[#D0FF71] py-4 rounded-2xl font-bold text-lg hover:bg-[#006B67] transition shadow-brand flex items-center justify-center gap-2 mt-4">
                        Continue to Payment <ChevronRight size={20} />
                      </button>
                    </form>
                  </div>
                </div>
                <OrderSummary
                  items={items} subtotal={subtotal} shippingFee={shippingFee}
                  discount={appliedDiscount} total={total} discountCode={discountCode}
                  setDiscountCode={setDiscountCode} applyDiscount={applyDiscount}
                  appliedDiscount={appliedDiscount} setAppliedDiscount={setAppliedDiscount}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2 — PAYMENT */}
          {step === 2 && (
            <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl p-8 shadow-card">
                    <h2 className="text-xl font-extrabold text-[#004D4A] mb-6 flex items-center gap-2">
                      <CreditCard size={20} /> Payment Method
                    </h2>
                    <div className="flex items-center gap-4 p-5 border-2 border-[#004D4A] rounded-2xl bg-[#EBFFF5] mb-8">
                      <div className="w-12 h-8 bg-[#004D4A] rounded-lg flex items-center justify-center">
                        <span className="text-[#D0FF71] text-xs font-bold">PAY</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#004D4A]">Paystack</p>
                        <p className="text-gray-500 text-xs">Pay via card, bank transfer, or USSD</p>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-[#004D4A] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#D0FF71]" />
                      </div>
                    </div>

                    {formValues && (
                      <div className="bg-[#F8FFFE] rounded-2xl p-5 mb-6">
                        <p className="font-bold text-[#004D4A] mb-2">Delivering to:</p>
                        <p className="text-gray-700 font-medium">{formValues.firstName} {formValues.surname}</p>
                        <p className="text-gray-500 text-sm">{formValues.address}{formValues.apartment ? `, ${formValues.apartment}` : ""}</p>
                        <p className="text-gray-500 text-sm">{formValues.city}, {formValues.state} · {formValues.phone}</p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:border-[#004D4A] hover:text-[#004D4A] transition">
                        Back
                      </button>
                      <button
                        onClick={() => initializePayment({ onSuccess: onPaystackSuccess, onClose: () => {} })}
                        className="flex-1 bg-[#004D4A] text-[#D0FF71] py-4 rounded-2xl font-bold hover:bg-[#006B67] transition shadow-brand"
                      >
                        Pay ₦{total.toLocaleString()}
                      </button>
                    </div>
                  </div>
                </div>
                <OrderSummary
                  items={items} subtotal={subtotal} shippingFee={shippingFee}
                  discount={appliedDiscount} total={total} discountCode={discountCode}
                  setDiscountCode={setDiscountCode} applyDiscount={applyDiscount}
                  appliedDiscount={appliedDiscount} setAppliedDiscount={setAppliedDiscount}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3 — CONFIRMATION */}
          {step === 3 && (
            <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-16 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-24 h-24 rounded-full bg-[#EBFFF5] flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-[#004D4A]" />
              </motion.div>
              <h2 className="text-4xl font-extrabold text-[#004D4A] mb-2">Order Confirmed!</h2>
              <p className="text-gray-500 text-lg mb-2">Thank you for your order.</p>
              <p className="text-[#004D4A] font-bold text-xl mb-8">Order ID: {orderId}</p>
              <p className="text-gray-500 max-w-md mb-10">Your order is being processed. You&apos;ll receive an email confirmation shortly.</p>
              <div className="flex gap-4">
                <Link href="/dashboard/user" className="bg-[#004D4A] text-[#D0FF71] px-8 py-4 rounded-2xl font-bold hover:bg-[#006B67] transition">Track Order</Link>
                <Link href="/products/all" className="border-2 border-[#004D4A] text-[#004D4A] px-8 py-4 rounded-2xl font-bold hover:bg-[#EBFFF5] transition">Continue Shopping</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function OrderSummary({ items, subtotal, shippingFee, discount, total, discountCode, setDiscountCode, applyDiscount, appliedDiscount, setAppliedDiscount }: {
  items: CartItem[];
  subtotal: number; shippingFee: number; discount: number; total: number;
  discountCode: string; setDiscountCode: (v: string) => void; applyDiscount: () => void;
  appliedDiscount: number; setAppliedDiscount: (v: number) => void;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-card h-fit sticky top-24">
      <h3 className="font-extrabold text-[#004D4A] text-lg mb-5">Order Summary</h3>
      <div className="space-y-3 mb-5 max-h-60 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#EBFFF5] flex-shrink-0 overflow-hidden">
              <Image src={item.product.image as string} alt={item.product.name} width={48} height={48} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#004D4A] text-sm truncate">{item.product.name}</p>
              <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
            </div>
            <p className="text-[#004D4A] font-bold text-sm flex-shrink-0">₦{(item.product.price * item.quantity).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="mb-5">
        {appliedDiscount > 0 ? (
          <div className="flex items-center justify-between bg-[#EBFFF5] rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Tag size={14} className="text-[#004D4A]" />
              <span className="text-[#004D4A] font-semibold text-sm">{discountCode.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold text-sm">-₦{appliedDiscount.toLocaleString()}</span>
              <button onClick={() => setAppliedDiscount(0)} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <input value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="Discount code" className="flex-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm focus:border-[#004D4A] focus:outline-none" />
            <button onClick={applyDiscount} className="px-4 py-2.5 bg-[#004D4A] text-[#D0FF71] rounded-xl text-sm font-bold hover:bg-[#006B67] transition">Apply</button>
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-4">
        <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span className="font-semibold">₦{subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>Shipping</span><span className="font-semibold">{shippingFee === 0 ? "Free" : `₦${shippingFee.toLocaleString()}`}</span></div>
        {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span className="font-semibold">-₦{discount.toLocaleString()}</span></div>}
        <div className="flex justify-between text-lg font-extrabold text-[#004D4A] pt-2 border-t border-gray-100">
          <span>Total</span><span>₦{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
