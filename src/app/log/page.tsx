import type { Metadata } from "next";

import ActivityLogAdmin from "@/components/ActivityLogAdmin";
import PageHeaderLabel from "@/components/PageHeaderLabel";

export const metadata: Metadata = {
  title: "Log | mandakini",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LogPage() {
  return (
    <div className="space-y-8">
      <div>
        <PageHeaderLabel label="log" />
        <h1 className="text-3xl font-semibold">Activity log</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">Private page — not linked in the site nav.</p>
      </div>
      <ActivityLogAdmin />
    </div>
  );
}
