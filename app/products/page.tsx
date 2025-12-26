"use client";

import { useState, useEffect, useRef } from "react";
import Card from "../_components/card/Card";
import { products as data } from "../_components/Home/ProductsSection/data";
import ProductsSidebar from "../_components/products/productsSidebar";
import { FaFilter } from "react-icons/fa";

// تعريف نوع الفلاتر
interface FilterState {
  metal: "" | "gold" | "silver";
  type: "" | "jewelry" | "bullion";
  karat: string;
  minPrice: number;
  maxPrice: number;
  city: string;
  rating: number;
}

export default function ProductsPage() {
  const [filtered, setFiltered] = useState(data);
  const [filters, setFilters] = useState<FilterState>({
    metal: "",
    karat: "",
    type: "",
    minPrice: 0,
    maxPrice: 5000, // ✅ الرقم 5000 مقبول لأنه من نوع number
    city: "",
    rating: 0,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // إغلاق عند النقر خارج الفلتر
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // إغلاق عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSidebarOpen]);

  // تطبيق الفلاتر
  useEffect(() => {
    let result = data;

    if (filters.metal === "gold") {
      result = result.filter((p) => p.title.includes("دهب"));
    } else if (filters.metal === "silver") {
      result = result.filter((p) => p.title.includes("فضة"));
    }

    if (filters.karat) {
      result = result.filter((p) => p.title.includes(filters.karat));
    }

    if (filters.type) {
      const typeMap: Record<string, string> = {
        Rings: "خاتم",
        Necklaces: "سلسلة",
        Bracelets: "أسورة",
        Earrings: "حلق",
      };
      result = result.filter((p) => p.category === typeMap[filters.type]);
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    setFiltered(result);
  }, [filters]);

  return (
    <main dir="rtl" className="container mx-auto px-6 py-8 relative">
      {/* زر فلترة في الموبايل فقط */}
      <div className="flex lg:hidden mb-6">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow text-sm font-medium hover:bg-yellow-600 transition"
        >
          <FaFilter /> تصفية المنتجات
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Drawer الفلاتر - يظهر فقط في الموبايل */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-0 z-50 lg:hidden`}
        >
          {/* الخلفية الشفافة */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* لوحة الفلاتر - تنزلق من اليمين */}
          <div
            ref={sidebarRef}
            className="absolute right-0 top-0 bottom-0 w-72 bg-white p-4 rtl border-l-4 border-yellow-500"
            style={{
              transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.3s ease-in-out",
              boxShadow: "0 20px 40px rgba(234, 179, 8, 0.15)",
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">الفلاتر</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-xl transition"
              >
                &times;
              </button>
            </div>

            <ProductsSidebar filters={filters} onFilterChange={setFilters} />

            <button
              onClick={() =>
                setFilters({
                  metal: "",
                  karat: "",
                  type: "",
                  minPrice: 0,
                  maxPrice: 5000,
                  city: "",
                  rating: 0,
                })
              }
              className="w-full mt-6 text-xs text-yellow-600 underline font-medium hover:text-yellow-800 transition"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        </div>

        {/* Sidebar كبير - للشاشات الكبيرة فقط */}
        <div className="hidden lg:block shrink-0 w-72">
          <ProductsSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* عرض المنتجات */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M12 8v8m0 0l-4-4m4 4l4-4"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-700">
                المنتج غير متوفر حاليًا
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                جرب تعديل الفلاتر أو اختر خيارات مختلفة.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  images={product.images}
                  title={product.title}
                  rating={product.rating}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  width="w-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
