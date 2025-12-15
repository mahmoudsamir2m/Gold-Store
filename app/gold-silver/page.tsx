"use client";

import { useState } from "react";
import { FaCoins, FaGem } from "react-icons/fa";
import { CiCoins1 } from "react-icons/ci";
import { GiGoldBar } from "react-icons/gi";

export default function GoldSilverPage() {
  const [activeTab, setActiveTab] = useState<"gold" | "silver">("gold");

  // بيانات وهمية للذهب
  const goldData = {
    spotPricePerOunce: 2034.5,
    spotPricePerGram: 65.41,
    change: "+9.20 (0.45%)",
    high24h: 2038.1,
    purity: [
      { name: "24K", purity: "99.9%", price: 65.41 },
      { name: "22K", purity: "91.6%", price: 59.92 },
      { name: "21K", purity: "87.5%", price: 57.23 },
      { name: "18K", purity: "75.0%", price: 49.06 },
    ],
    ingots: [
      { weight: "1 جرام", price: 78.5 },
      { weight: "2.5 جرام", price: 185.25 },
      { weight: "5 جرام", price: 362.4 },
      { weight: "10 جرام", price: 715.8 },
      { weight: "1 أونصة (31.1 جم)", price: 2198.5 },
    ],
    coins: [
      { name: "ربع جنية (2 جم)", price: 125.4 },
      { name: "نصف جنية (4 جم)", price: 248.8 },
      { name: "جنية قياسي (8 جم)", price: 495.5 },
      { name: "خمسة جنيهات (40 جم)", price: 2475.0 },
    ],
  };

  // بيانات وهمية للفضة
  const silverData = {
    spotPricePerOunce: 25.87,
    spotPricePerGram: 0.83,
    change: "-0.12 (-0.46%)",
    high24h: 26.05,
    purity: [
      { name: "999", purity: "99.9%", price: 0.83 },
      { name: "925", purity: "92.5%", price: 0.76 },
    ],
    ingots: [
      { weight: "1 جرام", price: 0.85 },
      { weight: "10 جرام", price: 8.3 },
      { weight: "100 جرام", price: 83.0 },
      { weight: "1 كجم", price: 830.0 },
    ],
    coins: [
      { name: "قطعة 1 أونصة", price: 25.87 },
      { name: "قطعة 5 أونصات", price: 129.35 },
    ],
  };

  const currentData = activeTab === "gold" ? goldData : silverData;
  const currencySymbol = "$";

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
              {currencySymbol}
              {currentData.spotPricePerOunce.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">USD</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs px-2 py-1 rounded ${
                currentData.change.startsWith("+")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {currentData.change}
            </span>
            <span className="text-xs text-gray-500">
              أعلى 24 ساعة: {currencySymbol}
              {currentData.high24h.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 mb-1">
            سعر السوق (لكل جرام)
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {currencySymbol}
              {currentData.spotPricePerGram.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">USD</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`text-xs px-2 py-1 rounded ${
                currentData.change.startsWith("+")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {currentData.change}
            </span>
            <span className="text-xs text-gray-500">
              طلب: {currencySymbol}
              {currentData.spotPricePerGram.toFixed(2)} - عرض: {currencySymbol}
              {(currentData.spotPricePerGram - 0.05).toFixed(2)}
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
          {currentData.purity.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="font-bold text-lg">{item.name} ذهب</div>
              <div className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full inline-block mb-2">
                {item.purity} نقاء
              </div>
              <div className="mt-2 text-sm text-gray-500">السعر / جرام</div>
              <div className="text-xl font-bold text-gray-900">
                {currencySymbol}
                {item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ingots & Coins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <GiGoldBar className="text-primary-500" />
            سبائك (منتجات نهائية)
          </h3>
          <div className="space-y-3">
            {currentData.ingots.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
              >
                <span>{item.weight}</span>
                <span className="font-bold">
                  {currencySymbol}
                  {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FaCoins className="text-primary-500" />
            عملات ذهبية (21K)
          </h3>
          <div className="space-y-3">
            {currentData.coins.map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
              >
                <span>{item.name}</span>
                <span className="font-bold">
                  {currencySymbol}
                  {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
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
