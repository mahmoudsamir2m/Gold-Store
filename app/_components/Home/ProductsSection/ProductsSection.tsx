"use client";

import { useEffect, useState } from "react";
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
  price: number;
  originalPrice?: number;
};

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?per_page=8", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ReusableSliderSection title="منتجات مختارة" link="/all-products">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))
        : products.map((product) => (
            <SwiperSlide key={product.id}>
              <Card
                id={product.id}
                images={product.images}
                title={product.title}
                rating={product.rating}
                price={product.price}
                originalPrice={product.originalPrice}
                width="w-82"
              />
            </SwiperSlide>
          ))}
    </ReusableSliderSection>
  );
}
