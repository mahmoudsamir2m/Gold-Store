"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthButtons() {
  const { user } = useAuth();

  if (user) {
    return <UserMenu />;
  }

  return (
    <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
      <Link
        href="/login"
        prefetch={false}
        className="text-xs lg:text-sm px-3 py-1 font-medium hover:bg-yellow-500 hover:text-black rounded transition"
      >
        تسجيل دخول
      </Link>

      <Link
        href="/signup"
        prefetch={false}
        className="text-xs lg:text-sm px-4 py-1 bg-primary-500 hover:bg-transparent border border-primary-500 text-black hover:text-white font-bold rounded transition"
      >
        انشاء حساب
      </Link>
    </div>
  );
}
