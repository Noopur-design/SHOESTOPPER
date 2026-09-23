import { NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth";
import { getWishlist, toggleWishlist } from "@/lib/userdata";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ wishlist: getWishlist(userId) });
}

export async function POST(req) {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }
    return NextResponse.json({ wishlist: toggleWishlist(userId, productId) });
  } catch {
    return NextResponse.json({ error: "Could not update wishlist." }, { status: 500 });
  }
}
