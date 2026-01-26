import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("per_page") || "15";

    const res = await fetch(
      `https://gold-stats.com/api/outside-links?per_page=${perPage}&page=${page}`,
      {
        cache: "no-store",
      },
    );

    const result = await res.json().catch(() => null);

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

    return NextResponse.json(
      {
        success: true,
        message: result?.message || "تم جلب البيانات بنجاح",
        data: result?.data || [],
        meta: result?.meta || {},
        links: result?.links || {},
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
