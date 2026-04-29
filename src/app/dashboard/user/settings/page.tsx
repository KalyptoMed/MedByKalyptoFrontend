"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Lock, Bell, Shield, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useChangePassword } from "@/hooks/user.hooks";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const fieldClass =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A] dark:text-white";

export default function UserSettingsPage() {
  const { mutate: changePassword, isPending, isSuccess } = useChangePassword();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newArrivals: true,
    smsAlerts: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PasswordForm>();

  const newPassword = watch("newPassword");

  const onSubmit = (data: PasswordForm) => {
    changePassword(
      { currentPassword: data.currentPassword, newPassword: data.newPassword },
      { onSuccess: () => reset() }
    );
  };

  const toggleNotification = (key: keyof typeof notifications) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const notificationItems = [
    { key: "orderUpdates" as const, label: "Order updates", desc: "Shipping, delivery and status changes" },
    { key: "promotions" as const, label: "Promotions & deals", desc: "Discount codes and flash sales" },
    { key: "newArrivals" as const, label: "New arrivals", desc: "Products matching your interests" },
    { key: "smsAlerts" as const, label: "SMS alerts", desc: "Receive critical updates via SMS" },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-[#EBFFF5] dark:bg-[#004D4A]/20 flex items-center justify-center">
            <Lock size={16} className="text-[#004D4A] dark:text-[#D0FF71]" />
          </div>
          <h3 className="font-extrabold text-[#004D4A] dark:text-white">Change Password</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Current password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Current Password</label>
            <div className="relative">
              <input
                {...register("currentPassword", { required: "Required" })}
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                className={fieldClass + " pr-10"}
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>}
          </div>

          {/* New password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">New Password</label>
            <div className="relative">
              <input
                {...register("newPassword", {
                  required: "Required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
                type={showNew ? "text" : "password"}
                placeholder="At least 8 characters"
                className={fieldClass + " pr-10"}
              />
              <button type="button" onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 block">Confirm New Password</label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (v) => v === newPassword || "Passwords do not match",
                })}
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat new password"
                className={fieldClass + " pr-10"}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={isPending}
            className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${isSuccess ? "bg-green-500 text-white" : "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]"} disabled:opacity-70`}>
            {isPending
              ? <span className="w-4 h-4 border-2 border-[#D0FF71]/40 border-t-[#D0FF71] rounded-full animate-spin" />
              : isSuccess
                ? <><CheckCircle size={16} /> Password changed!</>
                : "Update Password"}
          </motion.button>
        </form>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-[#EBFFF5] dark:bg-[#004D4A]/20 flex items-center justify-center">
            <Bell size={16} className="text-[#004D4A] dark:text-[#D0FF71]" />
          </div>
          <h3 className="font-extrabold text-[#004D4A] dark:text-white">Notification Preferences</h3>
        </div>
        <div className="space-y-4">
          {notificationItems.map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => toggleNotification(key)}
                className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${notifications[key] ? "bg-[#004D4A]" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                <motion.span
                  animate={{ x: notifications[key] ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm block"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Account Security Info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-[#EBFFF5] dark:bg-[#004D4A]/20 flex items-center justify-center">
            <Shield size={16} className="text-[#004D4A] dark:text-[#D0FF71]" />
          </div>
          <h3 className="font-extrabold text-[#004D4A] dark:text-white">Account Security</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Two-factor authentication", value: "Not enabled", action: "Enable", actionClass: "text-[#004D4A] dark:text-[#D0FF71]" },
            { label: "Active sessions", value: "1 device", action: "View", actionClass: "text-gray-500" },
          ].map(({ label, value, action, actionClass }) => (
            <div key={label} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{value}</p>
              </div>
              <button className={`text-sm font-bold ${actionClass} hover:opacity-70 transition`}>{action}</button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-100 dark:border-red-900/50 p-6"
      >
        <h3 className="font-extrabold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-500/80 dark:text-red-400/70 mb-4">
          Once you delete your account, all your data will be permanently removed. This cannot be undone.
        </p>
        <button className="px-5 py-2.5 rounded-xl border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/40 transition">
          Delete Account
        </button>
      </motion.div>
    </div>
  );
}
