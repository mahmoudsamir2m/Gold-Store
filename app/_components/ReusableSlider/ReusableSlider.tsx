"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SliderProps } from "./types/SliderProps";

export default function ReusableSliderSection({
  title,
  link,
  children,
}: SliderProps) {
  return (
    <section className="w-full py-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold text-gray-800 after relative">
          {title}
        </h2>

        {link && (
          <a
            href={link}
            className="text-primary-500 hover:text-primary-600 font-semibold text-xl transition"
          >
            عرض الكل
          </a>
        )}
      </div>

      <div className="relative px-4">
        {/* Swiper arrows */}
        <div className="swiper-button-prev text-primary-500 hover:text-primary-600"></div>
        <div className="swiper-button-next text-primary-500 hover:text-primary-600"></div>

        <Swiper
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 }, // Mobile
            640: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 3 }, // Laptop
            1280: { slidesPerView: 4 }, // Large screens
          }}
          modules={[Autoplay, Navigation]}
        >
          {children}
        </Swiper>
      </div>
    </section>
  );
}

export { SwiperSlide };
