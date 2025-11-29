"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { AboutSectionProps } from "./types/AboutSectionProps";
import Link from "next/link";

export default function AboutSection({
  title = "إتقان فن الذهب",
  description = "نصنع مجوهرات ذهبية خالدة بالدقة والشغف والحرفية التي تتوارثها الأجيال.",
  link = "/about",
  buttonText = "المزيد عنا",
  imageSrc = "/jewelry-store.png",
}: AboutSectionProps) {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="lg:w-1/2 space-y-6 text-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

          <Link
            href={link}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 inline-flex items-center gap-2 ml-auto group"
          >
            {buttonText}
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <Image
              src={imageSrc}
              alt="محل مجوهرات فاخرة من الداخل"
              width={600}
              height={400}
              className="clip-curved relative z-10 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
