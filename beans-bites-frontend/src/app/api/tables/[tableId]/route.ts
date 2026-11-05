import { NextRequest, NextResponse } from "next/server";

const TABLES_DATA: Record<string, { name: string; seats: number; location: string; status: string }> = {
  T1: { name: "Table T1 (2 Seats)", seats: 2, location: "Window Side", status: "available" },
  T2: { name: "Table T2 (2 Seats)", seats: 2, location: "Window Side", status: "available" },
  T3: { name: "Table T3 (4 Seats)", seats: 4, location: "Main Hall", status: "available" },
  T4: { name: "Table T4 (4 Seats)", seats: 4, location: "Garden Terrace", status: "available" },
  T5: { name: "Table T5 (6 Seats)", seats: 6, location: "Family Section", status: "available" },
  T6: { name: "Table T6 (8 Seats)", seats: 8, location: "Private Lounge", status: "available" },
  T7: { name: "Table T7 (2 Seats)", seats: 2, location: "Balcony", status: "available" },
  T8: { name: "Table T8 (4 Seats)", seats: 4, location: "Main Hall", status: "available" },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tableId: string }> }
) {
  try {
    const { tableId } = await params;
    const cleanId = tableId.toUpperCase().replace(/^TABLE-?/, "T");
    const formattedKey = cleanId.startsWith("T") ? cleanId : `T${cleanId}`;

    const tableInfo = TABLES_DATA[formattedKey] || {
      name: `Table ${formattedKey} (4 Seats)`,
      seats: 4,
      location: "Dining Hall",
      status: "available",
    };

    return NextResponse.json({
      success: true,
      tableId: formattedKey,
      data: tableInfo,
      qrPayload: {
        tableId: formattedKey,
        tableName: tableInfo.name,
        dineInActive: true,
        scannedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve table data",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
