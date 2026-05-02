"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronRight, Package, MapPin, CreditCard, CheckCircle,
  Truck, ShoppingBag, Tag, X, Edit2, Plus,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { usePaystackPayment } from "react-paystack";
import { CartItem } from "@/types";
import { useCreateOrder, useUploadEvidence } from "@/hooks/order.hooks";
import { useAddresses, useAddAddress } from "@/hooks/user.hooks";
import { useVendorById } from "@/hooks/vendor.hooks";
import { Upload, Clock, AlertTriangle, Building2 } from "lucide-react";

const deliverySchema = z
  .object({
    firstName: z.string().min(2, "First name required"),
    surname: z.string().min(2, "Surname required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone number required"),
    address: z.string().optional(),
    apartment: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    deliveryMethod: z.enum(["shipping", "pickup"]),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === "shipping") {
      if (!data.address || data.address.trim().length < 5)
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["address"], message: "Address required" });
      if (!data.city || data.city.trim().length < 2)
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["city"], message: "City required" });
      if (!data.state || data.state.trim().length < 2)
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["state"], message: "State required" });
    }
  });

type DeliveryFormData = z.infer<typeof deliverySchema>;

const nigerianStates = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

export default function CheckoutClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [orderId, setOrderId] = useState("");
  const [formValues, setFormValues] = useState<DeliveryFormData | null>(null);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<"paystack" | "bank_transfer">("paystack");
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [evidencePreview, setEvidencePreview] = useState<string | null>(null);
  const [evidenceUploaded, setEvidenceUploaded] = useState(false);

  const { items, totalPrice, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: createOrder } = useCreateOrder();
  const { mutate: uploadEvidence, isPending: uploadingEvidence } = useUploadEvidence();
  const { data: addresses } = useAddresses();
  const { mutate: addAddress } = useAddAddress();

  const vendorId = (items[0]?.product as any)?.vendorId as string | undefined;
  const { data: vendor } = useVendorById(vendorId);
  const vendorBankAccount = vendor?.bankAccount?.accountNumber ? vendor.bankAccount : null;

  useEffect(() => setMounted(true), []);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/auth/login?redirect=/checkout");
    }
  }, [mounted, isAuthenticated, router]);

  const savedAddress = addresses ? (addresses.find((a) => a.isDefault) ?? addresses[0] ?? null) : null;
  const hasSavedAddress = !!savedAddress && !addingNewAddress;

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryMethod: "shipping",
      email: user?.email || "",
      firstName: user?.firstName || "",
      surname: user?.lastName || "",
    },
  });

  const deliveryMethod = watch("deliveryMethod");

  // Pre-fill hidden address fields when using saved address
  useEffect(() => {
    if (deliveryMethod === "shipping" && hasSavedAddress && savedAddress) {
      setValue("address", savedAddress.street);
      setValue("city", savedAddress.city);
      setValue("state", savedAddress.state);
    }
  }, [hasSavedAddress, savedAddress, deliveryMethod, setValue]);

  // When switching back to shipping, reset to showing saved address
  useEffect(() => {
    if (deliveryMethod === "shipping") setAddingNewAddress(false);
  }, [deliveryMethod]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const buildOrderPayload = (ref?: string) => ({
    items: items.map((item) => ({
      productId: item.product.id,
      vendorId: (item.product as any).vendorId,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image as string,
    })),
    shippingAddress: {
      street: formValues?.address ?? "",
      city: formValues?.city ?? "",
      state: formValues?.state ?? "",
      country: "Nigeria",
      postalCode: formValues?.postalCode ?? "",
    },
    deliveryNotes: formValues?.apartment ?? "",
    ...(ref ? { paymentReference: ref } : {}),
  });

  const handleBankTransferOrder = () => {
    createOrder(
      { ...buildOrderPayload(), paymentMethod: "bank_transfer" },
      {
        onSuccess: (order) => { setOrderId(order._id); clearCart(); setStep(3); },
        onError: () => { setStep(3); },
      }
    );
  };

  const handleEvidenceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setEvidenceFile(file);
    if (file) setEvidencePreview(URL.createObjectURL(file));
  };

  const handleEvidenceSubmit = () => {
    if (!evidenceFile || !orderId) return;
    uploadEvidence(
      { orderId, file: evidenceFile },
      { onSuccess: () => setEvidenceUploaded(true) }
    );
  };

  const onPaystackSuccess = (response: any) => {
    const ref = response?.reference ?? paystackConfig.reference;
    createOrder(
      { ...buildOrderPayload(ref), paymentMethod: "paystack" },
      {
        onSuccess: (order) => { setOrderId(order._id); clearCart(); setStep(3); },
        onError: () => { setOrderId(ref); clearCart(); setStep(3); },
      }
    );
  };

  const handleDeliverySubmit = (data: DeliveryFormData) => {
    // Auto-save new address when home delivery
    if (data.deliveryMethod === "shipping" && addingNewAddress && data.address && data.city && data.state) {
      addAddress({
        label: "Home",
        street: data.address,
        city: data.city,
        state: data.state,
        isDefault: !savedAddress,
      });
    }
    setFormValues(data);
    setStep(2);
  };

  const applyDiscount = () => {
    alert("No valid discount code. Promo codes will be available soon.");
  };

  // Show address form when: shipping + (no saved address OR user clicked "add new")
  const showAddressForm = deliveryMethod === "shipping" && (!savedAddress || addingNewAddress);

  // Don't render until mounted (avoids SSR/hydration flash, respects auth redirect)
  if (!mounted) return null;
  if (!isAuthenticated) return null;

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

                      {/* Name & Contact */}
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

                      {/* Saved address card */}
                      {deliveryMethod === "shipping" && savedAddress && !addingNewAddress && (
                        <div className="flex items-center justify-between p-4 bg-[#EBFFF5] border-2 border-[#004D4A] rounded-2xl">
                          <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-[#004D4A] mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-[10px] font-bold text-[#004D4A] uppercase tracking-widest mb-0.5">Saved Address</p>
                              <p className="text-sm font-semibold text-gray-800">{savedAddress.street}</p>
                              <p className="text-xs text-gray-500">{savedAddress.city}, {savedAddress.state}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAddingNewAddress(true)}
                            className="flex items-center gap-1 text-xs font-bold text-[#004D4A] border border-[#004D4A] px-3 py-1.5 rounded-lg hover:bg-white transition flex-shrink-0"
                          >
                            <Edit2 size={12} /> Change
                          </button>
                        </div>
                      )}

                      {/* Address form (always rendered for RHF; hidden when using saved address) */}
                      <div className={showAddressForm ? "space-y-4" : "hidden"}>
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

                        <p className="text-xs text-gray-400 flex items-center gap-1 pt-1">
                          <MapPin size={11} /> This address will be saved to your account automatically.
                        </p>

                        {savedAddress && (
                          <button
                            type="button"
                            onClick={() => setAddingNewAddress(false)}
                            className="text-sm text-[#004D4A] font-semibold hover:underline"
                          >
                            ← Use saved address
                          </button>
                        )}
                      </div>

                      {/* Add new address button (only when saved address exists and not already adding) */}
                      {deliveryMethod === "shipping" && savedAddress && !addingNewAddress && (
                        <button
                          type="button"
                          onClick={() => setAddingNewAddress(true)}
                          className="flex items-center gap-2 text-sm font-semibold text-[#004D4A] hover:underline"
                        >
                          <Plus size={14} /> Add a new address
                        </button>
                      )}

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
                <div className="lg:col-span-2 space-y-5">
                  <div className="bg-white rounded-3xl p-8 shadow-card">
                    <h2 className="text-xl font-extrabold text-[#004D4A] mb-6 flex items-center gap-2">
                      <CreditCard size={20} /> Choose Payment Method
                    </h2>

                    {/* Payment options */}
                    <div className="space-y-3 mb-6">
                      {/* Paystack */}
                      <label
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                          selectedPayment === "paystack" ? "border-[#004D4A] bg-[#EBFFF5]" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input type="radio" className="sr-only" checked={selectedPayment === "paystack"} onChange={() => setSelectedPayment("paystack")} />
                        <div className="w-12 h-8 bg-[#004D4A] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-[#D0FF71] text-[10px] font-extrabold">PAY</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-[#004D4A]">Pay with Paystack</p>
                          <p className="text-gray-400 text-xs mt-0.5">Card, bank transfer, USSD — instant confirmation</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedPayment === "paystack" ? "border-[#004D4A]" : "border-gray-300"}`}>
                          {selectedPayment === "paystack" && <div className="w-2.5 h-2.5 rounded-full bg-[#004D4A]" />}
                        </div>
                      </label>

                      {/* Bank Transfer — only shown when vendor has bank account set up */}
                      {vendorBankAccount && (
                        <label
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                            selectedPayment === "bank_transfer" ? "border-[#004D4A] bg-[#EBFFF5]" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input type="radio" className="sr-only" checked={selectedPayment === "bank_transfer"} onChange={() => setSelectedPayment("bank_transfer")} />
                          <div className="w-12 h-8 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 size={18} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-[#004D4A]">Pay to Vendor Account</p>
                            <p className="text-gray-400 text-xs mt-0.5">Direct bank transfer — requires evidence upload</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedPayment === "bank_transfer" ? "border-[#004D4A]" : "border-gray-300"}`}>
                            {selectedPayment === "bank_transfer" && <div className="w-2.5 h-2.5 rounded-full bg-[#004D4A]" />}
                          </div>
                        </label>
                      )}
                    </div>

                    {/* Bank transfer details */}
                    {selectedPayment === "bank_transfer" && vendorBankAccount && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                          <Clock size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                          <p className="text-amber-700 text-sm font-medium">
                            Bank transfers may take <strong>24–48 hours</strong> to be confirmed. Your order will be on hold until the vendor verifies your payment.
                          </p>
                        </div>
                        <div className="bg-[#F8FFFE] rounded-2xl p-5 border border-[#004D4A]/10">
                          <p className="text-xs font-bold text-[#004D4A] uppercase tracking-widest mb-3">Vendor Bank Details</p>
                          <div className="space-y-2">
                            {[
                              { label: "Bank", value: vendorBankAccount.bankName },
                              { label: "Account Name", value: vendorBankAccount.accountName },
                              { label: "Account Number", value: vendorBankAccount.accountNumber },
                              { label: "Amount", value: `₦${total.toLocaleString()}` },
                            ].map(({ label, value }) => (
                              <div key={label} className="flex justify-between text-sm">
                                <span className="text-gray-500">{label}</span>
                                <span className="font-bold text-[#004D4A] font-mono">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                          <AlertTriangle size={13} className="flex-shrink-0 mt-0.5 text-amber-500" />
                          Use your name as the transfer narration. After transferring, upload your receipt on the next screen.
                        </div>
                      </motion.div>
                    )}

                    {/* Delivery summary */}
                    {formValues && (
                      <div className="bg-[#F8FFFE] rounded-2xl p-4 mt-5">
                        <p className="font-bold text-[#004D4A] mb-1.5 text-sm">Delivering to:</p>
                        <p className="text-gray-700 font-medium text-sm">{formValues.firstName} {formValues.surname}</p>
                        {formValues.deliveryMethod === "shipping" ? (
                          <p className="text-gray-400 text-xs mt-0.5">{formValues.address}, {formValues.city}, {formValues.state} · {formValues.phone}</p>
                        ) : (
                          <p className="text-gray-400 text-xs mt-0.5">Store Pickup · {formValues.phone}</p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setStep(1)} className="flex-1 py-4 border-2 border-gray-200 rounded-2xl font-bold text-gray-600 hover:border-[#004D4A] hover:text-[#004D4A] transition">
                        Back
                      </button>
                      {selectedPayment === "bank_transfer" && vendorBankAccount ? (
                        <button
                          onClick={handleBankTransferOrder}
                          className="flex-1 bg-[#004D4A] text-[#D0FF71] py-4 rounded-2xl font-bold hover:bg-[#006B67] transition shadow-brand flex items-center justify-center gap-2"
                        >
                          I have made this transfer <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => initializePayment({ onSuccess: onPaystackSuccess, onClose: () => {} })}
                          className="flex-1 bg-[#004D4A] text-[#D0FF71] py-4 rounded-2xl font-bold hover:bg-[#006B67] transition shadow-brand"
                        >
                          Pay ₦{total.toLocaleString()}
                        </button>
                      )}
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

          {/* STEP 3a — BANK TRANSFER: Upload Evidence */}
          {step === 3 && selectedPayment === "bank_transfer" && !evidenceUploaded && (
            <motion.div key="evidence-upload" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-16 max-w-md mx-auto w-full">
              <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                <Upload size={36} className="text-amber-500" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#004D4A] mb-2 text-center">Upload Payment Receipt</h2>
              <p className="text-gray-500 text-center mb-1 text-sm">Order placed · <span className="font-bold text-[#004D4A]">{orderId}</span></p>
              <p className="text-gray-400 text-sm text-center mb-8">Upload a screenshot or photo of your transfer receipt so the vendor can confirm your payment.</p>

              <div className="w-full space-y-4">
                {evidencePreview ? (
                  <div className="relative">
                    <img src={evidencePreview} alt="Receipt preview" className="w-full rounded-2xl object-contain max-h-64 border-2 border-[#004D4A]/20" />
                    <button
                      onClick={() => { setEvidenceFile(null); setEvidencePreview(null); }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition"
                    >
                      <X size={14} className="text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-[#004D4A]/30 rounded-2xl cursor-pointer hover:border-[#004D4A] hover:bg-[#EBFFF5]/50 transition">
                    <Upload size={28} className="text-[#004D4A]/40 mb-2" />
                    <p className="text-sm font-semibold text-[#004D4A]/60">Click to upload receipt</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                    <input type="file" accept="image/*" onChange={handleEvidenceFileChange} className="hidden" />
                  </label>
                )}

                <button
                  onClick={handleEvidenceSubmit}
                  disabled={!evidenceFile || uploadingEvidence}
                  className="w-full bg-[#004D4A] text-[#D0FF71] py-4 rounded-2xl font-bold hover:bg-[#006B67] transition shadow-brand disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploadingEvidence ? (
                    <><div className="w-5 h-5 border-2 border-[#D0FF71] border-t-transparent rounded-full animate-spin" /> Uploading...</>
                  ) : (
                    <><Upload size={18} /> Submit Receipt</>
                  )}
                </button>

                <Link href="/dashboard/user/orders" className="block text-center text-sm text-[#004D4A] font-semibold hover:underline">
                  Skip for now — submit later from your orders page
                </Link>
              </div>
            </motion.div>
          )}

          {/* STEP 3b — BANK TRANSFER: Awaiting Confirmation */}
          {step === 3 && selectedPayment === "bank_transfer" && evidenceUploaded && (
            <motion.div key="awaiting-confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-16 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center mb-6">
                <Clock size={48} className="text-amber-500" />
              </motion.div>
              <h2 className="text-3xl font-extrabold text-[#004D4A] mb-2">Awaiting Confirmation</h2>
              <p className="text-gray-500 text-lg mb-2">Your receipt has been submitted.</p>
              <p className="text-[#004D4A] font-bold text-xl mb-5">Order ID: {orderId}</p>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 max-w-sm mb-8">
                <p className="text-amber-700 text-sm">The vendor will review your payment within <strong>24–48 hours</strong>. You&apos;ll be notified once it&apos;s confirmed.</p>
              </div>
              <div className="flex gap-4">
                <Link href="/dashboard/user/orders" className="bg-[#004D4A] text-[#D0FF71] px-8 py-4 rounded-2xl font-bold hover:bg-[#006B67] transition">Track Order</Link>
                <Link href="/products/all" className="border-2 border-[#004D4A] text-[#004D4A] px-8 py-4 rounded-2xl font-bold hover:bg-[#EBFFF5] transition">Continue Shopping</Link>
              </div>
            </motion.div>
          )}

          {/* STEP 3c — PAYSTACK: Order Confirmed */}
          {step === 3 && selectedPayment === "paystack" && (
            <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-16 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-24 h-24 rounded-full bg-[#EBFFF5] flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-[#004D4A]" />
              </motion.div>
              <h2 className="text-4xl font-extrabold text-[#004D4A] mb-2">Order Confirmed!</h2>
              <p className="text-gray-500 text-lg mb-2">Thank you for your order.</p>
              <p className="text-[#004D4A] font-bold text-xl mb-8">Order ID: {orderId}</p>
              <p className="text-gray-500 max-w-md mb-10">Your order is being processed. You&apos;ll receive an email confirmation shortly.</p>
              <div className="flex gap-4">
                <Link href="/dashboard/user/orders" className="bg-[#004D4A] text-[#D0FF71] px-8 py-4 rounded-2xl font-bold hover:bg-[#006B67] transition">Track Order</Link>
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
