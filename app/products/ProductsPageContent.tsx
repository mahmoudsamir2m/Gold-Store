"use client";

import { useEffect, useState } from "react";
import Card from "../_components/card/Card";
import ProductsSidebar from "../_components/products/productsSidebar";
import { FaFilter } from "react-icons/fa";
import { useCountry } from "@/contexts/CountryContext";
import { useSearchParams } from "next/navigation";

interface FilterState {
  metal: "" | "gold" | "silver";
  type: "" | "jewelry" | "bullion";
  karat: string;
  minPrice: number | "";
  maxPrice: number | "";
  city: string;
  rating: number;
  search: string;
}

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[];
  label?: string;
  country?: string;
  weight?: number;
}

const ITEMS_PER_PAGE = 8;

export default function ProductsPageContent() {
  const { selectedCountry } = useCountry();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    metal: "",
    karat: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    city: "",
    rating: 0,
    search: searchParams.get("search") || "",
  });

  /* ================== API CALL ================== */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: ITEMS_PER_PAGE.toString(),
      });

      if (filters.metal) params.set("metal", filters.metal);
      if (filters.karat) params.set("karat", filters.karat);
      if (filters.type) params.set("product_type", filters.type);
      if (typeof filters.minPrice === "number" && filters.minPrice > 0)
        params.set("min_price", filters.minPrice.toString());
      if (typeof filters.maxPrice === "number" && filters.maxPrice > 0)
        params.set("max_price", filters.maxPrice.toString());
      if (filters.city) params.set("city", filters.city);
      if (filters.search) params.set("search", filters.search);

      if (selectedCountry !== "all") {
        params.set("country", selectedCountry);
      }

      const res = await fetch(`/api/products?${params.toString()}`, {
        cache: "no-store",
      });

      const data = await res.json();

      setProducts(data.products || []);
      setTotal(data.total || 0);
      setLoading(false);
    };

    fetchProducts();
  }, [filters, currentPage, selectedCountry]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <main dir="rtl" className="container mx-auto px-6 py-8">
      {/* زرار الفلاتر للموبايل */}
      <div className="flex lg:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          <FaFilter /> تصفية المنتجات
        </button>
      </div>

      {/* ===== Mobile Filters Drawer ===== */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">تصفية المنتجات</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-red-600 text-lg"
              >
                ✕
              </button>
            </div>

            <ProductsSidebar filters={filters} onFilterChange={setFilters} />

            <button
              onClick={() => setShowMobileFilters(false)}
              className="mt-4 w-full bg-yellow-500 text-white py-2 rounded"
            >
              تطبيق الفلاتر
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar للـ Desktop */}
        <div className="hidden lg:block w-72 shrink-0">
          <ProductsSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="flex-1">
          {filters.search && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-sm">نتائج البحث عن: </span>
              <span className="font-bold">&ldquo;{filters.search}&rdquo;</span>
              <button
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                className="mr-2 text-xs text-red-600 hover:underline"
              >
                إلغاء
              </button>
            </div>
          )}

          {loading ? (
            <p className="text-center py-10">جاري التحميل...</p>
          ) : products.length === 0 ? (
            <p className="text-center py-10 text-gray-500">لا توجد منتجات</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} {...product} width="w-full" />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === i + 1 ? "bg-yellow-500 text-white" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
