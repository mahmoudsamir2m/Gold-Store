"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface Filters {
  metal: "" | "gold" | "silver";
  type: "" | "jewelry" | "bullion";
  karat: string;
  minPrice: number | "";
  maxPrice: number | "";
  city: string;
  rating: number;
  search: string;
}

interface Props {
  filters: Filters;
  onFilterChange: React.Dispatch<React.SetStateAction<Filters>>;
  userCountry?: string;
  isSearching: boolean;
}

interface MetalButton {
  v: "" | "gold" | "silver";
  l: string;
}

export default function ProductsSidebar({
  filters,
  onFilterChange,
  userCountry,
  isSearching,
}: Props) {
  const [openSections, setOpenSections] = useState({
    metal: true,
    type: true,
    karat: true,
    price: false,
    city: false,
  });

  const [searchInput, setSearchInput] = useState("");

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSearchClick = () => {
    if (isSearching) return;
    onFilterChange((prev) => ({ ...prev, search: searchInput }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isSearching) return;

    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  /* ===== العيارات ===== */
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

  /* ===== سبائك = 24 تلقائي ===== */
  useEffect(() => {
    if (filters.type === "bullion") {
      onFilterChange((prev) => ({ ...prev, karat: "24" }));
    }
  }, [filters.type, onFilterChange]);

  /* ===== المدن ===== */
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

  const country = userCountry || "مصر";
  const cities = citiesByCountry[country] || [];

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border text-sm rtl">
      {/* ===== البحث ===== */}
      <div>
        <h3 className="font-semibold mb-2">البحث</h3>

        <div className="relative flex gap-2">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            className={`flex-1 border rounded h-9 px-2 ${
              isSearching ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isSearching}
          />

          <button
            type="button"
            onClick={handleSearchClick}
            disabled={isSearching}
            className={`text-white px-3 rounded transition ${
              isSearching
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {isSearching ? "..." : <FaSearch />}
          </button>
        </div>
      </div>

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
              disabled={isSearching}
              className={`flex-1 py-2 rounded transition ${
                filters.metal === b.v
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100"
              } ${isSearching ? "opacity-60 cursor-not-allowed" : ""}`}
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
                disabled={isSearching}
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
                disabled={isSearching}
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
                  disabled={isSearching}
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
                  disabled={
                    isSearching ||
                    (filters.type === "bullion" && k.value !== "24")
                  }
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

      {/* ===== المدينة ===== */}
      <div>
        <h3 className="font-semibold mb-2">المدينة</h3>

        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن مدينة..."
            className={`w-full border rounded h-9 px-2 ${
              isSearching ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            value={filters.city}
            disabled={isSearching}
            onChange={(e) =>
              onFilterChange((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
