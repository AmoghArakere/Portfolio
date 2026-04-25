import type { Metadata } from "next";
import ProjectsSearchView from "@/components/ProjectsSearchView";
import { githubExperiments, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Nrupa",
  description: "Systems projects and practical backend experiments.",
};

export default function ProjectsPage() {
  return <ProjectsSearchView projects={projects} githubExperiments={githubExperiments} />;
}
