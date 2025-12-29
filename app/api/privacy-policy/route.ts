import { NextResponse } from "next/server";

export async function GET() {
  try {
    // For now, using custom data as requested
    const privacyPolicyData = [
      "نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية.",
      "نقوم بجمع البيانات فقط لتحسين خدماتنا وتجربة المستخدم.",
      "لا نشارك معلوماتك مع أطراف ثالثة دون موافقتك.",
      "يمكنك طلب حذف بياناتك في أي وقت.",
      "نستخدم تشفيرًا آمنًا لحماية بياناتك.",
    ];

    return NextResponse.json({
      policies: privacyPolicyData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "فشل في جلب سياسة الخصوصية",
      },
      { status: 500 }
    );
  }
}
