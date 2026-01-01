"use client";

import Image from "next/image";
import { ProductCardProps } from "./types/ProductCardProps";
import Link from "next/link";

const CURRENCY_MAP: Record<string, string> = {
  egypt: 'ج.م',
  saudi: 'ر.س',
  uae: 'د.إ',
};

export default function Card({
  id,
  images,
  title,
  rating,
  price,
  originalPrice,
  width,
  label,
  country,
}: ProductCardProps) {
  const currency = country ? CURRENCY_MAP[country] || '$' : '$';

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${width} mx-auto dir-rtl`}
      dir="rtl"
    >
      {/* Product image */}
      <div className="relative w-full h-48 bg-gray-100">
        {label && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
            {label}
          </div>
        )}
        {images && images.length > 0 && images[0] ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-sm">لا توجد صورة</span>
          </div>
        )}
      </div>
      {/* Content section */}
      <div className="p-4">
        {/* Product title */}
        <h3 className="text-lg min-h-15 line-clamp-2 font-semibold text-gray-800 mb-1">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3 space-x-1 space-x-reverse">
          <span className="text-primary-500">★</span>
          <span className="text-sm text-gray-600">{rating}</span>
        </div>

        {/* Price section with cart icon */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">{price} {currency}</span>
            {/* Original price */}
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {originalPrice} {currency}
              </span>
            )}
          </div>
        </div>
        {/* View Details Button */}
        <Link
          href={`/product/${id}`}
          className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}
