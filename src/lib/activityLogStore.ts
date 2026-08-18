import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import type { ActivityEntry, ActivityEntryType } from "@/data/activityLog";

type ActivityLogFile = {
  entries: ActivityEntry[];
};

type GitHubContentResponse = {
  content?: string;
  sha?: string;
};

const LOG_FILE = path.join(process.cwd(), "data", "activity-log.json");
const GITHUB_REPO = process.env.GITHUB_REPO ?? "AmoghArakere/Portfolio";
const GITHUB_PATH = "data/activity-log.json";

/** Activity `date` is a calendar day; `createdAt` must not fall before that day (UTC). */
function activityDayStartUtc(date: string): Date {
  return new Date(`${date}T00:00:00.000Z`);
}

export function createdAtForActivityDate(activityDate: string, now = new Date()): string {
  const dayStart = activityDayStartUtc(activityDate);
  return (now.getTime() < dayStart.getTime() ? dayStart : now).toISOString();
}

function normalizeEntry(entry: ActivityEntry): ActivityEntry {
  const createdAt = createdAtForActivityDate(entry.date, new Date(entry.createdAt));
  if (entry.createdAt === createdAt) return entry;
  return { ...entry, createdAt };
}

function normalizeLog(log: ActivityLogFile): ActivityLogFile {
  return { entries: log.entries.map(normalizeEntry) };
}

function emptyLog(): ActivityLogFile {
  return { entries: [] };
}

function parseLog(raw: string): ActivityLogFile {
  try {
    const parsed = JSON.parse(raw) as ActivityLogFile;
    if (!Array.isArray(parsed.entries)) return emptyLog();
    return normalizeLog(parsed);
  } catch {
    return emptyLog();
  }
}

async function readLocalLog(): Promise<ActivityLogFile> {
  try {
    const raw = await fs.readFile(LOG_FILE, "utf-8");
    return parseLog(raw);
  } catch {
    return emptyLog();
  }
}

async function writeLocalLog(log: ActivityLogFile) {
  await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
  await fs.writeFile(LOG_FILE, `${JSON.stringify(log, null, 2)}\n`, "utf-8");
}

async function readGitHubLog(): Promise<{ log: ActivityLogFile; sha?: string } | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_PATH}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (response.status === 404) {
    return { log: emptyLog() };
  }

  if (!response.ok) return null;

  const payload = (await response.json()) as GitHubContentResponse;
  if (!payload.content) return null;

  const raw = Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf-8");
  return { log: parseLog(raw), sha: payload.sha };
}

async function writeGitHubLog(log: ActivityLogFile, sha?: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not configured");

  const body = {
    message: "Update activity log",
    content: Buffer.from(JSON.stringify(log, null, 2)).toString("base64"),
    ...(sha ? { sha } : {}),
  };

  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_PATH}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Could not save activity log to GitHub (${response.status}): ${detail}`);
  }
}

async function readLog(): Promise<ActivityLogFile> {
  const github = await readGitHubLog();
  if (github) return github.log;
  return readLocalLog();
}

async function persistLog(log: ActivityLogFile) {
  const github = await readGitHubLog();
  if (github && process.env.GITHUB_TOKEN) {
    await writeGitHubLog(log, github.sha);
    await writeLocalLog(log);
    return;
  }

  await writeLocalLog(log);
}

export async function getActivityEntries(): Promise<ActivityEntry[]> {
  const log = await readLog();
  return log.entries;
}

export async function getRecentActivityEntries(limit: number): Promise<ActivityEntry[]> {
  const entries = await getActivityEntries();
  return entries.slice(0, limit);
}

export type NewActivityEntry = {
  date: string;
  type: ActivityEntryType;
  title: string;
  detail?: string;
  url?: string;
};

export async function addActivityEntry(input: NewActivityEntry): Promise<ActivityEntry> {
  const log = await readLog();
  const entry: ActivityEntry = {
    id: randomUUID(),
    createdAt: createdAtForActivityDate(input.date),
    ...input,
  };

  log.entries.unshift(entry);
  await persistLog(log);
  return entry;
}

export async function deleteActivityEntry(id: string): Promise<boolean> {
  const log = await readLog();
  const nextEntries = log.entries.filter((entry) => entry.id !== id);
  if (nextEntries.length === log.entries.length) return false;

  await persistLog({ entries: nextEntries });
  return true;
}
