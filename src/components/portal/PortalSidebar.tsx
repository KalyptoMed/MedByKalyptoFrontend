"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface PortalSidebarProps {
  items: NavItem[];
  role: "user" | "vendor" | "admin";
  open: boolean;
  onClose: () => void;
}

const roleColors = {
  user: { active: "bg-[#004D4A] text-[#D0FF71]", hover: "hover:bg-[#004D4A]/10 hover:text-[#004D4A]", accent: "#004D4A" },
  vendor: { active: "bg-[#004D4A] text-[#D0FF71]", hover: "hover:bg-[#004D4A]/10 hover:text-[#004D4A]", accent: "#004D4A" },
  admin: { active: "bg-[#1e1e2e] text-[#D0FF71]", hover: "hover:bg-[#1e1e2e]/10 hover:text-[#1e1e2e]", accent: "#1e1e2e" },
};

export default function PortalSidebar({ items, role, open, onClose }: PortalSidebarProps) {
  const pathname = usePathname();
  const colors = roleColors[role];

  const content = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/images/logo_no bg 1.png" alt="Logo" width={36} height={26} className="object-contain" />
          <span className="font-extrabold text-[#004D4A] dark:text-white text-lg">Medicart</span>
        </Link>
        <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group ${
                isActive ? colors.active : `text-gray-600 dark:text-gray-400 ${colors.hover}`
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
              ) : (
                <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "opacity-100" : ""}`} />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 z-50 lg:hidden shadow-2xl"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
