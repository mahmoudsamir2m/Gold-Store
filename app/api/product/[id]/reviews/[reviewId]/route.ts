// app/api/product/[id]/reviews/[reviewId]/route.ts
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; reviewIt reviewId string } }
) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];
  const { id: productId, reviewId } = params;

  try {
    const body = await request.json();
    const res = await fetch(
      `https://gold-stats.com/api/products/${productId}/reviews/${reviewId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...body,
          _method: "PUT",
        }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return Response.json(
        { error: result.message || "Failed to update review" },
        { status: res.status }
      );
    }

    return Response.json({ success: true,  result.data });
  } catch (error: any) {
    console.error("Update review error:", error.message);
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; reviewId: string } }
) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];
  const { id: productId, reviewId } = params;

  try {
    const res = await fetch(
      `https://gold-stats.com/api/products/${productId}/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return Response.json(
        { error: result.message || "Failed to delete review" },
        { status: res.status }
      );
    }

    return Response.json({ success: true, message: result.message });
  } catch (error: any) {
    console.error("Delete review error:", error.message);
    return Response.json({ error: "Network error" }, { status: 500 });
  }
}
