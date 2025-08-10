import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const center = url.searchParams.get("center") || "";
    const w = url.searchParams.get("w") || "800";
    const h = url.searchParams.get("h") || "400";
    const level = url.searchParams.get("level") || "15";

    if (!center) {
      return NextResponse.json({ error: "query param 'center' required (format: lng,lat)" }, { status: 400 });
    }

    const clientId = process.env.NCP_MAPS_CLIENT_ID;
    const clientSecret = process.env.NCP_MAPS_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "NCP_MAPS_CLIENT_ID / NCP_MAPS_CLIENT_SECRET not configured" }, { status: 500 });
    }

    // Build Static Map API URL (raster endpoint)
    const apiUrl = `https://maps.apigw.ntruss.com/map-static/v2/raster?center=${encodeURIComponent(
      String(center)
    )}&w=${encodeURIComponent(String(w))}&h=${encodeURIComponent(String(h))}&level=${encodeURIComponent(
      String(level)
    )}&markers=type:t|size:mid|pos:${encodeURIComponent(String(center))}`;

    const r = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-ncp-apigw-api-key-id": clientId,
        "x-ncp-apigw-api-key": clientSecret,
      },
    });

    if (!r.ok) {
      const text = await r.text();
      return new NextResponse(text, { status: r.status, headers: { "content-type": r.headers.get("content-type") || "text/plain" } });
    }

    const arrayBuffer = await r.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = r.headers.get("content-type") || "image/png";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=3600",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
