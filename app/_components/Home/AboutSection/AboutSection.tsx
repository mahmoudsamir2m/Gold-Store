"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { AboutSectionProps } from "./types/AboutSectionProps";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutSection({
  title = "إتقان فن الذهب",
  description = "نصنع مجوهرات ذهبية خالدة بالدقة والشغف والحرفية التي تتوارثها الأجيال.",
  link = "",
  buttonText = "المزيد عنا",
  imageSrc = "",
}: AboutSectionProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntroVideo = async () => {
      try {
        const res = await fetch("/api/intro-video");
        const data = await res.json();

        if (data.success) {
          setVideoUrl(data.videoUrl);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIntroVideo();
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16" dir="rtl">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12">
        {/* Text */}
        <div className="lg:w-1/2 space-y-6 text-right">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="text-lg text-gray-600">{description}</p>

          <Link
            href={link}
            target={
              link.includes("https://www.facebook.com") ? "_blank" : undefined
            }
            rel={
              link.includes("https://www.facebook.com")
                ? "noopener noreferrer"
                : undefined
            }
            className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg inline-flex items-center gap-2 ml-auto group"
          >
            {buttonText}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Media */}
        <div className="lg:w-1/2">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="محل مجوهرات"
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />
          ) : loading ? (
            <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-2xl">
              جاري تحميل الفيديو...
            </div>
          ) : videoUrl ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              muted
              loop
              className="w-full h-[400px] object-cover rounded-2xl"
            />
          ) : (
            <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-2xl">
              لا يوجد فيديو
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
