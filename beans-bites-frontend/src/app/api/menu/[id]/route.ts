import { NextRequest, NextResponse } from "next/server";
import { menuDb } from "@/lib/server/menu-db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = menuDb.getById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, message: `Menu item with id '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu item",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    const existing = menuDb.getById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: `Menu item with id '${id}' not found` },
        { status: 404 }
      );
    }

    // Sanitize updates
    const sanitizedUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) sanitizedUpdates.name = updates.name;
    if (updates.description !== undefined) sanitizedUpdates.description = updates.description;
    if (updates.price !== undefined) sanitizedUpdates.price = Number(updates.price);
    if (updates.category !== undefined) sanitizedUpdates.category = updates.category;
    if (updates.isVeg !== undefined) sanitizedUpdates.isVeg = Boolean(updates.isVeg);
    if (updates.isAvailable !== undefined) sanitizedUpdates.isAvailable = Boolean(updates.isAvailable);
    if (updates.preparationTime !== undefined) sanitizedUpdates.preparationTime = updates.preparationTime;
    if (updates.calories !== undefined) sanitizedUpdates.calories = Number(updates.calories);
    if (updates.badge !== undefined) sanitizedUpdates.badge = updates.badge;

    // Ingredients & culinary details (k k used gareko foods vitra)
    if (Array.isArray(updates.ingredients)) {
      sanitizedUpdates.ingredients = updates.ingredients;
    }
    if (Array.isArray(updates.allergens)) {
      sanitizedUpdates.allergens = updates.allergens;
    }
    if (updates.spiciness !== undefined) sanitizedUpdates.spiciness = updates.spiciness;
    if (updates.portion !== undefined) sanitizedUpdates.portion = updates.portion;
    if (updates.chefNotes !== undefined) sanitizedUpdates.chefNotes = updates.chefNotes;

    const updatedItem = menuDb.update(id, sanitizedUpdates);

    return NextResponse.json({
      success: true,
      message: `Menu item '${updatedItem?.name}' updated successfully in backend`,
      data: updatedItem,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update menu item in backend",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PATCH(request, context);
}
