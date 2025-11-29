"use client";

import ReusableSliderSection, {
  SwiperSlide,
} from "../../ReusableSlider/ReusableSlider";
import CategoryCard from "./CategoryCard";
import { categories } from "./data/data";



export default function CategoriesSection() {
  return (
    <ReusableSliderSection title="الأقسام">
      {categories.map((cat, i) => (
        <SwiperSlide key={i}>
          <CategoryCard title={cat.title} image={cat.image} />
        </SwiperSlide>
      ))}
    </ReusableSliderSection>
  );
}
