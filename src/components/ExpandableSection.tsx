"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import TechBadge from "@/components/TechBadge";
import { useState } from "react";

type Props = {
  title: string;
  period: string;
  subtitle: string;
  tags: string[];
  bullets: string[];
};

export default function ExpandableSection({ title, period, subtitle, tags, bullets }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="group relative overflow-hidden rounded-xl border border-indigo-400/35 bg-transparent p-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl border border-indigo-300/40 opacity-0 shadow-[0_0_0.7rem_rgba(129,140,248,0.28)] transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm text-[var(--muted)]">{period}</span>
        </div>
        <p className="mt-1 text-[var(--muted)]">{subtitle}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TechBadge key={tag} label={tag} className="border-zinc-500/60 bg-transparent" />
          ))}
        </div>
        <Collapsible.Content className="mt-3 overflow-hidden data-[state=closed]:animate-none">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </Collapsible.Content>
        <Collapsible.Trigger className="mt-3 text-sm text-[var(--muted)]">{open ? "Less" : "Details"}</Collapsible.Trigger>
      </div>
    </Collapsible.Root>
  );
}
