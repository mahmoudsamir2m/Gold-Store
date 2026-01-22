"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayout =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password"||
    pathname === "/reset-password"||
    pathname === "/verify-otp";

  return (
    <>
      <AuthProvider>
        {!hideLayout && <Navbar />}
        {children}
        {!hideLayout && <Footer />}
      </AuthProvider>
    </>
  );
}
