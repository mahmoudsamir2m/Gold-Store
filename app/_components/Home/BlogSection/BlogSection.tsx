"use client";

import { useQuery } from "@tanstack/react-query";
import BlogCard from "./Blogcard";
import AnimatedUnderlineTitle from "../../AnimatedUnderlineTitle/AnimatedUnderlineTitle";
import { ApiBlogItem, BlogItem } from "./types/dataTypes";

const fetchBlogs = async (): Promise<ApiBlogItem[]> => {
  const response = await fetch("https://gold-stats.com/api/blogs");
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
};

const transformApiBlogToBlogItem = (apiBlog: ApiBlogItem): BlogItem => {
  const description =
    apiBlog.titles
      .flatMap((title) => title.contents.map((content) => content.content))
      .join(" ")
      .slice(0, 150) + "...";

  const content = apiBlog.titles.map((title) => ({
    type:
      title.type === "header"
        ? "heading"
        : title.type === "content"
        ? "paragraph"
        : ("paragraph" as "heading" | "paragraph"),
    value: title.contents.map((content) => content.content).join(" "),
  }));

  return {
    id: apiBlog.id,
    slug: apiBlog.id.toString(),
    imageSrc: apiBlog.image_path,
    title: apiBlog.name,
    description,
    date: new Date(apiBlog.created_at).toLocaleDateString("ar-EG"),
    content,
  };
};

export default function BlogSection() {
  const {
    data: apiBlogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <AnimatedUnderlineTitle title="اكتشف عالم الذهب" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border-2 border-primary-500 shadow-lg animate-pulse"
            >
              <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <AnimatedUnderlineTitle title="اكتشف عالم الذهب" />
        </div>
        <div className="text-center text-red-500">
          فشل في تحميل المدونات. يرجى المحاولة لاحقًا.
        </div>
      </section>
    );
  }

  const blogs = apiBlogs?.map(transformApiBlogToBlogItem) || [];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <AnimatedUnderlineTitle title="اكتشف عالم الذهب" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            imageSrc={blog.imageSrc}
            title={blog.title}
            description={blog.description}
            date={blog.date}
            slug={blog.slug}
          />
        ))}
      </div>
    </section>
  );
}
