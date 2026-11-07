import { NextRequest, NextResponse } from "next/server";
import { ordersDb } from "@/lib/server/orders-db";
import { OrderStatus } from "@/types/order.types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get("status") as OrderStatus) || undefined;
    const table = searchParams.get("table") || undefined;

    const orders = ordersDb.getAll(status, table);

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders from backend",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || (!body.items && !body.id)) {
      return NextResponse.json(
        { success: false, message: "Order items or order data are required" },
        { status: 400 }
      );
    }

    const newOrder = ordersDb.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully in backend",
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to place order in backend",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
