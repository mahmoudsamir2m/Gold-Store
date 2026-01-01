// app/api/product/[id]/reviews/stats/route.ts
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/reviews/stats`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch stats" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data.data);
  } catch (error: any) {
    console.error("Fetch reviews stats error:", error.message);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
