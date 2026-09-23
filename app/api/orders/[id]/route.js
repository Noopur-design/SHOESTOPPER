import { NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth";
import { getOrder } from "@/lib/userdata";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const order = getOrder(userId, params.id);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json({ order });
}
