import Image from "next/image";
import Link from "next/link";
import SubHero from "./SubHero/SubHero";

export default function HeroSection() {
  return (
    <section className="relative bg-[#0D0D1A] pt-12 md:pt-20 lg:pt-28 pb-40 md:pb-48 lg:pb-56 overflow-visible mb-50 md:mb-55 lg:mb-80">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-0 left-0 w-1/2 h-0.5 bg-primary-500 transform -rotate-12"></div>
          <div className="absolute top-1/3 left-0 w-full h-0.5 bg-primary-500 transform rotate-12"></div>
          <div className="absolute top-2/3 left-0 w-full h-0.5 bg-primary-500 transform -rotate-6"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-0.5 bg-primary-500 transform rotate-12"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative w-40 h-40 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary-500 shadow-2xl">
            <Image
              src="/gold-jewelry-circle.png"
              alt="مجوهرات ذهبية"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          ذهب فاخر.. لمعان يدوم للأبد
        </h1>

        <p className="text-gray-300 text-md md:text-lg max-w-2xl mx-auto mb-8">
          اكتشف أحدث تشكيلات المجوهرات الذهبية المصممة بأعلى درجات الأناقة
          والجمال.
        </p>

        <Link
          href="/products"
          className="bg-primary-500 hover:bg-primary-600 text-black font-bold py-3 px-8 rounded-lg transition-colors text-lg"
        >
          تسوّق الآن
        </Link>
      </div>
      <div className="absolute left-1/2 -bottom-10 lg:-bottom-20 xl:-bottom-25 translate-y-1/2 -translate-x-1/2 w-full max-w-7xl z-10 px-4">
        <SubHero />
      </div>
    </section>
  );
}
