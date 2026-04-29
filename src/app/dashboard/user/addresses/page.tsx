"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MapPin, Trash2, CheckCircle } from "lucide-react";
import { useAddresses, useAddAddress, useDeleteAddress, useSetDefaultAddress } from "@/hooks/user.hooks";

export default function UserAddressesPage() {
  const { data: addresses = [], isLoading } = useAddresses();
  const { mutate: addAddress, isPending: adding } = useAddAddress();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefault } = useSetDefaultAddress();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "", street: "", city: "", state: "" });

  const save = () => {
    if (!form.street || !form.city) return;
    addAddress(
      { ...form, isDefault: addresses.length === 0 },
      { onSuccess: () => { setForm({ label: "", street: "", city: "", state: "" }); setShowForm(false); } }
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-4">
        {[...Array(2)].map((_, i) => <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="grid gap-4">
        <AnimatePresence>
          {addresses.map((addr) => (
            <motion.div key={addr._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-4 border-2 transition ${addr.isDefault ? "border-[#004D4A]" : "border-gray-100 dark:border-gray-800"}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004D4A]/10 flex items-center justify-center">
                    <MapPin size={18} className="text-[#004D4A]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[#004D4A] dark:text-white text-sm">{addr.label || "Address"}</p>
                      {addr.isDefault && <span className="bg-[#D0FF71] text-[#004D4A] text-[10px] font-bold px-2 py-0.5 rounded-full">Default</span>}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{addr.street}, {addr.city}, {addr.state}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!addr.isDefault && (
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDefault(addr._id)} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition">
                      <CheckCircle size={16} />
                    </motion.button>
                  )}
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => deleteAddress(addr._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition">
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-[#004D4A] p-4 space-y-3">
            {([["Label", "label", "e.g. Home, Office"], ["Street", "street", "12 Admiralty Way"], ["City", "city", "Lagos"], ["State", "state", "Lagos"]] as const).map(([label, key, placeholder]) => (
              <div key={key}>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">{label}</label>
                <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A] dark:text-white" />
              </div>
            ))}
            <div className="flex gap-2 pt-1">
              <motion.button whileTap={{ scale: 0.97 }} onClick={save} disabled={adding}
                className="flex-1 py-2.5 rounded-xl bg-[#004D4A] text-[#D0FF71] font-bold text-sm disabled:opacity-70">
                {adding ? <span className="inline-block w-4 h-4 border-2 border-[#D0FF71]/40 border-t-[#D0FF71] rounded-full animate-spin" /> : "Save Address"}
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium">Cancel</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showForm && (
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowForm(true)}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 font-medium text-sm flex items-center justify-center gap-2 hover:border-[#004D4A] hover:text-[#004D4A] transition">
          <Plus size={16} /> Add New Address
        </motion.button>
      )}

      {addresses.length === 0 && !showForm && (
        <p className="text-center text-gray-400 text-sm py-8">No addresses saved yet.</p>
      )}
    </div>
  );
}
