"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";

const GRADIENTS = [
  "bg-gradient-to-br from-indigo-500/30 via-indigo-800/10 to-black",
  "bg-gradient-to-br from-indigo-400/20 via-black to-indigo-950/35",
  "bg-gradient-to-br from-violet-500/25 via-violet-900/10 to-black",
  "bg-gradient-to-br from-blue-500/20 via-black to-blue-950/30",
];

type Props = { projects: Project[] };

export default function FocusProjectCards({ projects }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={[
            "overflow-hidden rounded-2xl bg-[var(--surface)]/45 !no-underline hover:!no-underline",
            "transition-all duration-300 ease-out",
            hovered !== null && hovered !== index
              ? "scale-[0.98] opacity-50 blur-[2px]"
              : hovered === index
                ? "scale-[1.02] opacity-100 brightness-110"
                : "opacity-100",
          ].join(" ")}
        >
          <div className={`h-40 ${GRADIENTS[index % GRADIENTS.length]}`} />
          <div className="space-y-2.5 p-4">
            <h3 className="text-xl font-semibold lowercase">{project.name}</h3>
            <p className="line-clamp-2 text-sm text-[var(--muted)]">{project.description}</p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-indigo-300">View Project</span>
              <div className="flex gap-2">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--nav-pill)] px-2 py-0.5 text-xs text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
