import { NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth";
import { listOrders, createOrder } from "@/lib/userdata";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ orders: listOrders(userId) });
}

export async function POST(req) {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
    }
    const order = createOrder(userId, {
      items: body.items,
      subtotal: body.subtotal,
      tax: body.tax,
      shipping: body.shipping,
      total: body.total,
      address: body.address || null,
    });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Could not place order." }, { status: 500 });
  }
}
