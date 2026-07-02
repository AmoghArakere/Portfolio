"use client";

import { useMemo, useState } from "react";
import InfiniteGithubCards from "@/components/InfiniteGithubCards";
import ProjectCard from "@/components/ProjectCard";
import type { Project, ProjectCategory } from "@/data/projects";

type ProjectsSearchViewProps = {
  projects: Project[];
  githubExperiments: readonly (readonly [string, string])[];
};

type FilterTag = { id: "all" | ProjectCategory; label: string };

const FILTER_TAGS: FilterTag[] = [
  { id: "all", label: "ALL" },
  { id: "ai", label: "AI" },
  { id: "ml", label: "ML" },
  { id: "full-stack", label: "FULL STACK" },
  { id: "backend", label: "BACKEND" },
  { id: "databases", label: "DATABASES" },
  { id: "distributed-systems", label: "DISTRIBUTED SYSTEMS" },
];

function projectMatchesQuery(project: Project, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    project.name,
    project.tagline,
    project.description,
    project.language,
    ...project.tags,
    ...project.categories,
  ]
    .join(" ")
    .toLowerCase();

  return normalized.split(/\s+/).every((token) => haystack.includes(token));
}

function projectMatchesFilter(project: Project, filter: FilterTag["id"]) {
  if (filter === "all") return true;
  return project.categories.includes(filter);
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export default function ProjectsSearchView({ projects, githubExperiments }: ProjectsSearchViewProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTag["id"]>("all");
  const [query, setQuery] = useState("");

  const bentoProjects = useMemo(() => projects.filter((project) => project.slug !== "pixie-blog"), [projects]);

  const isFiltering = activeFilter !== "all" || query.trim().length > 0;

  const filteredProjects = useMemo(() => {
    const base = isFiltering ? projects : bentoProjects;
    return base.filter((project) => projectMatchesFilter(project, activeFilter) && projectMatchesQuery(project, query));
  }, [activeFilter, bentoProjects, isFiltering, projects, query]);

  const filteredGithubExperiments = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return githubExperiments;
    return githubExperiments.filter(([name, description]) =>
      `${name} ${description}`.toLowerCase().includes(normalized),
    );
  }, [githubExperiments, query]);

  const showBentoLayout = !isFiltering;

  const bentoLastFive = useMemo(() => filteredProjects.slice(-5), [filteredProjects]);
  const bentoExtraProjects = useMemo(
    () => filteredProjects.slice(0, Math.max(0, filteredProjects.length - 5)).slice(-3),
    [filteredProjects],
  );

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-[var(--muted)] text-left">nrupa / projects</p>
      </div>

      <div className="space-y-5">
        <div className="no-scrollbar flex flex-wrap items-center gap-x-5 gap-y-2">
          {FILTER_TAGS.map((tag) => {
            const isActive = activeFilter === tag.id;
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveFilter(tag.id)}
                className={
                  isActive
                    ? "rounded-full bg-[var(--nav-pill)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--nav-active-text)] transition-colors"
                    : "font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--muted-hover)]"
                }
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-3 border-b border-[var(--nav-border)] pb-2">
          <SearchIcon className="size-4 shrink-0 text-[var(--muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="search projects, languages, tags..."
            className="w-full bg-transparent font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--input-placeholder)]"
            aria-label="Search projects"
          />
        </label>
      </div>

      <section>
        {filteredProjects.length > 0 ? (
          showBentoLayout ? (
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
            <div className="grid gap-4 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} variant="bento" className="min-h-[17rem]" />
              ))}
            </div>
          )
        ) : (
          <p className="py-4 text-sm text-[var(--muted)]">
            {isFiltering ? "No projects match that filter or search." : "No projects available right now."}
          </p>
        )}
      </section>

      <section className="mt-14 space-y-5">
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold font-serif tracking-tight">More from GitHub</h2>
          <p className="text-xs text-zinc-500">Experiments, implementations, and code snippets</p>
        </div>
        {filteredGithubExperiments.length > 0 ? (
          <InfiniteGithubCards items={filteredGithubExperiments} />
        ) : (
          <p className="text-center text-sm text-[var(--muted)]">
            {query.trim() ? "No GitHub experiments match that search." : "No GitHub experiments available right now."}
          </p>
        )}
      </section>
    </div>
  );
}
