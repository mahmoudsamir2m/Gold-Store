"use client";

import { AnimatedUnderlineTitleProps } from "./types/AnimatedUnderlineTitleProps";

export default function AnimatedUnderlineTitle({
  title,
}: AnimatedUnderlineTitleProps) {
  return (
    <h2 className="relative text-3xl md:text-4xl font-bold text-center text-gray-900 inline-block group mx-auto">
      {title}
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-primary-600 w-40 scale-x-100 group-hover:scale-x-200 transition-transform duration-500"></span>
    </h2>
  );
}
