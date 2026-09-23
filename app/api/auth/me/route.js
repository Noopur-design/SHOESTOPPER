import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  verifySessionToken,
  findUserById,
  publicUser,
  SESSION_COOKIE,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const userId = verifySessionToken(token);
  if (!userId) return NextResponse.json({ user: null });

  const user = findUserById(userId);
  return NextResponse.json({ user: publicUser(user) });
}
