import type { Metadata } from "next";
import ExpandableSection from "@/components/ExpandableSection";
import PageHeaderLabel from "@/components/PageHeaderLabel";
import { experience, featuredProjects } from "@/data/work";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work | Nrupa",
  description: "Professional experience and featured backend projects.",
};

export default function WorkPage() {
  // #region agent log
  fetch("http://127.0.0.1:7854/ingest/5b8534c4-f00f-4dd8-8795-4eff75f9aeb9", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "52138e" },
    body: JSON.stringify({
      sessionId: "52138e",
      runId: "pre-fix",
      hypothesisId: "H2",
      location: "work/page.tsx:13",
      message: "work page render entered",
      data: { experienceCount: experience.length, featuredProjectsCount: featuredProjects.length },
      timestamp: 0,
    }),
  }).catch(() => {});
  // #endregion
  return (
    <div className="space-y-10">
      <section>
        <PageHeaderLabel label="work" />
        <h1 className="text-3xl font-semibold">Work</h1>
        <p className="text-[var(--muted)]">Professional experience and featured projects</p>
        <p className="mt-4">Backend engineer focused on distributed systems, observability, and robust API platforms.</p>
        <a href="https://drive.google.com" target="_blank" rel="noreferrer" className="inline-block mt-3">
          Resume -&gt;
        </a>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        {experience.map((role) => (
          <ExpandableSection
            key={role.title}
            title={role.title}
            period={role.period}
            subtitle={`${role.company} · ${role.location}`}
            tags={role.tags}
            bullets={role.bullets}
          />
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Projects</h2>
        {featuredProjects.map((project) => (
          <ExpandableSection
            key={project.title}
            title={project.title}
            period={project.period}
            subtitle={project.subtitle}
            tags={project.tags}
            bullets={[project.summary, ...project.details]}
          />
        ))}
        <Link href="/projects">All projects -&gt;</Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Education</h2>
        <h3 className="font-semibold mt-3">Ramaiah Institute of Technology · Bengaluru</h3>
        <p className="text-[var(--muted)]">B.Tech. Computer Science and Engineering</p>
      </section>
      <section>
        <h3 className="font-semibold mt-3">Vidya Mandir Ind. PU College · Bengaluru</h3>
        <p className="text-[var(--muted)]">PCME</p>
      </section>
    </div>
  );
}
