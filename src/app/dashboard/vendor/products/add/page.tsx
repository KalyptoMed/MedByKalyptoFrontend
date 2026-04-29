"use client";

import { motion } from "framer-motion";
import { Upload, CheckCircle, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "@/hooks/product.hooks";
import { useVendorProfile } from "@/hooks/vendor.hooks";

const categories = ["Antibiotics", "Anti-Malarial", "Anti-Diabetics", "Antacids", "Anti-Diarrhoeal", "Vitamins", "Pain Relief", "Other"];

interface FormValues {
  name: string;
  nafdacNumber: string;
  manufacturer: string;
  dosage: string;
  sku: string;
  price: number;
  comparePrice: number;
  stock: number;
  description: string;
  category: string;
  status: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const { data: vendorProfile, isLoading: profileLoading } = useVendorProfile();
  const { mutate: createProduct, isPending, isSuccess } = useCreateProduct();

  if (profileLoading) {
    return <div className="flex items-center justify-center h-64"><span className="w-8 h-8 border-2 border-[#004D4A]/20 border-t-[#004D4A] rounded-full animate-spin" /></div>;
  }

  if (vendorProfile?.status !== "approved") {
    return (
      <div className="max-w-md mx-auto mt-16 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
          <ShieldAlert size={28} className="text-amber-500" />
        </div>
        <h2 className="font-extrabold text-xl text-[#004D4A] dark:text-white">Approval Required</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {vendorProfile?.status === "suspended"
            ? "Your account has been suspended. Contact support to resolve this before listing products."
            : "Your vendor account is pending approval. Once an admin reviews and approves your store, you will be able to list products."}
        </p>
        <button onClick={() => router.push("/dashboard/vendor")}
          className="mt-2 px-6 py-2.5 bg-[#004D4A] text-[#D0FF71] rounded-xl font-bold text-sm hover:bg-[#006B67] transition">
          Back to Dashboard
        </button>
      </div>
    );
  }
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { status: "draft" },
  });

  const onSubmit = (data: FormValues) => {
    createProduct(
      { ...data, price: Number(data.price), comparePrice: data.comparePrice ? Number(data.comparePrice) : undefined, stock: Number(data.stock) },
      { onSuccess: () => setTimeout(() => router.push("/dashboard/vendor/products"), 1200) }
    );
  };

  const fieldClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A] dark:text-white";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-extrabold text-[#004D4A] dark:text-white mb-5">Product Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Product Name <span className="text-red-500">*</span></label>
            <input {...register("name", { required: true })} placeholder="e.g. Amoxicillin 500mg" className={fieldClass} />
          </div>
          {([
            { label: "NAFDAC Number", key: "nafdacNumber", placeholder: "e.g. A1-0000" },
            { label: "Manufacturer", key: "manufacturer", placeholder: "e.g. GSK Nigeria" },
          ] as const).map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">{label}</label>
              <input {...register(key)} placeholder={placeholder} className={fieldClass} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Dosage / Strength</label>
            <input {...register("dosage")} placeholder="e.g. 500mg, 10ml" className={fieldClass} />
          </div>
          {[
            { label: "SKU", key: "sku" as const, placeholder: "e.g. AMX-500-001", type: "text", required: false },
            { label: "Price (₦)", key: "price" as const, placeholder: "0", type: "number", required: true },
            { label: "Compare Price (₦)", key: "comparePrice" as const, placeholder: "0 (optional)", type: "number", required: false },
            { label: "Stock Quantity", key: "stock" as const, placeholder: "0", type: "number", required: true },
          ].map(({ label, key, placeholder, type, required }) => (
            <div key={key}>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
              <input {...register(key, { required })} type={type} placeholder={placeholder} className={fieldClass} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Description</label>
            <textarea {...register("description")} rows={3} placeholder="Describe the product..." className={fieldClass + " resize-none"} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Category</label>
            <select {...register("category")} className={fieldClass}>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Status</label>
            <select {...register("status")} className={fieldClass}>
              <option value="draft">Draft</option>
              <option value="active">Active (visible to buyers)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-extrabold text-[#004D4A] dark:text-white mb-4">Product Images</h3>
        <motion.div whileTap={{ scale: 0.98 }}
          className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#004D4A] transition text-center">
          <Upload size={28} className="text-gray-400" />
          <p className="font-semibold text-gray-500 text-sm">Tap to upload images</p>
          <p className="text-gray-400 text-xs">PNG, JPG up to 5MB each. Max 5 images.</p>
        </motion.div>
      </div>

      <div className="flex gap-3">
        <motion.button whileTap={{ scale: 0.97 }} type="button" onClick={() => router.push("/dashboard/vendor/products")}
          className="flex-1 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 font-bold text-sm text-gray-600 dark:text-gray-400 hover:border-[#004D4A] transition">
          Cancel
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={isPending}
          className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${isSuccess ? "bg-green-500 text-white" : "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]"} disabled:opacity-70`}>
          {isPending ? <span className="w-4 h-4 border-2 border-[#D0FF71]/40 border-t-[#D0FF71] rounded-full animate-spin" /> : isSuccess ? <><CheckCircle size={16} /> Published!</> : "Publish Product"}
        </motion.button>
      </div>
    </form>
  );
}
