import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import type { ActivityEntryType } from "@/data/activityLog";
import { isActivityLogAuthenticated } from "@/lib/activityLogAuth";
import {
  addActivityEntry,
  deleteActivityEntry,
  getActivityEntries,
} from "@/lib/activityLogStore";

const VALID_TYPES: ActivityEntryType[] = ["read", "work", "build"];

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

export async function GET() {
  if (!(await isActivityLogAuthenticated())) return unauthorized();
  const entries = await getActivityEntries();
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  if (!(await isActivityLogAuthenticated())) return unauthorized();

  let body: {
    date?: string;
    type?: ActivityEntryType;
    title?: string;
    detail?: string;
    url?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const title = body.title?.trim();
  const type = body.type;
  const date = body.date?.trim() || new Date().toISOString().slice(0, 10);

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Type must be read, work, or build." }, { status: 400 });
  }

  const detail = body.detail?.trim() || undefined;
  const url = body.url?.trim() || undefined;

  try {
    const entry = await addActivityEntry({ date, type, title, detail, url });
    revalidatePath("/");
    return NextResponse.json({ entry });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save entry.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isActivityLogAuthenticated())) return unauthorized();

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing entry id." }, { status: 400 });
  }

  try {
    const deleted = await deleteActivityEntry(id);
    if (!deleted) {
      return NextResponse.json({ error: "Entry not found." }, { status: 404 });
    }
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete entry.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
