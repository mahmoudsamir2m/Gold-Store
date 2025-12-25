import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.metals.live/v1/spot", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Fetch failed");

    const data = await res.json();

    // شكل البيانات: [{ gold: 2034, silver: 24 }]
    return NextResponse.json({
      gold: data[0].gold,
      silver: data[0].silver,
    });
  } catch (error) {
    // fallback عشان الموقع ما يقعش
    return NextResponse.json({
      gold: 2000,
      silver: 25,
      fallback: true,
    });
  }
}
