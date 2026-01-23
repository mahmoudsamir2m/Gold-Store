// app/page.tsx
import PricesTicker from "./_components/Home/PricesTicker/PricesTicker";
import AboutSection from "./_components/Home/AboutSection/AboutSection";
import BlogSection from "./_components/Home/BlogSection/BlogSection";
import CategoriesSection from "./_components/Home/CategoriesSection/CategoriesSection";
import HeroSection from "./_components/Home/HeroSection/HeroSection";
import ProductsSection from "./_components/Home/ProductsSection/ProductsSection";

export default function Home() {
  return (
    <main>
      <PricesTicker />
      <HeroSection />
      <ProductsSection />
      <AboutSection
        title="إتقان فن الذهب"
        description="نصنع مجوهرات ذهبية خالدة بالدقة والشغف والحرفية التي تتوارثها الأجيال."
        link="https://www.facebook.com/share/17PdGTGvxB/"
        buttonText="تباعنا علي فيسبوك"
        imageSrc=""
      />
      {/* <CategoriesSection /> */}
      <AboutSection
        title="استثمر في الفخامة... واربح المفاجأة!"
        description="مع كل شراء ذهب، افتح بابًا لفرصة فريدة للفوز بهدية استثنائية تليق بذوقك الرفيع."
        link="/products"
        buttonText="عرض الاعلانات"
        imageSrc="/Golden-shopping-cart.png"
      />
      <BlogSection />
    </main>
  );
}
