import Image from "next/image";
import { Props } from "./types/Props";
import Link from "next/link";

export default function CategoryCard({ title, image }: Props) {
  return (
    <Link
      href={`/products`}
      className="relative block rounded-2xl overflow-hidden shadow-lg group"
    >
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={300}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Overlay text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <h3 className="text-white font-semibold text-2xl text-center w-full pb-4">
          {title}
        </h3>
      </div>
    </Link>
  );
}
