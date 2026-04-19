import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TechBadge from "@/components/TechBadge";
import { projects } from "@/data/projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.name} | Projects | Nrupa`, description: project.description };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="space-y-4">
      <p className="text-sm text-[var(--muted)]">{project.language}</p>
      <h1 className="text-3xl font-semibold">{project.name}</h1>
      <p>{project.tagline}</p>
      <p className="text-[var(--muted)]">{project.description}</p>
      <div className="flex gap-2 flex-wrap">
        {project.tags.map((tag) => (
          <TechBadge key={tag} label={tag} />
        ))}
      </div>
      <a href={project.github} target="_blank" rel="noreferrer">
        github -&gt;
      </a>
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer" className="block">
          live -&gt;
        </a>
      ) : null}
    </article>
  );
}
