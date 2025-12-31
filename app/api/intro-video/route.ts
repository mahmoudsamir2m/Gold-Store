import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://gold-stats.com/api/app-content/1", {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ success: false }, { status: res.status });
    }

    const data = await res.json();

    const videoPath = data?.data?.value?.trim();
    const videoUrl = videoPath ? `https://gold-stats.com/${videoPath}` : null;

    return NextResponse.json({
      success: true,
      videoUrl,
    });
  } catch (error) {
    console.error("Error fetching intro video:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
