
import AboutSection from "./_components/Home/AboutSection/AboutSection";
import BlogSection from "./_components/Home/BlogSection/BlogSection";
import CategoriesSection from "./_components/Home/CategoriesSection/CategoriesSection";
import HeroSection from "./_components/Home/HeroSection/HeroSection";
import ProductsSection from "./_components/Home/ProductsSection/ProductsSection";

export default function Home() {
  return (
    <main>
      <div className="bg-gray-800 hidden lg:block  lg:text-xs xl:text-sm">
        <div className="container mx-auto flex justify-between items-center px-12 py-4 text-white font-semibold">
          <div className=" flex gap-10 justify-center items-center">
            <h3>سعر الدهب عيار24 : ج6000</h3>
            <h3>سعر الدهب عيار21 : ج5000</h3>
            <h3>سعر الدهب عيار18 : ج4000</h3>
          </div>
          <div className=" flex gap-10 justify-center items-center">
            <h3>سعر الفضة عيار911 : ج600</h3>
            <h3>سعر الفضة عيار921 : ج500</h3>
            <h3>سعر الفضة عيار918 : ج400</h3>
          </div>
        </div>
      </div>
      <HeroSection />
      <ProductsSection />
      <AboutSection
        title="إتقان فن الذهب"
        description="نصنع مجوهرات ذهبية خالدة بالدقة والشغف والحرفية التي تتوارثها الأجيال."
        link="/about"
        buttonText="المزيد عنا"
        imageSrc=""
      />
      <CategoriesSection />
      <AboutSection
        title="استثمر في الفخامة... واربح المفاجأة!"
        description="مع كل شراء ذهب، افتح بابًا لفرصة فريدة للفوز بهدية استثنائية تليق بذوقك الرفيع."
        link="/products"
        buttonText="عرض المنتجات"
        imageSrc="/Golden-shopping-cart.png"
      />
      <BlogSection />
    </main>
  );
}