import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app-content`, {
      cache: "no-store",
    });

    const result = await res.json().catch(() => null);

    // لو السيرفر رجّع error status
    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: result?.message || "حدث خطأ أثناء جلب البيانات",
          data: null,
          errors: result?.errors || null,
        },
        { status: res.status },
      );
    }

    // نجاح
    const { intro_video, ...rest } = result?.data || {};

    return NextResponse.json(
      {
        success: true,
        message: result?.message || "تم جلب البيانات بنجاح",
        data: rest,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
        data: null,
      },
      { status: 500 },
    );
  }
}
