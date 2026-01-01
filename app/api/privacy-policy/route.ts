// app/api/privacy-policy/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/privacy`, {
      cache: "no-store",
    });

    if (!res.ok) {
      //  يُسمح باستخدام console في route.ts (سيرفر)، لكن حتى لو ظهر تحذير، لا يؤثر على التشغيل
      console.error("فشل جلب سياسة الخصوصية من gold-stats.com");
      throw new Error("فشل الاتصال بالخادم الخارجي");
    }

    const externalData = await res.json();

    // استخراج القائمة من الاستجابة
    const policies = externalData.data?.list || [];

    return NextResponse.json({ policies });
  } catch (error) {
    //  في حالة الفشل، نُرجع بيانات احتياطية
    const fallbackPolicies = [
      "نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية.",
      "نقوم بجمع البيانات فقط لتحسين خدماتنا وتجربة المستخدم.",
      "لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك.",
      "يمكنك طلب حذف بياناتك في أي وقت.",
      "نستخدم تشفيرًا آمنًا لحماية بياناتك.",
    ];

    return NextResponse.json({ policies: fallbackPolicies });
  }
}
