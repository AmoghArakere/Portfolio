import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ACTIVITY_LOG_COOKIE = "activity_log_session";
const SESSION_MS = 30 * 24 * 60 * 60 * 1000;

function getSecret() {
  return process.env.ACTIVITY_LOG_PASSWORD ?? "";
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken() {
  const secret = getSecret();
  if (!secret) throw new Error("ACTIVITY_LOG_PASSWORD is not configured");

  const expiresAt = String(Date.now() + SESSION_MS);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function verifySessionToken(token: string) {
  const secret = getSecret();
  if (!secret) return false;

  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;

  const expected = sign(expiresAt, secret);
  if (expected.length !== signature.length) return false;

  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function isActivityLogAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACTIVITY_LOG_COOKIE)?.value;
  return token ? verifySessionToken(token) : false;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}
