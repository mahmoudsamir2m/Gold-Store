import { NextResponse } from "next/server";

// Mock data for products (fallback)
const mockProducts = [
  {
    id: 1,
    title: "خاتم ذهب 24 عيار",
    category: "jewelry",
    metal: "gold",
    karat: "24",
    price: 1500,
    originalPrice: 1600,
    rating: 4.5,
    city: "القاهرة",
    images: ["/gold-jewelry-circle.png"],
  },
  {
    id: 2,
    title: "سبيكة ذهب 24 عيار",
    category: "bullion",
    metal: "gold",
    karat: "24",
    price: 2000,
    originalPrice: 2100,
    rating: 4.8,
    city: "الرياض",
    images: ["/gold-bottom.png"],
  },
  {
    id: 3,
    title: "أقراط فضة 925",
    category: "jewelry",
    metal: "silver",
    karat: "925",
    price: 300,
    originalPrice: 350,
    rating: 4.2,
    city: "دبي",
    images: ["/Jewellery.webp"],
  },
  {
    id: 4,
    title: "عملة ذهب 22 عيار",
    category: "bullion",
    metal: "gold",
    karat: "22",
    price: 1800,
    originalPrice: 1900,
    rating: 4.7,
    city: "القاهرة",
    images: ["/gold-left.png"],
  },
  {
    id: 5,
    title: "سلسلة ذهب 18 عيار",
    category: "jewelry",
    metal: "gold",
    karat: "18",
    price: 1200,
    originalPrice: 1300,
    rating: 4.3,
    city: "جدة",
    images: ["/gold-right.png"],
  },
  {
    id: 6,
    title: "سبيكة فضة 925",
    category: "bullion",
    metal: "silver",
    karat: "925",
    price: 400,
    originalPrice: 450,
    rating: 4.1,
    city: "الاسكندرية",
    images: ["/jewelry-store$.png"],
  },
  // Add more products as needed
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "8");
  const metal = searchParams.get("metal") || "";
  const karat = searchParams.get("karat") || "";
  const type = searchParams.get("type") || "";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "5000");
  const city = searchParams.get("city") || "";


  try {
    // Fetch from external API if URL is provided
    const productsApiUrl = process.env.PRODUCTS_API_URL;
    if (productsApiUrl) {
      const apiUrl = new URL(productsApiUrl);
      // Add query params to the external API
      apiUrl.searchParams.set("page", page.toString());
      apiUrl.searchParams.set("limit", limit.toString());
      if (metal) apiUrl.searchParams.set("metal", metal);
      if (karat) apiUrl.searchParams.set("karat", karat);
      if (type) apiUrl.searchParams.set("type", type);
      apiUrl.searchParams.set("minPrice", minPrice.toString());
      apiUrl.searchParams.set("maxPrice", maxPrice.toString());
      if (city) apiUrl.searchParams.set("city", city);
      apiUrl.searchParams.set("rating", rating.toString());

      const res = await fetch(apiUrl.toString(), {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("External API fetch failed");

      const data = await res.json();

      // Assume the external API returns { products: [...], total: number }
      return NextResponse.json(data);
    }
  } catch (error) {
    console.warn("Using fallback mock data:", error);
  }

  // Fallback to mock data
  const filteredProducts = mockProducts.filter((product) => {
    if (metal && product.metal !== metal) return false;
    if (karat && product.karat !== karat) return false;
    if (type && product.category !== type) return false;
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (city && product.city !== city) return false;
    if (rating && product.rating < rating) return false;
    return true;
  });

  const total = filteredProducts.length;

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return NextResponse.json({
    products: paginatedProducts,
    total,
  });
}
