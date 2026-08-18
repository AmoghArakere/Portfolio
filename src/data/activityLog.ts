export type ActivityEntryType = "read" | "work" | "build";

export type ActivityEntry = {
  id: string;
  createdAt: string;
  date: string;
  type: ActivityEntryType;
  title: string;
  detail?: string;
  url?: string;
};

/** Only this many entries appear on the homepage. */
export const ACTIVITY_LOG_LIMIT = 5;
