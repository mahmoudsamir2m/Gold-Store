import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لمتجر الذهب",
};

async function fetchPrivacyPolicy() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/privacy-policy`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("فشل جلب سياسة الخصوصية");
    const data = await res.json();

    return data.policies;
  } catch (error) {
    console.warn("استخدام بيانات افتراضية:", error);
    return [
      "نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية.",
      "نقوم بجمع البيانات فقط لتحسين خدماتنا وتجربة المستخدم.",
      "لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك.",
      "يمكنك طلب حذف بياناتك في أي وقت.",
      "نستخدم تشفيرًا آمنًا لحماية بياناتك.",
    ];
  }
}

export default async function PrivacyPolicy() {
  const policies = await fetchPrivacyPolicy();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
          سياسة الخصوصية
        </h1>

        <ul className="space-y-6">
          {policies.map((policy: string, index: number) => (
            <li
              key={index}
              className="flex items-start gap-4 text-gray-700 text-lg leading-relaxed"
            >
              {/* Bullet */}
              <span className="mt-2 w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />

              <p>{policy}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
