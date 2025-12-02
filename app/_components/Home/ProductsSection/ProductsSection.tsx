"use client";

import ReusableSliderSection, { SwiperSlide } from "../../ReusableSlider/ReusableSlider";
import Card from "../../card/Card";
import { products } from "./data";

export default function ProductsSection() {
  return (
    <ReusableSliderSection title="منتجات مختارة" link="/all-products">
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <Card
            id={product.id}
            images={product.images}
            title={product.title}
            rating={product.rating}
            price={product.price}
            originalPrice={product.originalPrice}
            width="w-80"
          />
        </SwiperSlide>
      ))}
    </ReusableSliderSection>
  );
}
