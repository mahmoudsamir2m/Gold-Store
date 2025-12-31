import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const productId = params.id;

  try {
    const res = await fetch(
      `https://gold-stats.com/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return Response.json(
        { error: errorData.message || "فشل حذف المنتج" },
        { status: res.status }
      );
    }

    return Response.json({ success: true });
  } catch (error: any) {
    console.error("Delete product error:", error.message || error);
    return Response.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
