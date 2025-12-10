"use client";

import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import { useState } from 'react';

const useAuth = () => {
  const [isAuthenticated] = useState<boolean>(false);
  const user = { name: 'محمود' };
  return { isAuthenticated, user };
};

export default function AuthButtons() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Link
        href="/account"
        className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-13 xl:h-13 bg-gray-800 hover:bg-gray-700 rounded-full transition duration-300 text-primary-400 hover:text-primary-300"
        aria-label="الذهاب إلى الحساب"
      >
        <FaRegUser className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1 md:gap-2 lg:gap-3 xl:gap-4">
      <Link
        href="/login"
        className="text-xs lg:text-sm xl:text-base  px-2 md:px-3 lg:px-4 xl:px-5 py-1 md:py-2 font-medium hover:bg-yellow-500 hover:text-black rounded transition"
      >
        تسجيل دخول
      </Link>
      <Link
        href="/signup"
        className="text-xs lg:text-sm xl:text-base  px-3 md:px-4 lg:px-5 xl:px-6 py-1 md:py-2 bg-primary-500 hover:bg-transparent border border-primary-500 text-black hover:text-white font-bold rounded transition"
      >
        اشتراك
      </Link>
    </div>
  );
}
