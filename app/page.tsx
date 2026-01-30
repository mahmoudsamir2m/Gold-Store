import PricesTicker from "./_components/Home/PricesTicker/PricesTicker";
import AboutSection from "./_components/Home/AboutSection/AboutSection";
import BlogSection from "./_components/Home/BlogSection/BlogSection";
import CategoriesSection from "./_components/Home/CategoriesSection/CategoriesSection";
import HeroSection from "./_components/Home/HeroSection/HeroSection";
import ProductsSection from "./_components/Home/ProductsSection/ProductsSection";
import { headers } from "next/headers";

type AppContentResponse = {
  success: boolean;
  message: string;
  data: {
    title: string;
    subTitle1: string;
    title2: string;
    subTitle2: string;
    title3: string;
    subTitle3: string;
  } | null;
};

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(new URL("/api/homeTitles", baseUrl), {
    next: { revalidate: 600 }, // Cache for 10 minutes
  });

  const result: AppContentResponse = await res.json();

  // لو API رجّع مشكلة
  if (!result.success || !result.data) {
    return (
      <main>
        <PricesTicker />
        <div className="container mx-auto px-4 py-10 text-center">
          <h2 className="text-xl font-bold"> يوجد مشكلة</h2>
          <p className="mt-2 text-gray-600">{result.message}</p>
        </div>
      </main>
    );
  }

  const content = result.data;

  return (
    <main>
      <PricesTicker />

      <HeroSection title={content.title} description={content.subTitle1} />

      <ProductsSection />

      <AboutSection
        title={content.title2}
        description={content.subTitle2}
        link="/products"
        buttonText="تسوق الان"
        imageSrc=""
      />

      {/* <CategoriesSection /> */}

      <AboutSection
        title={content.title3}
        description={content.subTitle3}
        link="/products"
        buttonText="عرض الاعلانات"
        imageSrc="/Golden-shopping-cart.png"
      />

      <BlogSection />
    </main>
  );
}
