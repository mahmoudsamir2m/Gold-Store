"use server";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const per_page = Math.max(
    1,
    Math.min(50, parseInt(searchParams.get("per_page") || "8", 10) || 8)
  );

  const metal = searchParams.get("metal") || "";
  const karat = searchParams.get("karat") || "";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const city = searchParams.get("city") || "";

  const min_price_raw = searchParams.get("min_price");
  const max_price_raw = searchParams.get("max_price");

  try {
    const PRODUCTS_API_URL = "https://gold-stats.com/api/products";

    const apiUrl = new URL(PRODUCTS_API_URL);
    apiUrl.searchParams.set("page", page.toString());
    apiUrl.searchParams.set("per_page", per_page.toString());

    if (metal) apiUrl.searchParams.set("metal", metal);
    if (karat) apiUrl.searchParams.set("karat", karat);
    if (category) apiUrl.searchParams.set("category", category);
    if (search) apiUrl.searchParams.set("search", search);
    if (city) apiUrl.searchParams.set("city", city);
    if (min_price_raw) apiUrl.searchParams.set("min_price", min_price_raw);
    if (max_price_raw) apiUrl.searchParams.set("max_price", max_price_raw);

    // ❌ لا حاجة ل(headers Authorization لأن الـ API لا يتطلب مصادقة
    const res = await fetch(apiUrl.toString(), {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error("External API error:", res.status, await res.text());
      return NextResponse.json(
        { products: [], total: 0 },
        { status: res.status }
      );
    }

    const externalData = await res.json();

    const products = (externalData.data || []).map((item: any) => ({
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

    const total = externalData.meta?.total || products.length;

    return NextResponse.json({ products, total });
  } catch (error: any) {
    console.error("Products API route failed:", error.message || error);
    return NextResponse.json({ products: [], total: 0 }, { status: 500 });
  }
}
