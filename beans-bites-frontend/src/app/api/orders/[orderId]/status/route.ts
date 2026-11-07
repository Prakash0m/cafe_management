import { NextRequest, NextResponse } from "next/server";
import { ordersDb } from "@/lib/server/orders-db";
import { OrderStatus } from "@/types/order.types";

interface RouteParams {
  params: Promise<{ orderId: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { orderId } = await params;
    const cleanId = orderId.replace(/^#/, "").trim();
    const body = await request.json();

    const status = body?.status as OrderStatus;
    if (!status) {
      return NextResponse.json(
        { success: false, message: "Valid status is required" },
        { status: 400 }
      );
    }

    const updated = ordersDb.updateStatus(cleanId, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: `Order #${cleanId} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status of #${cleanId} changed to ${status}`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
