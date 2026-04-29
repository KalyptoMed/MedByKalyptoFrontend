"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Camera, CheckCircle } from "lucide-react";
import { useMe, useUpdateProfile } from "@/hooks/user.hooks";
import { useAuthStore } from "@/store/authStore";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function UserProfilePage() {
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useMe();
  const { mutate: updateProfile, isPending, isSuccess } = useUpdateProfile();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  useEffect(() => {
    const source = profile ?? user;
    if (source) {
      reset({
        firstName: source.firstName,
        lastName: source.lastName,
        email: source.email,
        phone: source.phone ?? "",
      });
    }
  }, [profile, user, reset]);

  const onSubmit = (data: FormValues) => updateProfile(data);

  const displayName = profile ? `${profile.firstName} ${profile.lastName}` : user ? `${user.firstName} ${user.lastName}` : "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-[#004D4A] flex items-center justify-center text-[#D0FF71] font-extrabold text-2xl">
              {initial}
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#D0FF71] flex items-center justify-center">
              <Camera size={12} className="text-[#004D4A]" />
            </button>
          </div>
          <div>
            <p className="font-extrabold text-[#004D4A] dark:text-white">{displayName}</p>
            <p className="text-gray-500 text-sm">{profile?.email ?? user?.email}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { label: "First Name", key: "firstName" as const },
                { label: "Last Name", key: "lastName" as const },
                { label: "Email", key: "email" as const },
                { label: "Phone", key: "phone" as const },
              ] as const).map(({ label, key }) => (
                <div key={key}>
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">{label}</label>
                  <input {...register(key)} readOnly={key === "email"}
                    className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#004D4A] dark:text-white ${key === "email" ? "opacity-60 cursor-not-allowed" : ""}`} />
                </div>
              ))}
            </div>

            <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={isPending}
              className={`mt-6 w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${isSuccess ? "bg-green-500 text-white" : "bg-[#004D4A] text-[#D0FF71] hover:bg-[#006B67]"} disabled:opacity-70`}>
              {isPending ? <span className="w-4 h-4 border-2 border-[#D0FF71]/40 border-t-[#D0FF71] rounded-full animate-spin" /> : isSuccess ? <><CheckCircle size={16} /> Saved!</> : "Save Changes"}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
