"use client";

import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useRouter } from "next/navigation";

const countries = [
  { code: "SA", name: "السعودية", flag: "🇸🇦" },
  { code: "AE", name: "الإمارات", flag: "🇦🇪" },
  { code: "EG", name: "مصر", flag: "🇪🇬" },
  { code: "JO", name: "الأردن", flag: "🇯🇴" },
  { code: "QA", name: "قطر", flag: "🇶🇦" },
];

export default function CountrySelector() {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const router = useRouter();

  const handleSelectCountry = (countryCode: string) => {
    console.log(`تم اختيار الدولة: ${countryCode}`);
    setIsCountryOpen(false);
  };

  return (
    <div className="relative">
      {" "}
      {/* هذه الحاوية هي المفتاح */}
      <button
        onClick={() => setIsCountryOpen(!isCountryOpen)}
        className="
          flex items-center gap-1 
          bg-gray-800 
          px-2 md:px-3 lg:px-4 xl:px-5 
          py-1 md:py-2 
          rounded-md 
          hover:bg-gray-700 
          transition 
          text-xs md:text-sm lg:text-base xl:text-lg
        "
        aria-haspopup="true"
        aria-expanded={isCountryOpen}
      >
        <FaGlobe className="text-base lg:text-lg xl:text-lg" />
        <span>اختر دولة</span>
      </button>
      {isCountryOpen && (
        <div
          className="
            absolute left-0 top-full mt-1  /* يبدأ من أسفل الزر */
            w-36 md:w-40 
            bg-white text-black 
            rounded-md shadow-lg z-50 
            max-h-60 overflow-y-auto 
            border
            min-w-max
            whitespace-nowrap  /* يمنع كسر السطور */
          "
        >
          {countries.map((country) => (
            <button
              key={country.code}
              className="
                w-full text-right 
                px-3 py-2 
                hover:bg-gray-100 
                flex items-center justify-between gap-2 
                text-sm
              "
              onClick={() => handleSelectCountry(country.code)}
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
              <span className="text-xs opacity-70">{country.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
