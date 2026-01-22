"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaShoppingBag, FaGem, FaShoppingCart } from "react-icons/fa";
import { IconType } from "react-icons";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "../Navbar/SubComponents/UserMenu";

export default function NavMobile() {
  const pathName = usePathname();
  const { user } = useAuth();

  return (
    <header className="bg-gray-900 text-white fixed bottom-0 left-0 right-0 z-50">
      <nav className="container mx-auto">
        <ul className="flex justify-around items-center py-3">
          <NavItem
            href="/"
            icon={FaHome}
            label="الرئيسية"
            pathName={pathName}
          />
          <NavItem
            href="/products"
            icon={FaShoppingBag}
            label="الاعلانات"
            pathName={pathName}
          />
          <NavItem
            href="/gold-silver"
            icon={FaGem}
            label="الأسعار"
            pathName={pathName}
          />
          {/* حسابي */}
          <li>
            {user ? (
              <UserMenu variant="mobile" currentPath={pathName} />
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center text-xs font-semibold"
              >
                <span className="text-lg mb-1">👤</span>
                تسجيل دخول
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  pathName,
}: {
  href: string;
  icon: IconType;
  label: string;
  pathName: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex flex-col items-center text-xs font-semibold ${
          pathName === href ? "text-primary-500" : ""
        }`}
      >
        <Icon className="text-lg mb-1" />
        <span>{label}</span>
      </Link>
    </li>
  );
}
