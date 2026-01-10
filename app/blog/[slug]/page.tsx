"use client";

import * as React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCalendar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  ApiBlogItem,
  BlogItem,
} from "@/app/_components/Home/BlogSection/types/dataTypes";
import "./blog-details.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const fetchBlog = async (id: string): Promise<ApiBlogItem> => {
  const response = await fetch(`https://gold-stats.com/api/blogs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
};

const transformApiBlogToBlogItem = (apiBlog: ApiBlogItem): BlogItem => {
  const firstContent =
    apiBlog.titles
      .flatMap((title) => title.contents.map((c) => c.content))
      .find((text) => text.trim().length > 0) || "";

  const description =
    firstContent.length > 150
      ? firstContent.substring(0, 150) + "..."
      : firstContent;

  const content = apiBlog.titles.flatMap((title) => {
    const items: Array<{
      type: "heading" | "paragraph" | "list";
      value: string | string[];
    }> = [];

    items.push({
      type: "heading",
      value: title.title,
    });

    title.contents.forEach((contentItem) => {
      const lines = contentItem.content.split("\n").map((line) => line.trim());

      const hasListItems = lines.some(
        (line) =>
          line.startsWith("•") || line.startsWith("-") || line.startsWith("–")
      );

      if (hasListItems) {
        const listItems = lines
          .filter(
            (line) =>
              line.startsWith("•") ||
              line.startsWith("-") ||
              line.startsWith("–")
          )
          .map((line) => line.replace(/^[\s•\-–]+/, "").trim());

        items.push({
          type: "list",
          value: listItems,
        });
      } else {
        items.push({
          type: "paragraph",
          value: contentItem.content,
        });
      }
    });

    return items;
  });

  return {
    id: apiBlog.id,
    slug: apiBlog.id.toString(),
    imageSrc: apiBlog.image_path,
    title: apiBlog.name,
    description,
    date: new Date(apiBlog.created_at).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
    }),
    content,
  };
};

export default function BlogDetailsPage({ params }: PageProps) {
  const { slug } = React.use(params);

  const {
    data: apiBlog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchBlog(slug),
  });

  if (isLoading) {
    return (
      <section className="relative bg-neutral-900 text-white overflow-hidden">
        <div className="flex items-center justify-center h-screen">
          <div className="text-yellow-400 text-xl">جاري التحميل...</div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error fetching blog:", error);
    return notFound();
  }

  const blog = apiBlog ? transformApiBlogToBlogItem(apiBlog) : null;
  if (!blog) return notFound();

  const renderParticles = () =>
    Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      return (
        <div
          key={i}
          className="absolute bg-yellow-400 rounded-full opacity-30 animate-floating-particle"
          style={{
            width: size,
            height: size,
            top: `${top}%`,
            left: `${left}%`,
          }}
        />
      );
    });

  return (
    <section className="relative bg-neutral-900 text-white overflow-hidden">
      <div className="absolute inset-0">{renderParticles()}</div>

      <div className="relative max-w-6xl mx-auto px-4 lg:px-16 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Content */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-l from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          <article
            className="
              relative
              bg-white/10
              backdrop-blur-md
              border border-yellow-400/20
              rounded-3xl
              p-6 sm:p-10
              shadow-lg shadow-yellow-400/30
              overflow-hidden
            "
          >
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
              <FaCalendar className="text-yellow-400" />
              {blog.date}
            </div>

            {/*  المحتوى محمي من الخروج */}
            <div className="space-y-6 break-words break-all">
              {blog.content.map((item, index) => {
                if (item.type === "heading") {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold text-yellow-400 border-b border-yellow-400/30 pb-2 break-words"
                    >
                      {item.value}
                    </h2>
                  );
                }

                if (item.type === "list") {
                  return (
                    <ul key={index} className="space-y-2 pr-6">
                      {(item.value as string[]).map((li, i) => (
                        <li
                          key={i}
                          className="relative pr-5 break-words break-all"
                        >
                          <span className="absolute right-0 top-2 w-2 h-2 bg-yellow-400 rotate-45" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-gray-200 break-words break-all"
                  >
                    {(item.value as string).replace(/\s+/g, " ")}
                  </p>
                );
              })}
            </div>
          </article>
        </div>

        {/* Image */}
        <div className="relative h-[300px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg shadow-yellow-400/20">
          <Image
            src={`https://gold-stats.com/storage/${blog.imageSrc}`}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
