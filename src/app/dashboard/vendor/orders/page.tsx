"use client";

import { useState } from "react";
import DataTable from "@/components/portal/DataTable";
import StatusBadge from "@/components/portal/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { useVendorOrders, useUpdateOrderStatus, useConfirmPayment, ApiOrder } from "@/hooks/order.hooks";
import Image from "next/image";

const filters = ["All", "Pending", "Awaiting Confirmation", "Confirmed", "Shipped", "Delivered", "Cancelled"];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function customerName(c: any) {
  if (!c) return "—";
  if (typeof c === "object") return `${c.firstName} ${c.lastName}`;
  return c;
}

function orderProduct(o: any) {
  const first = o.items?.[0];
  if (!first) return "—";
  const name = typeof first.product === "object" ? first.product.name : "Item";
  return `${name} x${first.quantity}`;
}

export default function VendorOrdersPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [evidenceOrder, setEvidenceOrder] = useState<ApiOrder | null>(null);
  const { data, isLoading } = useVendorOrders(1, 50);
  const { mutate: updateStatus } = useUpdateOrderStatus();
  const { mutate: confirmPayment, isPending: confirming } = useConfirmPayment();

  const orders = data?.items ?? [];
  const filtered = orders.filter((o) => {
    let matchFilter = filter === "All";
    if (!matchFilter) {
      if (filter === "Awaiting Confirmation") matchFilter = o.paymentStatus === "awaiting_confirmation";
      else matchFilter = o.status === filter.toLowerCase();
    }
    const id = o.orderId ?? o._id;
    const cust = customerName(o.customer);
    const matchSearch =
      id.toLowerCase().includes(search.toLowerCase()) ||
      cust.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const columns = [
    { key: "_id", header: "Order ID", render: (row: any) => <span className="font-mono text-xs">{row.orderId ?? row._id}</span> },
    { key: "_customer", header: "Customer", render: (row: any) => customerName(row.customer) },
    { key: "_product", header: "Product", render: orderProduct },
    { key: "_date", header: "Date", render: (row: any) => fmtDate(row.createdAt) },
    { key: "_total", header: "Total", render: (row: any) => `₦${Number(row.total).toLocaleString()}`, className: "font-bold" },
    {
      key: "_payment",
      header: "Payment",
      render: (row: any) => {
        if (row.paymentStatus === "awaiting_confirmation") {
          return (
            <button
              onClick={() => setEvidenceOrder(row)}
              className="flex items-center gap-1 text-amber-600 text-xs font-bold hover:underline"
            >
              <Clock size={12} /> View Evidence
            </button>
          );
        }
        if (row.paymentStatus === "paid") {
          return <span className="text-green-600 text-xs font-bold flex items-center gap-1"><CheckCircle size={12} /> Paid</span>;
        }
        return <span className="text-gray-400 text-xs capitalize">{row.paymentMethod ?? "paystack"}</span>;
      },
    },
    { key: "status", header: "Status", render: (row: any) => <StatusBadge status={row.status} /> },
    {
      key: "_action",
      header: "",
      render: (row: any) => (
        <select
          defaultValue={row.status}
          onChange={(e) => updateStatus({ id: row._id, status: e.target.value })}
          className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-[#004D4A]"
        >
          {["pending", "confirmed", "processing", "shipped", "delivered"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Evidence modal */}
      <AnimatePresence>
        {evidenceOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEvidenceOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-[#004D4A] text-lg">Payment Evidence</h3>
                <button
                  onClick={() => setEvidenceOrder(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-4 space-y-2">
                {[
                  { label: "Order ID", value: evidenceOrder.orderId ?? evidenceOrder._id },
                  { label: "Total", value: `₦${Number(evidenceOrder.total).toLocaleString()}` },
                  { label: "Customer", value: customerName(evidenceOrder.customer) },
                  { label: "Method", value: "Bank Transfer" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-bold text-[#004D4A] dark:text-[#D0FF71]">{value}</span>
                  </div>
                ))}
              </div>

              {evidenceOrder.paymentEvidence ? (
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Receipt</p>
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <Image
                      src={evidenceOrder.paymentEvidence}
                      alt="Payment receipt"
                      width={400}
                      height={300}
                      className="w-full object-contain max-h-64"
                    />
                    <a
                      href={evidenceOrder.paymentEvidence}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-2 right-2 bg-white/90 rounded-lg px-2 py-1 text-xs font-bold text-[#004D4A] flex items-center gap-1 hover:bg-white transition shadow-sm"
                    >
                      <ExternalLink size={11} /> Open
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50 rounded-2xl p-4 mb-4 text-center">
                  <Clock size={24} className="text-amber-400 mx-auto mb-2" />
                  <p className="text-amber-700 text-sm font-medium">No receipt uploaded yet.</p>
                </div>
              )}

              {evidenceOrder.paymentStatus === "awaiting_confirmation" ? (
                <button
                  onClick={() =>
                    confirmPayment(evidenceOrder._id, {
                      onSuccess: () => setEvidenceOrder(null),
                    })
                  }
                  disabled={confirming}
                  className="w-full bg-[#004D4A] text-[#D0FF71] py-3 rounded-2xl font-bold hover:bg-[#006B67] transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {confirming ? (
                    <><div className="w-4 h-4 border-2 border-[#D0FF71] border-t-transparent rounded-full animate-spin" /> Confirming...</>
                  ) : (
                    <><CheckCircle size={16} /> Confirm Payment</>
                  )}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600 font-bold py-2">
                  <CheckCircle size={18} /> Payment Already Confirmed
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders or customers..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A]"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <motion.button
            key={f}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
              filter === f
                ? "bg-[#004D4A] text-[#D0FF71]"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} loading={isLoading} emptyMessage="No orders found" />
    </div>
  );
}
