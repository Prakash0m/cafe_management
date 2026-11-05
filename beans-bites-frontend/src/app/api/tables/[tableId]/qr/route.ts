import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tableId: string }> }
) {
  try {
    const { tableId } = await params;
    const cleanId = tableId.toUpperCase().replace(/^TABLE-?/, "T");
    const formattedTable = cleanId.startsWith("T") ? cleanId : `T${cleanId}`;

    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format") || "svg";
    const customHost = searchParams.get("host");

    // Detect host or use custom network IP for mobile scanning
    const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host") || "localhost:3001";
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const targetHost = customHost || hostHeader;

    // Full target URL that Google Lens will scan and open
    const targetUrl = `${protocol}://${targetHost}/table/${formattedTable}`;

    if (format === "json") {
      const dataUrl = await QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: "#1E110A",
          light: "#FFFFFF",
        },
      });

      return NextResponse.json({
        success: true,
        tableId: formattedTable,
        targetUrl,
        dataUrl,
        instructions: "Scan this QR code with mobile camera or Google Lens to directly view menu and add food items.",
      });
    }

    if (format === "png") {
      const pngBuffer = await QRCode.toBuffer(targetUrl, {
        type: "png",
        width: 350,
        margin: 2,
        color: {
          dark: "#1E110A",
          light: "#FFFFFF",
        },
      });

      return new NextResponse(new Uint8Array(pngBuffer), {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // Default: Vector SVG QR Code
    const svgString = await QRCode.toString(targetUrl, {
      type: "svg",
      width: 320,
      margin: 2,
      color: {
        dark: "#1E110A",
        light: "#FFFFFF",
      },
    });

    return new NextResponse(svgString, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate QR code",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
