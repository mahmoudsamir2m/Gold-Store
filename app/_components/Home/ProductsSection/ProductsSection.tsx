"use client";

import ReusableSliderSection, { SwiperSlide } from "../../ReusableSlider/ReusableSlider";
import Card from "../../card/Card";
import { products } from "./data";

export default function ProductsSection() {
  return (
    <ReusableSliderSection title="منتجات مختارة" link="/all-products">
      {products.map((product, i) => (
        <SwiperSlide key={i}>
          <Card
            image={product.image}
            title={product.title}
            rating={product.rating}
            price={product.price}
            originalPrice={product.originalPrice}
          />
        </SwiperSlide>
      ))}
    </ReusableSliderSection>
  );
}
