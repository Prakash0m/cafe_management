import { NextRequest, NextResponse } from "next/server";
import { menuDb } from "@/lib/server/menu-db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const table = searchParams.get("table") || undefined;

    const items = menuDb.getAll(category, search);

    return NextResponse.json({
      success: true,
      count: items.length,
      table: table || null,
      data: items,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu items from backend",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, message: "Name, price, and category are required" },
        { status: 400 }
      );
    }

    const id = `item-${body.category}-${Date.now()}`;
    const newItem = {
      id,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
      name: body.name,
      description: body.description || "",
      price: Number(body.price),
      category: body.category,
      imageUrl: body.imageUrl || "/images/dishes/pizza_margherita.jpg",
      isVeg: Boolean(body.isVeg),
      isAvailable: body.isAvailable !== false,
      ingredients: Array.isArray(body.ingredients) ? body.ingredients : [],
      allergens: Array.isArray(body.allergens) ? body.allergens : [],
      spiciness: body.spiciness || "none",
      portion: body.portion || "Standard serving",
      chefNotes: body.chefNotes || "",
      updatedAt: new Date().toISOString(),
    };

    menuDb.update(id, newItem);

    return NextResponse.json(
      {
        success: true,
        message: "Menu item created successfully",
        data: newItem,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create menu item",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
