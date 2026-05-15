import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("id");

  if (!fileId) {
    return new NextResponse("Missing file ID", { status: 400 });
  }

  try {
    // We use the lh3.googleusercontent.com endpoint which is highly optimized 
    // for direct image delivery and bypasses virus scan warnings for large files.
    const googleUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
    
    const response = await fetch(googleUrl, {
      headers: {
        // We can add any headers needed here
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Google responded with ${response.status}`);
    }

    // Get the image data
    const blob = await response.blob();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Return the image data directly to the client
    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse("Failed to fetch image", { status: 500 });
  }
}
