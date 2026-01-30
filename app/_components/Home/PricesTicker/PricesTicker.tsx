"use client";

import "./prices-ticker.css";
import { useCountry } from "@/contexts/CountryContext";
import { useQuery } from "@tanstack/react-query";

export default function PricesTicker() {
  const { selectedCountry } = useCountry();

  const { data: pricesData } = useQuery({
    queryKey: ["prices", selectedCountry],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/prices/formatted?country=${selectedCountry}`,
      );
      if (!res.ok) throw new Error();
      return res.json();
    },
  });

  const goldPrices: any = {};
  const silverPrices: any = {};
  const currency = pricesData?.currencySymbol || "ج";

  if (pricesData?.gold?.purity) {
    pricesData.gold.purity.forEach((item: any) => {
      goldPrices[item.name] = Math.round(item.price);
    });
  }

  if (pricesData?.silver?.purity) {
    pricesData.silver.purity.forEach((item: any) => {
      silverPrices[item.name] = Math.round(item.price);
    });
  }

  const TickerContent = () => (
    <>
      <div className="flex items-center whitespace-nowrap">
        <span className="mx-4 md:mx-8 text-yellow-500">
          ✨ استثمر في الذهب.. قيمة بتزيد مع الوقت
        </span>
        {goldPrices["24K"] && (
          <span className="mx-4 md:mx-8">
            الذهب 24:{" "}
            <span className="text-yellow-500">
              {currency}
              {goldPrices["24K"]}
            </span>
          </span>
        )}
        {goldPrices["21K"] && (
          <span className="mx-4 md:mx-8">
            21:{" "}
            <span className="text-yellow-500">
              {currency}
              {goldPrices["21K"]}
            </span>
          </span>
        )}
        {goldPrices["18K"] && (
          <span className="mx-4 md:mx-8">
            18:{" "}
            <span className="text-yellow-500">
              {currency}
              {goldPrices["18K"]}
            </span>
          </span>
        )}
      </div>
      <span className="mx-8 text-gray-500">|</span>
      <div className="flex items-center whitespace-nowrap">
        <span className="mx-4 md:mx-8 text-gray-300">
          ⚪ الفضة اختيار ذكي للأناقة والاستثمار
        </span>
        {silverPrices["999"] && (
          <span className="mx-4 md:mx-8">
            999:{" "}
            <span className="text-gray-300">
              {currency}
              {silverPrices["999"]}
            </span>
          </span>
        )}
        {silverPrices["925"] && (
          <span className="mx-4 md:mx-8">
            925:{" "}
            <span className="text-gray-300">
              {currency}
              {silverPrices["925"]}
            </span>
          </span>
        )}
        {silverPrices["900"] && (
          <span className="mx-4 md:mx-8">
            900:{" "}
            <span className="text-gray-300">
              {currency}
              {silverPrices["900"]}
            </span>
          </span>
        )}
        {silverPrices["800"] && (
          <span className="mx-4 md:mx-8">
            800:{" "}
            <span className="text-gray-300">
              {currency}
              {silverPrices["800"]}
            </span>
          </span>
        )}
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
