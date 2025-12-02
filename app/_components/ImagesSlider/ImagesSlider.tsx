"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";
import { useState } from "react";

export default function ProductImagesSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

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
        {images.map((img, i) => (
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
        {images.map((img, i) => (
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
