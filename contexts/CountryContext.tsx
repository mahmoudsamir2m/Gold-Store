"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Country = "saudi" | "uae" | "egypt" | "all";

interface CountryContextType {
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<Country>("all");

  useEffect(() => {
    const saved = localStorage.getItem("selectedCountry") as Country;
    if (saved) setSelectedCountry(saved);
  }, []);

  const handleSetCountry = (country: Country) => {
    setSelectedCountry(country);
    localStorage.setItem("selectedCountry", country);
  };

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry: handleSetCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) throw new Error("useCountry must be used within CountryProvider");
  return context;
}
