"use client";

import ReusableSliderSection, {
  SwiperSlide,
} from "../../ReusableSlider/ReusableSlider";
import Card from "../../card/Card";
import { products } from "../../Home/ProductsSection/data";

interface RelatedProductsProps {
  currentProductId: number;
  currentCategory: string;
}

export default function RelatedProducts({
  currentProductId,
  currentCategory,
}: RelatedProductsProps) {
  // تصفية المنتجات حسب نفس الفئة واستبعاد المنتج الحالي
  const relatedProducts = products
    .filter((p) => p.id !== currentProductId && p.category === currentCategory)
    .slice(0, 8); // نعرض 8 منتجات فقط

  if (relatedProducts.length === 0) return null;

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
            width="w-70 lg:w-60"
          />
        </SwiperSlide>
      ))}
    </ReusableSliderSection>
  );
}
