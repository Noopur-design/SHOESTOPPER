import { NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth";
import { deleteAddress, setDefaultAddress } from "@/lib/userdata";

export const dynamic = "force-dynamic";

export async function DELETE(_req, { params }) {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ addresses: deleteAddress(userId, params.id) });
}

export async function PATCH(_req, { params }) {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ addresses: setDefaultAddress(userId, params.id) });
}
