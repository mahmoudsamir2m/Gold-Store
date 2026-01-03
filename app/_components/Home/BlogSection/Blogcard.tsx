"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaUser } from "react-icons/fa";
import { ImageOff } from "lucide-react";

interface GoldCardProps {
  imageSrc: string;
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}

export default function GoldCard({
  imageSrc,
  title,
  description,
  date,
  author,
  slug,
}: GoldCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <div
        className="
        bg-white rounded-xl p-4 border-2 border-primary-500 shadow-lg
        hover:shadow-xl transition-shadow duration-300 overflow-hidden
        flex flex-col gap-3 h-65 md:h-60"
      >
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
              <ImageOff className="w-8 h-8 text-gray-400 mb-1" />
              <span className="text-gray-500 text-xs">لا توجد صورة</span>
            </div>
          )}
        </div>
        <div className="flex-1 text-right flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <FaUser className="w-4 h-4" />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendar className="w-4 h-4" />
              {date}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
