"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products/all" },
  { label: "Solutions", href: "/solutions" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCartStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const cartCount = totalItems();

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-card border-b border-gray-100"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/assets/images/logo_no bg 1.png"
              alt="Medicart"
              width={60}
              height={44}
              className="object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-[#EBFFF5] text-[#004D4A]"
                      : "text-gray-600 hover:text-[#004D4A] hover:bg-[#EBFFF5]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-xl text-[#004D4A] hover:bg-[#EBFFF5] transition group"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#D0FF71] text-[#004D4A] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated && user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#EBFFF5] transition"
                >
                  <div className="w-8 h-8 rounded-full bg-[#004D4A] flex items-center justify-center text-[#D0FF71] font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[#004D4A] font-semibold text-sm">{user.name.split(" ")[0]}</span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-card-hover border border-gray-100 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-bold text-[#004D4A] text-sm">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                      <Link
                        href={user.role === "vendor" ? "/dashboard/vendor" : "/dashboard/user"}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-[#EBFFF5] hover:text-[#004D4A] transition"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition w-full"
                      >
                        <LogOut size={16} />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-[#004D4A] font-semibold text-sm rounded-xl hover:bg-[#EBFFF5] transition"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2.5 bg-[#004D4A] text-[#D0FF71] font-bold text-sm rounded-xl hover:bg-[#006B67] transition shadow-brand"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2.5 rounded-xl text-[#004D4A] hover:bg-[#EBFFF5] transition"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-xl font-semibold transition ${
                      pathname === link.href
                        ? "bg-[#EBFFF5] text-[#004D4A]"
                        : "text-gray-700 hover:bg-[#EBFFF5] hover:text-[#004D4A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <>
                      <Link href={user?.role === "vendor" ? "/dashboard/vendor" : "/dashboard/user"}
                        className="flex items-center gap-2 px-4 py-3 bg-[#EBFFF5] text-[#004D4A] font-semibold rounded-xl"
                      >
                        <User size={16} /> My Dashboard
                      </Link>
                      <button onClick={logout} className="px-4 py-3 text-red-500 font-semibold text-left rounded-xl hover:bg-red-50 transition">
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" className="px-4 py-3 text-[#004D4A] font-semibold rounded-xl border border-[#004D4A] text-center">Log in</Link>
                      <Link href="/auth/register" className="px-4 py-3 bg-[#004D4A] text-[#D0FF71] font-bold rounded-xl text-center">Sign up</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartDrawer />
    </>
  );
}
