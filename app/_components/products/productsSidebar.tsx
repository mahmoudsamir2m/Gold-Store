"use client";

import { useState } from "react";

interface Props {
  filters: {
    metal: "gold" | "silver" | "";
    karat: string;
    type: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
  };
  onFilterChange: React.Dispatch<
    React.SetStateAction<{
      metal: "gold" | "silver" | "";
      karat: string;
      type: string;
      minPrice: number;
      maxPrice: number;
      rating: number;
    }>
  >;
}

export default function ProductsSidebar({ filters, onFilterChange }: Props) {
  const [openSections, setOpenSections] = useState({
    metal: true,
    karat: false,
    type: false,
    price: false,
    rating: false,
  });

  type SectionKey = keyof typeof openSections;

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // خيارات العيار حسب المعدن
  const karatOptions =
    filters.metal === "silver"
      ? [
          { value: "925", label: "925" },
          { value: "950", label: "950" },
        ]
      : [
          { value: "24", label: "24 عيار" },
          { value: "21", label: "21 عيار" },
          { value: "18", label: "18 عيار" },
        ];
        // خيارات النوع
const typeLabels: Record<string, string> = {
  Rings: "خواتم",
  Necklaces: "سلاسل",
  Bracelets: "أساور",
  Earrings: "أقراط",
};
  return (
    <div className="w-full bg-white rounded-lg p-4 text-sm space-y-4 rtl border max-h-screen overflow-y-auto">
      {/* قسم المعادن */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">المعادن</h3>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onFilterChange({ ...filters, metal: "", karat: "" })}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
              filters.metal === ""
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            الكل
          </button>
          <button
            onClick={() =>
              onFilterChange({ ...filters, metal: "gold", karat: "" })
            }
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
              filters.metal === "gold"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            ذهب
          </button>
          <button
            onClick={() =>
              onFilterChange({ ...filters, metal: "silver", karat: "" })
            }
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
              filters.metal === "silver"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            فضة
          </button>
        </div>
      </div>

      {/* قسم العيار */}
      <div>
        <button
          onClick={() => toggleSection("karat")}
          className="flex justify-between w-full font-semibold text-gray-800 py-2"
        >
          <span>العيار</span>
          <span>{openSections.karat ? "−" : "+"}</span>
        </button>
        {openSections.karat && (
          <div className="space-y-2 pr-2 mt-2">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="radio"
                name="karat"
                checked={filters.karat === ""}
                onChange={() => onFilterChange({ ...filters, karat: "" })}
                className="w-4 h-4 me-1.5"
              />
              <span className="text-gray-700">الكل</span>
            </label>
            {karatOptions.map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <input
                  type="radio"
                  name="karat"
                  checked={filters.karat === value}
                  onChange={() => onFilterChange({ ...filters, karat: value })}
                  className="w-4 h-4 me-1.5"
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* قسم النوع */}
      <div>
        <button
          onClick={() => toggleSection("type")}
          className="flex justify-between w-full font-semibold text-gray-800 py-2"
        >
          <span>النوع</span>
          <span>{openSections.type ? "−" : "+"}</span>
        </button>
        {openSections.type && (
          <div className="space-y-2 pr-2 mt-2">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="radio"
                name="type"
                checked={filters.type === ""}
                onChange={() => onFilterChange({ ...filters, type: "" })}
                className="w-4 h-4 me-1.5"
              />
              <span className="text-gray-700">الكل</span>
            </label>
            {["Rings", "Necklaces", "Bracelets", "Earrings"].map((t) => (
              <label
                key={t}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <input
                  type="radio"
                  name="type"
                  checked={filters.type === t}
                  onChange={() => onFilterChange({ ...filters, type: t })}
                  className="w-4 h-4 me-1.5"
                />
                <span className="text-gray-700">{typeLabels[t]}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* قسم السعر */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between w-full font-semibold text-gray-800 py-2"
        >
          <span>السعر ($)</span>
          <span>{openSections.price ? "−" : "+"}</span>
        </button>
        {openSections.price && (
          <div className="space-y-3 pr-2 mt-2">
            <div className="flex space-x-2 space-x-reverse gap-2">
              <input
                type="number"
                placeholder="من"
                value={filters.minPrice}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    minPrice: parseInt(e.target.value) || 0,
                  })
                }
                className="h-8 w-1/2 text-xs border-gray-300 rounded px-2"
              />
              <input
                type="number"
                placeholder="إلى"
                value={filters.maxPrice}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    maxPrice: parseInt(e.target.value) || 5000,
                  })
                }
                className="h-8 w-1/2 text-xs border-gray-300 rounded px-2"
              />
            </div>
          </div>
        )}
      </div>

      {/* قسم التقييم (اختياري، ممكن تفعيله) */}
      {/* <div>
        <button
          onClick={() => toggleSection("rating")}
          className="flex justify-between w-full font-semibold text-gray-800 py-2"
        >
          <span>التقييم</span>
          <span>{openSections.rating ? "−" : "+"}</span>
        </button>
        {openSections.rating && (
          <div className="pr-2 mt-2">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.rating}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  rating: parseFloat(e.target.value),
                })
              }
              className="w-full accent-yellow-500"
            />
            <p className="text-xs text-gray-600 mt-1">
              من ⭐️ {filters.rating > 0 ? filters.rating.toFixed(1) : "أي تقييم"}
            </p>
          </div>
        )}
      </div> */}
    </div>
  );
}
