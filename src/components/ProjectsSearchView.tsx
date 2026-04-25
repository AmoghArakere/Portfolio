"use client";

import { useMemo } from "react";
import InfiniteGithubCards from "@/components/InfiniteGithubCards";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

type ProjectsSearchViewProps = {
  projects: Project[];
  githubExperiments: readonly (readonly [string, string])[];
};

export default function ProjectsSearchView({ projects, githubExperiments }: ProjectsSearchViewProps) {
  const bentoProjects = useMemo(() => projects.filter((project) => project.slug !== "pixie-blog"), [projects]);
  const bentoLastFive = useMemo(() => bentoProjects.slice(-5), [bentoProjects]);
  const bentoExtraProjects = useMemo(
    () => bentoProjects.slice(0, Math.max(0, bentoProjects.length - 5)).slice(-3),
    [bentoProjects],
  );

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-[var(--muted)] text-left">nrupa / projects</p>
      </div>

      <section>
        {bentoProjects.length > 0 ? (
          <div className="space-y-4">
            {bentoExtraProjects.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {bentoExtraProjects.map((project, index) => (
                  <div key={project.slug} className={index === 2 ? "md:col-span-2" : ""}>
                    <ProjectCard project={project} variant="bento" className="min-h-[17rem]" />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
              {bentoLastFive[0] ? (
                <div className="md:col-start-1 md:row-start-1">
                  <ProjectCard project={bentoLastFive[0]} variant="bento" className="min-h-[17rem]" />
                </div>
              ) : null}
              {bentoLastFive[1] ? (
                <div className="md:col-start-1 md:row-start-2">
                  <ProjectCard project={bentoLastFive[1]} variant="bento" className="min-h-[17rem]" />
                </div>
              ) : null}
              {bentoLastFive[2] ? (
                <div className="md:col-start-2 md:col-end-4 md:row-start-1 md:row-end-3">
                  <ProjectCard project={bentoLastFive[2]} variant="bento" className="min-h-[35rem]" />
                </div>
              ) : null}
              {bentoLastFive[3] ? (
                <div className="md:col-start-4 md:row-start-1">
                  <ProjectCard project={bentoLastFive[3]} variant="bento" className="min-h-[17rem]" />
                </div>
              ) : null}
              {bentoLastFive[4] ? (
                <div className="md:col-start-4 md:row-start-2">
                  <ProjectCard project={bentoLastFive[4]} variant="bento" className="min-h-[17rem]" />
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="py-4 text-sm text-[var(--muted)]">No projects available right now.</p>
        )}
      </section>

      <section className="mt-14 space-y-5">
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold font-serif tracking-tight">More from GitHub</h2>
          <p className="text-xs text-zinc-500">Experiments, implementations, and code snippets</p>
        </div>
        {githubExperiments.length > 0 ? (
          <InfiniteGithubCards items={githubExperiments} />
        ) : (
          <p className="text-center text-sm text-[var(--muted)]">No GitHub experiments available right now.</p>
        )}
      </section>
    </div>
  );
}
