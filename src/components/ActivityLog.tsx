import type { ActivityEntry, ActivityEntryType } from "@/data/activityLog";

const typeLabels: Record<ActivityEntryType, string> = {
  read: "Read",
  work: "Work",
  build: "Build",
};

const typeStyles: Record<ActivityEntryType, string> = {
  read: "bg-teal-500/15 text-teal-300",
  work: "bg-indigo-500/15 text-indigo-300",
  build: "bg-amber-500/15 text-amber-300",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

type ActivityLogProps = {
  entries: ActivityEntry[];
};

export default function ActivityLog({ entries }: ActivityLogProps) {
  if (entries.length === 0) return null;

  return (
    <div className="group overflow-hidden rounded-xl bg-[var(--surface)]/55 backdrop-blur-md transition-colors duration-200 hover:bg-[var(--surface)]/80">
      <div className="px-4 pb-2 pt-4">
        <h2 className="text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)]">
          Recent
        </h2>
      </div>
      <ul className="divide-y divide-white/5">
        {entries.map((entry) => (
          <li key={entry.id} className="px-4 py-3">
            <div className="flex items-start gap-3">
              <time
                dateTime={entry.date}
                className="mt-0.5 w-12 shrink-0 text-[11px] tabular-nums text-[var(--muted)]"
              >
                {formatDate(entry.date)}
              </time>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${typeStyles[entry.type]}`}
                  >
                    {typeLabels[entry.type]}
                  </span>
                  {entry.url ? (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate text-sm font-medium text-[var(--text)] !no-underline hover:!no-underline hover:text-indigo-300"
                    >
                      {entry.title}
                    </a>
                  ) : (
                    <span className="truncate text-sm font-medium text-[var(--text)]">{entry.title}</span>
                  )}
                </div>
                {entry.detail ? (
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{entry.detail}</p>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
