"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function ProductImagesSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // Filter out empty or invalid images
  const validImages = images.filter((img) => img && img.trim() !== "");

  if (validImages.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-200 rounded-lg">
        <ImageOff className="w-16 h-16 text-gray-400 mb-4" />
        <span className="text-gray-500 text-lg">لا توجد صور للمنتج</span>
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-full">
      {/* السلايدر الأساسي */}
      <Swiper
        modules={[Thumbs, Autoplay]}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="rounded-lg overflow-hidden bg-white shadow-md"
      >
        {validImages.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img}
              alt="Product Image"
              width={700}
              height={700}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* الصور الصغيرة (Thumbnails) */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
        className="mt-4"
      >
        {validImages.map((img, i) => (
          <SwiperSlide key={i}>
            <Image
              src={img}
              alt="thumb"
              width={150}
              height={150}
              className="w-full h-20 rounded-lg object-cover border cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
