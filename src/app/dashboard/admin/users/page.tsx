"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserX, ShieldCheck } from "lucide-react";
import DataTable from "@/components/portal/DataTable";
import StatusBadge from "@/components/portal/StatusBadge";
import { useAdminUsers, useDeactivateUser } from "@/hooks/admin.hooks";

const roleTabs = ["All", "User", "Vendor", "Admin"];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const { data, isLoading } = useAdminUsers(1, 100);
  const { mutate: deactivate } = useDeactivateUser();

  const users = data?.items ?? [];
  const filtered = users.filter((u) => {
    const matchSearch = `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "All" || u.role === roleFilter.toLowerCase();
    return matchSearch && matchRole;
  });

  const columns = [
    { key: "_name", header: "Name", render: (row: any) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#004D4A]/10 flex items-center justify-center text-[#004D4A] font-bold text-sm flex-shrink-0">
          {row.firstName?.charAt(0) ?? "?"}
        </div>
        <div>
          <p className="font-semibold text-[#004D4A] dark:text-white text-sm">{row.firstName} {row.lastName}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      </div>
    )},
    { key: "role", header: "Role", render: (row: any) => (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${row.role === "vendor" ? "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" : row.role === "admin" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}`}>
        {row.role}
      </span>
    )},
    { key: "phone", header: "Phone", render: (row: any) => row.phone ?? "—" },
    { key: "_status", header: "Status", render: (row: any) => <StatusBadge status={row.isActive === false ? "suspended" : "active"} /> },
    { key: "_actions", header: "", render: (row: any) => (
      <div className="flex items-center gap-1">
        <motion.button whileTap={{ scale: 0.9 }} title="Promote to admin" className="p-1.5 rounded-lg hover:bg-[#EBFFF5] text-[#004D4A] transition">
          <ShieldCheck size={14} />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} title="Deactivate" onClick={() => deactivate(row._id)}
          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition">
          <UserX size={14} />
        </motion.button>
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users by name or email..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A]" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {roleTabs.map((r) => (
          <motion.button key={r} whileTap={{ scale: 0.95 }} onClick={() => setRoleFilter(r)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${roleFilter === r ? "bg-[#004D4A] text-[#D0FF71]" : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}>
            {r}
          </motion.button>
        ))}
      </div>
      <DataTable columns={columns} data={filtered} loading={isLoading} emptyMessage="No users found" />
    </div>
  );
}
