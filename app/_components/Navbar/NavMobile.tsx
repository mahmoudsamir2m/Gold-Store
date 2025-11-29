"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navlink } from "./types/navlinks";
import { FaHome,FaShoppingBag, FaRocketchat, FaUser, FaShoppingCart } from "react-icons/fa";



export default function NavMobile() {
  const links: navlink[] = [
    { name: "الرئيسية", icon: FaHome, href: "/" },
    { name: "المنتجات", icon: FaShoppingBag, href: "/products" },
    { name: "اتصل بنا", icon: FaRocketchat, href: "/contact" },
    { name: "حسابي", icon: FaUser, href: "/account" },
    { name: "العربة", icon: FaShoppingCart, href: "/cart" },
  ];
  const pathName = usePathname();
  return (
    <header className="bg-gray-900 text-white  shadow-lg fixed bottom-0 left-0 right-0 z-50">
      <nav className="container mx-auto">
        <ul className="flex justify-around items-center py-3">
          {links.map((link, index) => (
            <li key={index}>
              <NavMobileLink link={link} pathName={pathName} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function NavMobileLink({
  link,
  pathName,
}: {
  link: navlink;
  pathName: string;
}) {
  return (
    <Link
      href={`${link.href}`}
      className={`${
        pathName === link.href && "active"
      }  flex flex-col items-center text-xs font-semibold`}
    >
      <link.icon className="text-lg mb-1" />
      <span className="text-secondary">{link.name}</span>
    </Link>
  );
}
