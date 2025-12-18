"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaUser } from "react-icons/fa";

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
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
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
