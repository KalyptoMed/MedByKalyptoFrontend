"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    platformName: "Medicart",
    supportEmail: "support@Medicart.ng",
    vendorCommission: "3",
    minOrderValue: "500",
    maintenanceMode: false,
    requireNafdac: true,
    autoApproveVendors: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const textFields = [
    { label: "Platform Name", key: "platformName" },
    { label: "Support Email", key: "supportEmail" },
    { label: "Vendor Commission (%)", key: "vendorCommission" },
    { label: "Minimum Order Value (₦)", key: "minOrderValue" },
  ];

  const toggleFields = [
    { label: "Maintenance Mode", key: "maintenanceMode", desc: "Temporarily disable the platform for users" },
    { label: "Require NAFDAC Number", key: "requireNafdac", desc: "Vendors must provide NAFDAC for all products" },
    { label: "Auto-Approve Vendors", key: "autoApproveVendors", desc: "Skip manual review for new vendor applications" },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-extrabold text-[#004D4A] dark:text-white mb-5">Platform Configuration</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {textFields.map(({ label, key }) => (
            <div key={key}>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">{label}</label>
              <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A] dark:text-white" />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="font-extrabold text-[#004D4A] dark:text-white mb-5">Feature Flags</h3>
        <div className="space-y-4">
          {toggleFields.map(({ label, key, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <button onClick={() => setForm({ ...form, [key]: !(form as any)[key] })}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${(form as any)[key] ? "bg-[#004D4A]" : "bg-gray-200 dark:bg-gray-700"}`}>
                <motion.span animate={{ x: (form as any)[key] ? 22 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm block" />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave}
        className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${saved ? "bg-green-500 text-white" : "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]"}`}>
        {saved ? <><CheckCircle size={16} /> Saved!</> : "Save Settings"}
      </motion.button>
    </div>
  );
}
