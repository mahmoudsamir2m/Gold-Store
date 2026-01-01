"use client";

import "./prices-ticker.css";
import { useCountry } from "@/contexts/CountryContext";
import { useEffect, useState } from "react";

export default function PricesTicker() {
  const { selectedCountry } = useCountry();
  const [prices, setPrices] = useState({ gold: 2000, silver: 25 });
  const [currency, setCurrency] = useState("ج");

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prices/formatted?country=${selectedCountry}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        
        if (data.gold?.spotPricePerGram) {
          setPrices({
            gold: data.gold.spotPricePerGram,
            silver: data.silver?.spotPricePerGram || 25
          });
          setCurrency(data.currencySymbol || "ج");
        }
      } catch {
        setPrices({ gold: 2000, silver: 25 });
      }
    }
    fetchPrices();
  }, [selectedCountry]);

  const gold24 = Math.round(prices.gold);
  const gold21 = Math.round(gold24 * 0.875);
  const gold18 = Math.round(gold24 * 0.75);
  const silver999 = Math.round(prices.silver);
  const silver925 = Math.round(silver999 * 0.925);
  const silver900 = Math.round(silver999 * 0.9);
  const silver800 = Math.round(silver999 * 0.8);

  const TickerContent = () => (
    <>
      <div className="flex items-center whitespace-nowrap">
        <span className="mx-4 md:mx-8 text-yellow-500">
          ✨ استثمر في الذهب.. قيمة بتزيد مع الوقت
        </span>
        <span className="mx-4 md:mx-8">
          الذهب 24: <span className="text-yellow-500">{currency}{gold24}</span>
        </span>
        <span className="mx-4 md:mx-8">
          21: <span className="text-yellow-500">{currency}{gold21}</span>
        </span>
        <span className="mx-4 md:mx-8">
          18: <span className="text-yellow-500">{currency}{gold18}</span>
        </span>
      </div>
      <span className="mx-8 text-gray-500">|</span>
      <div className="flex items-center whitespace-nowrap">
        <span className="mx-4 md:mx-8 text-gray-300">
          ⚪ الفضة اختيار ذكي للأناقة والاستثمار
        </span>
        <span className="mx-4 md:mx-8">
          999: <span className="text-gray-300">{currency}{silver999}</span>
        </span>
        <span className="mx-4 md:mx-8">
          925: <span className="text-gray-300">{currency}{silver925}</span>
        </span>
        <span className="mx-4 md:mx-8">
          900: <span className="text-gray-300">{currency}{silver900}</span>
        </span>
        <span className="mx-4 md:mx-8">
          800: <span className="text-gray-300">{currency}{silver800}</span>
        </span>
      </div>
    </>
  );

  return (
    <div className="prices-ticker bg-gray-900 hidden lg:block overflow-hidden">
      <div className="ticker-track text-white text-sm md:text-base font-semibold py-4">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  );
}
