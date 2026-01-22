// app/privacy-policy/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [policies, setPolicies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/privacy-policy")
      .then((res) => res.json())
      .then((data) => setPolicies(data.policies))
      .catch((err) => {
        console.warn("فشل التحميل، استخدام بيانات افتراضية");
        setPolicies([
          "نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية.",
          "نقوم بجمع البيانات فقط لتحسين خدماتنا وتجربة المستخدم.",
          "لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك.",
          "يمكنك طلب حذف بياناتك في أي وقت.",
          "نستخدم تشفيرًا آمنًا لحماية بياناتك.",
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10 min-h-screen flex items-center justify-center"> <span>جارٍ التحميل...</span></div>;
  }

  return (
    <main className=" bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
          سياسة الخصوصية
        </h1>

        <ul className="space-y-6">
          {policies.map((policy, index) => (
            <li
              key={index}
              className="flex items-start gap-4 text-gray-700 text-lg leading-relaxed"
            >
              <span className="mt-2 w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
              <p>{policy}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
