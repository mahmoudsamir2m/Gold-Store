"use client";

import Link from "next/link";
import { FaRegUser, FaUser, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  variant?: "desktop" | "mobile";
  currentPath?: string;
}

export default function UserMenu({
  variant = "desktop",
  currentPath,
}: UserMenuProps) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const accountPaths = ["/account", "/add-product"];
  const isActive =
    open || accountPaths.some((path) => currentPath?.startsWith(path));

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {variant === "desktop" ? (
          <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-primary-400">
            <FaRegUser className="w-5 h-5" />
          </button>
        ) : (
          <button
            className={cn(
              "flex flex-col items-center text-xs font-semibold",
              isActive && "text-primary-500"
            )}
          >
            <FaRegUser className="text-lg mb-1" />
            حسابي
          </button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-white text-black shadow-lg rounded-md"
      >
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center gap-2">
            <FaUser className="w-4 h-4" />
            حسابي
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/add-product" className="flex items-center gap-2">
            <FaPlusCircle className="w-4 h-4" />
            إضافة منتج
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="flex items-center gap-2 text-red-600 cursor-pointer"
        >
          <FaSignOutAlt className="w-4 h-4" />
          تسجيل خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
