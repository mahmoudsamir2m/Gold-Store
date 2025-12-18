"use client";

import * as React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCalendar, FaUser } from "react-icons/fa";
import { cardsData } from "@/app/_components/Home/BlogSection/data/data";
import "./blog-details.css";

interface PageProps {
  params: Promise<{ slug: string }>; 
}

export default function BlogDetailsPage({ params }: PageProps) {
  const { slug } = React.use(params);

  const blog = cardsData.find((item) => item.slug === slug);
  if (!blog) return notFound();
  const renderParticles = () => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 5 + Math.random() * 5;

      return (
        <div
          key={i}
          className="absolute bg-yellow-400 rounded-full opacity-30 animate-floating-particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    });
  };

  return (
    <section className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Gold shimmer particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black/80 overflow-hidden">
        {renderParticles()}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-24 flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Title + Content */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-l from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-title-glow">
            {blog.title}
          </h1>

          {/* Card Content */}
          <article className="relative bg-white/10 backdrop-blur-md border border-yellow-400/20 text-gray-100 rounded-3xl p-6 sm:p-10 shadow-lg shadow-yellow-400/30 flex flex-col gap-6 animate-card-floating">
            {/* Meta */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-end gap-4 sm:gap-6 text-sm text-gray-300 mb-4">
              <span className="flex items-center gap-2">
                <FaUser className="text-yellow-400" />
                {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendar className="text-yellow-400" />
                {blog.date}
              </span>
            </div>

            {/* Content Body */}
            <div className="space-y-6 sm:space-y-8 leading-relaxed text-base">
              {blog.content.map((item, index) => {
                switch (item.type) {
                  case "heading":
                    return (
                      <h2
                        key={index}
                        className="text-2xl sm:text-3xl font-bold text-yellow-400 animate-pulse-heading"
                      >
                        {item.value as string}
                      </h2>
                    );
                  case "list":
                    return (
                      <ul
                        key={index}
                        className="space-y-2 sm:space-y-3 pr-4 sm:pr-6"
                      >
                        {(item.value as string[]).map((li, i) => (
                          <li
                            key={i}
                            className="relative pr-5 animate-pulse-bullet"
                          >
                            <span className="absolute right-0 top-1 w-2 h-2 bg-yellow-400 rotate-45" />
                            {li}
                          </li>
                        ))}
                      </ul>
                    );
                  case "paragraph":
                  default:
                    return <p key={index}>{item.value as string}</p>;
                }
              })}
            </div>
          </article>
        </div>

        {/* Image */}
        <div className="relative w-full order-1 lg:order-2 rounded-3xl overflow-hidden shadow-lg shadow-yellow-400/20 h-[300px] sm:h-[400px] lg:h-[500px] animate-image-float">
          <Image
            src={blog.imageSrc}
            alt={blog.title}
            fill
            className="object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
