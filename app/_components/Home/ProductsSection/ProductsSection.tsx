"use client";

import { useQuery } from "@tanstack/react-query";
import ReusableSliderSection, {
  SwiperSlide,
} from "../../ReusableSlider/ReusableSlider";
import Card from "../../card/Card";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

type Product = {
  id: number;
  title: string;
  images: string[];
  rating: number;
  karat?: string;
  weight?: number;
};

export default function ProductsSection() {
  const { data: products = [], isLoading: loading } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const res = await fetch("/api/products?per_page=8");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return data.products || [];
    },
  });

  return (
    <ReusableSliderSection title="اعلانات مختارة" link="/products">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))
        : products.map((product: Product) => (
            <SwiperSlide key={product.id}>
              <Card
                id={product.id}
                images={product.images}
                title={product.title}
                rating={product.rating}
                karat={product.karat}
                width="w-82"
                weight={product.weight}
              />
            </SwiperSlide>
          ))}
    </ReusableSliderSection>
  );
}
