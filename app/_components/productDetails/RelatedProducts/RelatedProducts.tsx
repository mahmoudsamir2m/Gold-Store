// app/_components/productDetails/RelatedProducts/RelatedProducts.tsx
"use client";

import { useEffect, useState } from "react";
import ReusableSliderSection, {
  SwiperSlide,
} from "../../ReusableSlider/ReusableSlider";
import Card from "../../card/Card";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  weight?: number;
}

interface RelatedProductsProps {
  currentProductId: number;
  currentCategory: string;
}

export default function RelatedProducts({
  currentProductId,
  currentCategory,
}: RelatedProductsProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `/api/products?category=${encodeURIComponent(
            currentCategory
          )}&per_page=8`
        );
        if (res.ok) {
          const data = await res.json();
          const filtered = (data.products || []).filter(
            (p: Product) => p.id !== currentProductId
          );
          setRelatedProducts(filtered.slice(0, 8));
        }
      } catch (error) {
        console.error("فشل جلب المنتجات المرتبطة:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentCategory) fetchRelated();
  }, [currentProductId, currentCategory]);

  if (loading || relatedProducts.length === 0) return null;

  return (
    <ReusableSliderSection title="منتجات ذات صلة" link="/all-products">
      {relatedProducts.map((product) => (
        <SwiperSlide key={product.id}>
          <Card
            id={product.id}
            images={product.images}
            title={product.title}
            rating={product.rating}
            price={product.price}
            originalPrice={product.originalPrice}
            weight={product.weight}
            width="w-70 lg:w-60"
          />
        </SwiperSlide>
      ))}
    </ReusableSliderSection>
  );
}
