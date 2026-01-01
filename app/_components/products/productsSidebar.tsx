"use client";

import { useState, useEffect } from "react";

interface Filters {
  metal: "" | "gold" | "silver";
  type: "" | "jewelry" | "bullion";
  karat: string;
  minPrice: number;
  maxPrice: number;
  city: string;
  rating: number;
}

interface Props {
  filters: Filters;
  onFilterChange: React.Dispatch<React.SetStateAction<Filters>>;
  userCountry?: string;
}

interface MetalButton {
  v: "" | "gold" | "silver";
  l: string;
}

export default function ProductsSidebar({
  filters,
  onFilterChange,
  userCountry,
}: Props) {
  const [openSections, setOpenSections] = useState({
    metal: true,
    type: true,
    karat: true,
    price: false,
    city: false,
  });

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // ===== العيارات =====
  const goldKarats = [
    { value: "24", label: "24 عيار" },
    { value: "22", label: "22 عيار" },
    { value: "21", label: "21 عيار" },
    { value: "18", label: "18 عيار" },
  ];
  const silverKarats = [
    { value: "925", label: "925" },
    { value: "900", label: "900" },
    { value: "800", label: "800" },
  ];

  let karatOptions: { value: string; label: string }[] = [];
  if (filters.metal === "gold") karatOptions = goldKarats;
  else if (filters.metal === "silver") karatOptions = silverKarats;
  else karatOptions = [...goldKarats, ...silverKarats];

  // ===== سبائك = 24 تلقائي =====
  useEffect(() => {
    if (filters.type === "bullion") {
      onFilterChange((prev) => ({ ...prev, karat: "24" }));
    }
  }, [filters.type, onFilterChange]);

  // ===== المدن حسب الدولة =====
  const citiesByCountry: Record<string, string[]> = {
    مصر: [
      "القاهرة",
      "الجيزة",
      "الاسكندرية",
      "الشرقية",
      "الدقهلية",
      "المنوفية",
      "سوهاج",
      "أسيوط",
      "الفيوم",
      "بني سويف",
      "الاقصر",
      "اسوان",
      "السويس",
    ],
    السعودية: [
      "الرياض",
      "جدة",
      "مكة",
      "المدينة",
      "الدمام",
      "الهفوف",
      "تبوك",
      "خميس مشيط",
      "أبها",
    ],
    الإمارات: [
      "دبي",
      "ابوظبي",
      "الشارقة",
      "العين",
      "رأس الخيمة",
      "الفجيرة",
      "عجمان",
      "أم القيوين",
    ],
  };

  // لو userCountry مش موجود نعرض مصر تلقائي
  const country = userCountry || "مصر";
  const cities = citiesByCountry[country] || [];

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border text-sm rtl min-h-fit">
      {/* ===== المعدن ===== */}
      <div>
        <h3 className="font-semibold mb-2">المعدن</h3>
        <div className="flex gap-2">
          {(
            [
              { v: "", l: "الكل" },
              { v: "gold", l: "ذهب" },
              { v: "silver", l: "فضة" },
            ] as MetalButton[]
          ).map((b) => (
            <button
              key={b.v}
              onClick={() =>
                onFilterChange({ ...filters, metal: b.v, karat: "" })
              }
              className={`flex-1 py-2 rounded ${
                filters.metal === b.v
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              {b.l}
            </button>
          ))}
        </div>
      </div>

      {/* ===== النوع ===== */}
      <div>
        <button
          onClick={() => toggleSection("type")}
          className="flex justify-between w-full font-semibold py-2"
        >
          <span>النوع</span>
          <span>{openSections.type ? "−" : "+"}</span>
        </button>
        {openSections.type && (
          <div className="space-y-2 pr-2">
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                checked={filters.type === "jewelry"}
                onChange={() =>
                  onFilterChange({ ...filters, type: "jewelry", karat: "" })
                }
                className="accent-yellow-500"
              />
              مشغولات
            </label>
            <label className="flex gap-2 items-center">
              <input
                type="radio"
                checked={filters.type === "bullion"}
                onChange={() => onFilterChange({ ...filters, type: "bullion" })}
                className="accent-yellow-500"
              />
              سبائك وعملات
            </label>
          </div>
        )}
      </div>

      {/* ===== العيار ===== */}
      <div>
        <button
          onClick={() => toggleSection("karat")}
          className="flex justify-between w-full font-semibold py-2"
        >
          <span>العيار</span>
          <span>{openSections.karat ? "−" : "+"}</span>
        </button>
        {openSections.karat && (
          <div className="space-y-2 pr-2">
            {filters.type !== "bullion" && (
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={filters.karat === ""}
                  onChange={() => onFilterChange({ ...filters, karat: "" })}
                  className="accent-yellow-500"
                />
                الكل
              </label>
            )}
            {karatOptions.map((k) => (
              <label key={k.value} className="flex gap-2 items-center">
                <input
                  type="radio"
                  checked={filters.karat === k.value}
                  disabled={filters.type === "bullion" && k.value !== "24"}
                  onChange={() =>
                    onFilterChange({ ...filters, karat: k.value })
                  }
                  className="accent-yellow-500"
                />
                {k.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ===== السعر ===== */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between w-full font-semibold py-2"
        >
          <span>السعر</span>
          <span>{openSections.price ? "−" : "+"}</span>
        </button>
        {openSections.price && (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="من"
                className="w-1/2 border px-2 h-8 rounded"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  onFilterChange({ ...filters, minPrice: +e.target.value || 0 })
                }
              />
              <input
                type="number"
                placeholder="إلى"
                className="w-1/2 border px-2 h-8 rounded"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  onFilterChange({ ...filters, maxPrice: +e.target.value || 0 })
                }
              />
            </div>
            <button
              onClick={() => onFilterChange({ ...filters, minPrice: 0, maxPrice: 0 })}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              إعادة تعيين
            </button>
          </div>
        )}
      </div>

      {/* ===== المدينة ===== */}
      <div>
        <h3 className="font-semibold mb-2">المدينة</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن مدينة..."
            className="w-full border rounded h-9 px-2 bg-white"
            value={filters.city || ""}
            onChange={(e) => {
              onFilterChange((prev) => ({ ...prev, city: e.target.value }));
            }}
            onFocus={() => setOpenSections((prev) => ({ ...prev, city: true }))}
            onBlur={(e) => {
              setTimeout(() => {
                const selectedCity = cities.find((c) => c === filters.city);
                if (!selectedCity && (filters.city || "").trim() !== "") {
                  onFilterChange((prev) => ({ ...prev, city: "" }));
                }
                setOpenSections((prev) => ({ ...prev, city: false }));
              }, 200);
            }}
          />

          {openSections.city && (
            <ul className="absolute top-full left-0 right-0 bg-white border rounded shadow-lg z-10">
              <li
                onClick={() => {
                  onFilterChange({ ...filters, city: "" });
                  setOpenSections((prev) => ({ ...prev, city: false }));
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-yellow-50 ${
                  !filters.city ? "bg-yellow-100" : ""
                }`}
              >
                الكل
              </li>

              {cities
                .filter((city) => {
                  const searchTerm = (filters.city || "").trim().toLowerCase();
                  return (
                    searchTerm === "" || city.toLowerCase().includes(searchTerm)
                  );
                })
                .map((city) => (
                  <li
                    key={city}
                    onClick={() => {
                      onFilterChange({ ...filters, city });
                      setOpenSections((prev) => ({ ...prev, city: false }));
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-yellow-50 ${
                      filters.city === city ? "bg-yellow-100" : ""
                    }`}
                  >
                    {city}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
