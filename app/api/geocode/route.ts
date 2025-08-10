import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";

    if (!q) {
      return NextResponse.json({ error: "query param 'q' required" }, { status: 400 });
    }

    const clientId = process.env.NCP_MAPS_CLIENT_ID;
    const clientSecret = process.env.NCP_MAPS_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "NCP_MAPS_CLIENT_ID / NCP_MAPS_CLIENT_SECRET not configured" }, { status: 500 });
    }

    const apiUrl = `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(q)}`;
    const r = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-ncp-apigw-api-key-id": clientId,
        "x-ncp-apigw-api-key": clientSecret,
      },
    });

    const text = await r.text();
    const contentType = r.headers.get("content-type") || "application/json";

    // If API returned non-JSON (rare), pass through the text
    if (!r.ok) {
      return new NextResponse(text, { status: r.status, headers: { "content-type": contentType } });
    }

    // Try to parse JSON; if fails, return text
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return new NextResponse(text, { status: 200, headers: { "content-type": contentType } });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
