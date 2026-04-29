"use client";

import { Menu, Bell, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface PortalHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  badge?: React.ReactNode;
}

export default function PortalHeader({ title, subtitle, onMenuClick, badge }: PortalHeaderProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const initial = user ? user.firstName.charAt(0).toUpperCase() : "?";

  const handleLogout = () => { logout(); router.push("/auth/login"); };

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Menu size={20} />
          </motion.button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-[#004D4A] dark:text-white text-lg leading-tight">{title}</h1>
              {badge}
            </div>
            {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition relative">
            <Bell size={18} className="text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#004D4A] flex items-center justify-center text-[#D0FF71] font-bold text-sm">
              {initial}
            </div>
            <span className="hidden md:block text-sm font-semibold text-gray-700 dark:text-gray-300">{user?.firstName}</span>
          </div>
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleLogout} title="Sign out"
            className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition">
            <LogOut size={16} />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
