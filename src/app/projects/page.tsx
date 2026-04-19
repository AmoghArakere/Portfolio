import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { githubExperiments, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Nrupa",
  description: "Systems projects and practical backend experiments.",
};

export default function ProjectsPage() {
  const top = githubExperiments.slice(0, 10);
  const rest = githubExperiments.slice(10);

  return (
    <div className="space-y-10">
      <p className="text-[var(--muted)] text-sm">nrupa / projects</p>
      <section>{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</section>
      <section>
        <h2 className="text-xl font-semibold">More from GitHub</h2>
        <p className="text-[var(--muted)] mb-3">Experiments, implementations, and code snippets</p>
        <div className="space-y-2">
          {[...top, ...rest].map(([name, description]) => (
            <a key={name} href={`https://github.com/nrupa/${name}`} className="block">
              <h3 className="font-semibold lowercase">{name}</h3>
              <p className="text-[var(--muted)] text-sm">{description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
