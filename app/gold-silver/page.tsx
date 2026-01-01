"use client";

import { useState, useEffect } from "react";
import { FaCoins, FaGem } from "react-icons/fa";
import { CiCoins1 } from "react-icons/ci";
import { GiGoldBar } from "react-icons/gi";
import { useCountry } from "@/contexts/CountryContext";

export default function GoldSilverPage() {
  const [activeTab, setActiveTab] = useState<"gold" | "silver">("gold");
  const { selectedCountry } = useCountry();
  const [goldData, setGoldData] = useState<any>(null);
  const [silverData, setSilverData] = useState<any>(null);
  const [currency, setCurrency] = useState("$");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prices/formatted?country=${selectedCountry}`);
        const data = await res.json();
        
        if (data.success) {
          setGoldData(data.gold);
          setSilverData(data.silver);
          setCurrency(data.currencySymbol || "$");
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
    fetchPrices();
  }, [selectedCountry]);

  if (loading || !goldData || !silverData) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }

  const currentData = activeTab === "gold" ? goldData : silverData;

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {activeTab === "gold" ? "أسعار الذهب الحالية" : "أسعار الفضة الحالية"}
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          أسعار السوق المباشرة للمعادن الثمينة. راقب القيمة الحالية لكل أوقية أو
          جرام.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("gold")}
          className={`px-6 py-3 font-medium text-lg flex items-center gap-2 transition ${
            activeTab === "gold"
              ? "border-b-2 border-primary-500 text-primary-600"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <FaGem className="text-primary-500" />
          الذهب
        </button>
        <button
          onClick={() => setActiveTab("silver")}
          className={`px-6 py-3 font-medium text-lg flex items-center gap-2 transition ${
            activeTab === "silver"
              ? "border-b-2 border-gray-500 text-gray-700"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <CiCoins1 className="text-gray-500" />
          الفضة
        </button>
      </div>

      {/* Spot Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">
            سعر السوق (لكل أوقية)
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {currency}
              {currentData.spotPricePerOunce?.toFixed(2) || 0}
            </span>
            <span className="text-sm text-gray-500">{currency}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
              {currentData.change || "0.00 (0.00%)"}
            </span>
            <span className="text-xs text-gray-500">
              أعلى 24 ساعة: {currency}
              {currentData.high24h?.toFixed(2) || 0}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">
            سعر السوق (لكل جرام)
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {currency}
              {currentData.spotPricePerGram?.toFixed(2) || 0}
            </span>
            <span className="text-sm text-gray-500">{currency}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
              {currentData.change || "0.00 (0.00%)"}
            </span>
            <span className="text-xs text-gray-500">
              طلب: {currency}
              {currentData.spotPricePerGram?.toFixed(2) || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Purity Breakdown */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <GiGoldBar className="text-primary-500" />
          تحليل النقاء
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentData.purity?.map((item: any, index: number) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="font-bold text-lg">{item.name} ذهب</div>
              <div className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full inline-block mb-2">
                {item.purity} نقاء
              </div>
              <div className="mt-2 text-sm text-gray-500">السعر / جرام</div>
              <div className="text-xl font-bold text-gray-900">
                {currency}
                {item.price?.toFixed(2) || 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingots */}
      <div className="bg-gray-50 p-5 rounded-lg mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <GiGoldBar className="text-primary-500" />
          أسعار حسب النقاء
        </h3>
        <div className="space-y-3">
          {currentData.purity?.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
            >
              <span>{item.name} - {item.purity}</span>
              <span className="font-bold">
                {currency}
                {item.price?.toFixed(2) || 0} / جرام
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold mb-2">فهم سعر السوق</h4>
          <p>
            السعر المعروض يمثل القيمة السوقية الحالية للذهب الخام غير المكرر.
            منتجات المعدن الذهبي (العملات، القضبان) غالبًا ما تتضمن "زيادة" فوق
            هذا السعر.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold mb-2">إخلاء مسؤولية</h4>
          <p>
            بيانات السوق متأخرة بحد أدنى 15 دقيقة إلا إذا تم ذكر خلاف ذلك. جميع
            الأسعار بالدولار الأمريكي. أسعار الذهب تتقلب بناءً على العوامل
            الاقتصادية العالمية.
          </p>
        </div>
      </div>
    </div>
  );
}
