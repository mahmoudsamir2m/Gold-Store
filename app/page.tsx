
import AboutSection from "./_components/Home/AboutSection/AboutSection";
import BlogSection from "./_components/Home/BlogSection/BlogSection";
import CategoriesSection from "./_components/Home/CategoriesSection/CategoriesSection";
import HeroSection from "./_components/Home/HeroSection/HeroSection";
import ProductsSection from "./_components/Home/ProductsSection/ProductsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductsSection />
      <AboutSection
        title="إتقان فن الذهب"
        description="نصنع مجوهرات ذهبية خالدة بالدقة والشغف والحرفية التي تتوارثها الأجيال."
        link="/about"
        buttonText="المزيد عنا"
        imageSrc="/jewelry-store$.png"
      />
      <CategoriesSection />
      <AboutSection
        title="استثمر في الفخامة... واربح المفاجأة!"
        description="مع كل شراء ذهب، افتح بابًا لفرصة فريدة للفوز بهدية استثنائية تليق بذوقك الرفيع."
        link="/products"
        buttonText="عرض المنتجات"
        imageSrc="/Golden-shopping-cart.png"
      />
      <BlogSection/>
    </main>
  );
}