import type { Metadata } from "next";

import ActivityLog from "@/components/ActivityLog";
import PageHeaderLabel from "@/components/PageHeaderLabel";
import { getActivityEntries } from "@/lib/activityLogStore";

export const metadata: Metadata = {
  title: "Activity | mandakini",
  description: "Everything I've been reading, watching, and building.",
};

export default async function ActivityPage() {
  const entries = await getActivityEntries();

  return (
    <div className="space-y-8">
      <div>
        <PageHeaderLabel label="activity" />
        <h1 className="text-3xl font-semibold">Activity</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Everything I&apos;ve been reading, watching, and building.</p>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Nothing logged yet.</p>
      ) : (
        <ActivityLog entries={entries} showViewAll={false} />
      )}
    </div>
  );
}
