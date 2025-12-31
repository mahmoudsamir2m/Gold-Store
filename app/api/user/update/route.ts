// app/api/user/update/route.ts
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const formData = await request.formData();

    const res = await fetch("https://gold-stats.com/api/update-profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    // ✅ حتى لو فشل (422 مثلاً)، نأخذ الرد كما هو
    const result = await res.json();

    if (!res.ok) {
      // ❗ الآن نُعيد نفس رسالة الخطأ من الخادم الخارجي
      return Response.json(
        { error: result.message || "Validation failed", details: result },
        { status: res.status }
      );
    }

    return Response.json({ success: true, data: result.data });
  } catch (error: any) {
    console.error("Update profile error:", error.message || error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
