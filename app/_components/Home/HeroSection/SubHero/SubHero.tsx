import Image from "next/image";
import Link from "next/link";

export default function SubHero() {
  return (
    <div className="py-6 md:py-10">
      <div className="container mx-auto px-4">
        {/* MOBILE */}
        <div className="md:hidden">
          <div className="relative  h-70 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Jewellery.webp"
              alt="تألقي بالذهب الخالص"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45 flex flex-col justify-end items-center p-4">
              <h3 className="text-white text-xl font-bold mb-2 text-center">
                تألقي بالذهب الخالص
              </h3>
              <Link
                href="/products"
                className="px-4 py-1.5 border border-white font-bold text-white rounded-lg text-lg hover:bg-white hover:text-black transition"
              >
                تسوق الآن
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <div className="grid grid-cols-3 gap-6 items-stretch">
              {/* Left Square Card */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/gold-left.png"
                  alt="Pure Gold"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/45 flex flex-col justify-end items-center p-6">
                  <h3 className="text-white text-xl font-bold mb-3 text-center">
                    الجمال الخالد و التوهج الذهبي
                  </h3>
                  <Link
                    href="/products"
                    className="px-6 py-2 border border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>

              {/* Middle Stacked Cards */}
              <div className="flex flex-col gap-6">
                {/* Top Card */}
                <div className="relative rounded-xl overflow-hidden h-25 lg:h-32 xl:h-42">
                  <Image
                    src="/gold-top.png"
                    alt="Golden Details"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Bottom Card */}
                <div className="relative rounded-xl overflow-hidden h-25 lg:h-32 xl:h-42">
                  <Image
                    src="/gold-bottom.png"
                    alt="Luxury Gold"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Square Card */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src="/gold-right.png"
                  alt="Golden Glow"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/45 flex flex-col justify-end items-center p-6">
                  <h3 className="text-white text-xl font-bold mb-3 text-center">
                    تألقي بالذهب الخالص
                  </h3>
                  <Link
                    href="/products"
                    className="px-6 py-2 border border-white text-white rounded-lg text-sm hover:bg-white hover:text-black transition"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
