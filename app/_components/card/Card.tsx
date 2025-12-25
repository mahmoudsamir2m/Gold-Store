"use client";

import Image from "next/image";
import { ProductCardProps } from "./types/ProductCardProps";
import Link from "next/link";

export default function Card({
  id,
  images,
  title,
  rating,
  price,
  originalPrice,
  width,
}: ProductCardProps) {

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${width} mx-auto dir-rtl`}
      dir="rtl"
    >
      {/* Product image */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
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
            <span className="text-xl font-bold text-gray-900">${price}</span>
            {/* Original price */}
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
        {/* View Details Button */}
        <Link
          href={`/productDetails/${id}`}
          className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}
