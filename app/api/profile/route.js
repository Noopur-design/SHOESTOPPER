import { NextResponse } from "next/server";
import {
  currentUserId,
  updateUser,
  findUserById,
  verifyPassword,
  hashPassword,
  publicUser,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PATCH(req) {
  const userId = currentUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const patch = {};

    if (body.name !== undefined) {
      if (!String(body.name).trim()) {
        return NextResponse.json({ error: "Name cannot be empty." }, { status: 400 });
      }
      patch.name = body.name.trim();
    }

    // Optional password change requires the current password.
    if (body.newPassword) {
      const user = findUserById(userId);
      if (!verifyPassword(body.currentPassword || "", user.password)) {
        return NextResponse.json(
          { error: "Your current password is incorrect." },
          { status: 400 }
        );
      }
      if (String(body.newPassword).length < 6) {
        return NextResponse.json(
          { error: "New password must be at least 6 characters." },
          { status: 400 }
        );
      }
      patch.password = hashPassword(body.newPassword);
    }

    const updated = updateUser(userId, patch);
    return NextResponse.json({ user: publicUser(updated) });
  } catch {
    return NextResponse.json({ error: "Could not update profile." }, { status: 500 });
  }
}
