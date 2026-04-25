"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { useState } from "react";

type HiExperienceCardProps = {
  company: string;
  role?: string;
  period?: string;
  location?: string;
  roles?: Array<{
    title: string;
    period: string;
    location: string;
    employmentType?: string;
  }>;
  bullets: string[];
};

export default function HiExperienceCard({ company, role, period, location, roles, bullets }: HiExperienceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="group rounded-2xl bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent p-4 transition hover:bg-indigo-400/5"
    >
      <div>
        {roles && roles.length > 0 ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-[var(--text)]">{company}</p>
            {roles.map((entry, idx) => (
              <div key={`${entry.title}-${entry.period}`} className="flex min-w-0 items-start gap-3">
                <div className="mt-1 flex w-3 flex-col items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--muted)]/70" />
                  {idx < roles.length - 1 ? (
                    <span className="mt-1 h-10 w-px bg-[var(--muted)]/30" />
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                  <p className="min-w-0 pr-2 text-base font-semibold leading-snug text-[var(--text)]">{entry.title}</p>
                  <div className="w-36 shrink-0 text-center">
                    <p className="whitespace-nowrap text-sm text-[var(--muted)]">{entry.period}</p>
                    <p className="whitespace-nowrap text-sm text-[var(--muted)]">{entry.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : role ? (
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-lg font-semibold text-[var(--text)]">{company}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                {role}
              </p>
            </div>
            <div className="w-36 shrink-0 text-center">
              <p className="whitespace-nowrap text-sm text-[var(--muted)]">{period}</p>
              <p className="whitespace-nowrap text-sm text-[var(--muted)]">{location}</p>
            </div>
          </div>
        ) : null}
      </div>

      <Collapsible.Content className="mt-3 overflow-hidden">
        <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
          {bullets.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Collapsible.Content>

      <Collapsible.Trigger className="mt-3 text-sm text-[var(--muted)]">
        {open ? "Less" : "Details"}
      </Collapsible.Trigger>
    </Collapsible.Root>
  );
}
