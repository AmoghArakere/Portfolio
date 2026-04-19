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
    <Collapsible.Root open={open} onOpenChange={setOpen} className="border border-[var(--border)] p-4">
      <div className="flex justify-between gap-4 items-start">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-[var(--muted)]">{period}</span>
      </div>
      <p className="text-[var(--muted)] mt-1">{subtitle}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <TechBadge key={tag} label={tag} />
        ))}
      </div>
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-none mt-3">
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </Collapsible.Content>
      <Collapsible.Trigger className="text-sm text-[var(--muted)] mt-3">{open ? "Less" : "Details"}</Collapsible.Trigger>
    </Collapsible.Root>
  );
}
