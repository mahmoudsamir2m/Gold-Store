"use client";

import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useCountry } from "@/contexts/CountryContext";

const countries = [
  { code: "all", name: "الكل", flag: "🌍" },
  { code: "saudi", name: "السعودية", flag: "🇸🇦" },
  { code: "uae", name: "الإمارات", flag: "🇦🇪" },
  { code: "egypt", name: "مصر", flag: "🇪🇬" },
];

export default function CountrySelector() {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const { selectedCountry, setSelectedCountry } = useCountry();

  const handleSelectCountry = (countryCode: string) => {
    setSelectedCountry(countryCode as any);
    setIsCountryOpen(false);
  };

  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  return (
    <div className="relative">
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
        <span>{currentCountry.flag} {currentCountry.name}</span>
      </button>
      {isCountryOpen && (
        <div
          className="
            absolute left-0 top-full mt-1
            w-36 md:w-40 
            bg-white text-black 
            rounded-md shadow-lg z-50 
            max-h-60 overflow-y-auto 
            border
            min-w-max
            whitespace-nowrap
          "
        >
          {countries.map((country) => (
            <button
              key={country.code}
              className={`
                w-full text-right 
                px-3 py-2 
                hover:bg-gray-100 
                flex items-center justify-between gap-2 
                text-sm
                ${selectedCountry === country.code ? 'bg-gray-200' : ''}
              `}
              onClick={() => handleSelectCountry(country.code)}
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
