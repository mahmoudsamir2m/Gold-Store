// app/api/product/[id]/reviews/route.ts
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  try {
    const res = await fetch(
      `https://gold-stats.com/api/products/${productId}/reviews?page=${page}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch reviews" }, { status: res.status });
    }

    const data = await res.json();
    return Response.json({
      reviews: data.data || [],
      meta: data.meta || {},
    });
  } catch (error: any) {
    console.error("Fetch reviews list error:", error.message);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(
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
    const body = await request.json();
    const res = await fetch(
      `https://gold-stats.com/api/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return Response.json(
        { error: result.message || "Failed to add review" },
        { status: res.status }
      );
    }

    return Response.json({ success: true,  result.data });
  } catch (error: any) {
    console.error("Add review error:", error.message);
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}
