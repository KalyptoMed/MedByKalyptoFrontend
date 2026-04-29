"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, XCircle, PauseCircle, User, Store } from "lucide-react";
import StatusBadge from "@/components/portal/StatusBadge";
import { useAdminVendors, useApproveVendor, type AdminVendorItem } from "@/hooks/admin.hooks";

const tabs = ["All", "Pending", "Approved", "Suspended", "No Profile"];

function vendorStatus(v: AdminVendorItem): "pending" | "approved" | "suspended" | "no_profile" {
  return v.profile?.status ?? "no_profile";
}

export default function AdminVendorsPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { data, isLoading } = useAdminVendors(1, 100);
  const { mutate: approveVendor, isPending } = useApproveVendor();

  const vendors = data?.items ?? [];

  const filtered = vendors.filter((v) => {
    const matchSearch =
      v.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      v.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      v.email?.toLowerCase().includes(search.toLowerCase()) ||
      v.profile?.storeName?.toLowerCase().includes(search.toLowerCase());
    const status = vendorStatus(v);
    const matchTab =
      tab === "All" ||
      (tab === "No Profile" && !v.profile) ||
      (tab !== "No Profile" && status === tab.toLowerCase());
    return matchSearch && matchTab;
  });

  const countFor = (t: string) => {
    if (t === "All") return vendors.length;
    if (t === "No Profile") return vendors.filter((v) => !v.profile).length;
    return vendors.filter((v) => v.profile?.status === t.toLowerCase()).length;
  };

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or store name..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A]" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <motion.button key={t} whileTap={{ scale: 0.95 }} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${tab === t ? "bg-[#004D4A] text-[#D0FF71]" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
            {t} <span className="opacity-60 ml-0.5">({countFor(t)})</span>
          </motion.button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((vendor, i) => (
              <motion.div key={vendor._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }} transition={{ delay: i * 0.03 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

                <button className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                  onClick={() => setExpanded(expanded === vendor._id ? null : vendor._id)}>
                  <div className="w-10 h-10 rounded-xl bg-[#004D4A]/10 flex items-center justify-center text-[#004D4A] font-extrabold text-base flex-shrink-0">
                    {vendor.firstName?.charAt(0)?.toUpperCase() ?? "V"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-[#004D4A] dark:text-white">
                      {vendor.firstName} {vendor.lastName}
                      {vendor.profile?.storeName && (
                        <span className="ml-2 text-xs font-semibold text-gray-400 dark:text-gray-500">· {vendor.profile.storeName}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{vendor.email}</p>
                  </div>
                  {vendor.profile ? (
                    <StatusBadge status={vendor.profile.status} />
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                      No Store Profile
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {expanded === vendor._id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
                      className="overflow-hidden border-t border-gray-100 dark:border-gray-800">

                      {/* User info */}
                      <div className="px-4 pt-4 pb-3 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 dark:bg-gray-800/50">
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Email</p>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5 truncate">{vendor.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Phone</p>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{vendor.phone || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Verified</p>
                          <p className="text-sm font-semibold mt-0.5">
                            <span className={vendor.isVerified ? "text-green-600" : "text-amber-500"}>
                              {vendor.isVerified ? "Yes" : "No"}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Joined</p>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                            {new Date(vendor.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Store profile */}
                      {vendor.profile ? (
                        <div className="px-4 pt-3 pb-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div className="sm:col-span-3">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide flex items-center gap-1.5 mb-2">
                              <Store size={11} /> Store Profile
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Store Name</p>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{vendor.profile.storeName || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">CAC No.</p>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{vendor.profile.cacNumber || "—"}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">NAFDAC No.</p>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{vendor.profile.nafdacNumber || "—"}</p>
                          </div>
                          <div className="sm:col-span-3">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">Address</p>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{vendor.profile.address || "—"}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="px-4 py-3 flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
                          <Store size={14} />
                          This vendor has not set up their store profile yet.
                        </div>
                      )}

                      {/* Actions — only on vendors who have a profile */}
                      {vendor.profile && (
                        <div className="px-4 pb-4 flex gap-2 flex-wrap">
                          {vendor.profile.status !== "approved" && (
                            <motion.button whileTap={{ scale: 0.95 }} disabled={isPending}
                              onClick={() => approveVendor({ id: vendor.profile!._id, status: "approved" })}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500 text-white text-xs font-bold hover:bg-green-600 transition disabled:opacity-60">
                              <CheckCircle size={13} /> Approve
                            </motion.button>
                          )}
                          {vendor.profile.status !== "suspended" && (
                            <motion.button whileTap={{ scale: 0.95 }} disabled={isPending}
                              onClick={() => approveVendor({ id: vendor.profile!._id, status: "suspended" })}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-500 text-white text-xs font-bold hover:bg-yellow-600 transition disabled:opacity-60">
                              <PauseCircle size={13} /> Suspend
                            </motion.button>
                          )}
                          {vendor.profile.status !== "pending" && (
                            <motion.button whileTap={{ scale: 0.95 }} disabled={isPending}
                              onClick={() => approveVendor({ id: vendor.profile!._id, status: "pending" })}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 text-xs font-bold transition disabled:opacity-60">
                              <XCircle size={13} /> Reset to Pending
                            </motion.button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {!isLoading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">No vendors found</p>
              {search && <p className="text-gray-400 text-sm">Try a different search term</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
