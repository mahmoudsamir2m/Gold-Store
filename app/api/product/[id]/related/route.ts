// app/api/product/[id]/related/route.ts
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "";

  try {
    // جلب منتجات من نفس الفئة (عدا المنتج الحالي)
    const res = await fetch(
      `https://gold-stats.com/api/products?page=1&per_page=8&category=${encodeURIComponent(
        category
      )}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json({ products: [] }, { status: res.status });
    }

    const data = await res.json();
    const related = (data.data || [])
      .filter((p: any) => p.id.toString() !== productId)
      .slice(0, 8);

    const products = related.map((item: any) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      metal: item.metal,
      karat: item.karat,
      price: parseFloat(item.price) || 0,
      originalPrice: parseFloat(item.original_price) || undefined,
      rating: item.average_rating || 0,
      city: item.city || "",
      images: Array.isArray(item.images)
        ? item.images.map((img: string) => img.trim())
        : [],
    }));

    return Response.json({ products });
  } catch (error: any) {
    console.error("Fetch related products error:", error.message);
    return Response.json({ products: [] }, { status: 500 });
  }
}
