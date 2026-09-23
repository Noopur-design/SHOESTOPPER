import { NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth";
import { listAddresses, addAddress } from "@/lib/userdata";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ addresses: listAddresses(userId) });
}

export async function POST(req) {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const required = ["name", "line1", "city", "state", "pincode", "phone"];
    for (const f of required) {
      if (!body[f] || !String(body[f]).trim()) {
        return NextResponse.json(
          { error: "Please fill in all address fields." },
          { status: 400 }
        );
      }
    }
    const address = addAddress(userId, {
      name: body.name,
      line1: body.line1,
      line2: body.line2 || "",
      city: body.city,
      state: body.state,
      pincode: body.pincode,
      phone: body.phone,
    });
    return NextResponse.json({ address });
  } catch {
    return NextResponse.json({ error: "Could not save address." }, { status: 500 });
  }
}
