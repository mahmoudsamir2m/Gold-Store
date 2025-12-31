import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const res = await fetch("https://gold-stats.com/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return Response.json(
        { error: errorData.message || "Failed to fetch user data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data.data);
  } catch (error: any) {
    console.error("User me API error:", error.message || error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
