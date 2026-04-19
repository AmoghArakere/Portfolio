import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block border-b border-[var(--border)] py-6 hover:bg-[var(--surface)] transition-colors duration-150"
    >
      <p className="text-xs text-[var(--muted)] mb-2">{project.language}</p>
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="mt-1">{project.tagline}</p>
      <p className="text-[var(--muted)] mt-3">{project.description}</p>
      <p className="mt-4 text-sm">{project.github.replace("https://", "")} -&gt;</p>
      {project.live ? <p className="text-sm text-[var(--muted)] mt-1">{project.live.replace("https://", "")}</p> : null}
    </Link>
  );
}
