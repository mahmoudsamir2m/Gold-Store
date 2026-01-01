// app/api/product/[id]/route.ts
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return Response.json(
        { error: errorData.message || "Product not found" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data.data);
  } catch (error: any) {
    console.error("Fetch product error:", error.message);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
