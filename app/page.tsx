// app/page.tsx
import PricesTicker from "./_components/Home/PricesTicker/PricesTicker";
import AboutSection from "./_components/Home/AboutSection/AboutSection";
import BlogSection from "./_components/Home/BlogSection/BlogSection";
import CategoriesSection from "./_components/Home/CategoriesSection/CategoriesSection";
import HeroSection from "./_components/Home/HeroSection/HeroSection";
import ProductsSection from "./_components/Home/ProductsSection/ProductsSection";

// ✅ عرّف دالة جلب الأسعار هنا (أو استوردها من ملف منفصل)
async function fetchMetalPrices() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/metalsPrices`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("فشل جلب الأسعار");
    const data = await res.json();

    // تأكد أن البيانات صحيحة
    if (typeof data.gold === "number" && typeof data.silver === "number") {
      return data;
    } else {
      throw new Error("بيانات غير صالحة");
    }
  } catch (error) {
    console.warn("استخدام أسعار افتراضية:", error);
    return { gold: 2000, silver: 25 };
  }
}

export default async function Home() {
  const prices = await fetchMetalPrices(); // ✅ الآن معرّفة

  return (
    <main>
      <PricesTicker prices={prices} />
      <HeroSection />
      <ProductsSection />
      <AboutSection
        title="إتقان فن الذهب"
        description="نصنع مجوهرات ذهبية خالدة بالدقة والشغف والحرفية التي تتوارثها الأجيال."
        link="/about"
        buttonText="المزيد عنا"
        imageSrc=""
      />
      {/* <CategoriesSection /> */}
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
