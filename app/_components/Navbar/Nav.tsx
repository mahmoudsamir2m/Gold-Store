"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinkItem } from "./types/NavLinkItem";
import { FaShoppingCart } from "react-icons/fa";

import CountrySelector from "./SubComponents/CountrySelector";
import AuthButtons from "./SubComponents/AuthButtons";
import SearchBar from "./SubComponents/SearchBar";

const navLinks: NavLinkItem[] = [
  { name: "الرئيسية", href: "/" },
  { name: "المنتجات", href: "/products" },
  { name: "اسعار الدهب والفضة", href: "/gold-silver" },
];

export default function Nav({ isMobile }: { isMobile: boolean }) {
  const pathname = usePathname();

  return (
    <header className="bg-gray-900 text-white px-6 py-3 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center gap-2 md:gap-4 lg:gap-6 xl:gap-8">
        {/* Logo */}
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
          <Image
            src="/icon-gold.png"
            width={100}
            height={100}
            alt="Gold Icon"
            className="object-contain h-14 w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 xl:h-20 xl:w-20"
          />

          <span className="text-lg lg:text-xl xl:text-2xl font-bold tracking-wide">
            <span className="text-primary-500">ده</span>بنا
          </span>
        </div>

        {/* Navigation */}
        {!isMobile && (
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6">
            {renderNavLinks(pathname)}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 xl:gap-6">
          <SearchBar isMobile={isMobile} />
          {!isMobile && (
            <>
              <Link
                href="/cart"
                className="hover:text-primary-500 transition flex"
              >
                <FaShoppingCart className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
              </Link>
              <AuthButtons />
            </>
          )}
          <CountrySelector/>
        </div>
      </nav>
    </header>
  );
}
// Render navigation links
function renderNavLinks(pathname: string) {
  return navLinks.map((link) => {
    const isActive = pathname === link.href;

    return (
      <Link
        key={link.href}
        href={link.href}
        className={isActive ? "nav-link active" : "nav-link"}
      >
        {link.name}
      </Link>
    );
  });
}
