import { NextRequest, NextResponse } from "next/server";
import { ordersDb } from "@/lib/server/orders-db";
import { OrderStatus } from "@/types/order.types";

interface RouteParams {
  params: Promise<{ orderId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { orderId } = await params;
    const cleanId = orderId.replace(/^#/, "").trim();

    const order = ordersDb.getById(cleanId);
    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: `Order #${cleanId} not found in backend`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { orderId } = await params;
    const cleanId = orderId.replace(/^#/, "").trim();
    const body = await request.json();

    const existing = ordersDb.getById(cleanId);
    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: `Order #${cleanId} not found in backend`,
        },
        { status: 404 }
      );
    }

    let updated = existing;

    if (body.status) {
      const updatedStatus = ordersDb.updateStatus(cleanId, body.status as OrderStatus);
      if (updatedStatus) updated = updatedStatus;
    }

    if (body.notificationsEnabled !== undefined || body.specialInstructions !== undefined) {
      const updatedOther = ordersDb.update(cleanId, body);
      if (updatedOther) updated = updatedOther;
    }

    return NextResponse.json({
      success: true,
      message: `Order #${cleanId} updated successfully`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { orderId } = await params;
    const cleanId = orderId.replace(/^#/, "").trim();

    const deleted = ordersDb.delete(cleanId);
    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: `Order #${cleanId} not found in backend`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Order #${cleanId} removed successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

