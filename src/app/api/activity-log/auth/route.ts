import { NextRequest, NextResponse } from "next/server";

import {
  ACTIVITY_LOG_COOKIE,
  createSessionToken,
  getSessionCookieOptions,
  isActivityLogAuthenticated,
  verifySessionToken,
} from "@/lib/activityLogAuth";

export async function GET() {
  return NextResponse.json({ authenticated: await isActivityLogAuthenticated() });
}

export async function POST(request: Request) {
  const password = process.env.ACTIVITY_LOG_PASSWORD;
  if (!password || password.length < 4) {
    return NextResponse.json(
      { error: "Set ACTIVITY_LOG_PASSWORD in .env.local (at least 4 characters)." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.password || body.password !== password) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACTIVITY_LOG_COOKIE, createSessionToken(), getSessionCookieOptions());
  return response;
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get(ACTIVITY_LOG_COOKIE)?.value;
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ACTIVITY_LOG_COOKIE);
  return response;
}
