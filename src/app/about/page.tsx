import type { Metadata } from "next";
import Image from "next/image";
import ExpandableSection from "@/components/ExpandableSection";
import PageHeaderLabel from "@/components/PageHeaderLabel";
import { experience } from "@/data/work";

export const metadata: Metadata = {
  title: "About | Nrupa",
  description: "Journey, tools, and philosophy behind what I build.",
};

const stackRows = [
  ["Backend & APIs", "Go, .NET Core, C#, gRPC, REST, OAuth2 / JWT"],
  ["Data & Storage", "PostgreSQL, Redis, MongoDB, Elasticsearch, ClickHouse, Kafka, Azure Service Bus"],
  ["Infrastructure & Observability", "Docker, Prometheus, Grafana, OpenTelemetry, Loki, App Insights"],
  ["Cloud", "Azure Functions, Azure APIM, Azure Storage, Azure App Service, Azure DevOps Services"],
  ["Frontend", "React, JavaScript"],
  ["AI & LLM", "LangChain, LangGraph, Cursor, Claude Code, Codex, OpenCode, Kimi Code, Pinecone"],
  ["Tools", "Git, Postman, Black Duck, ServiceNow"],
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section>
        <PageHeaderLabel label="about" />
        <h1 className="text-3xl font-semibold">About Me</h1>
        <p className="text-[var(--muted)]">The journey, the tools, and the philosophy behind what I build.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">

          <Image src="/hi/avatar.png" className="h-48 w-48 rounded-xl object-cover object-[50%_18%]" alt="Amogh" width={192} height={192} />
          <div className="mt-4 max-w-[220px] space-y-1.5">
            <p className="text-sm font-semibold">nrupa / Amogh Nagaraj</p>
            <p className="-ml-0.5 font-mono text-xs tracking-wide text-[var(--muted)]">Ship it. Own it. Optimize it.</p>
          </div>
        </aside>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">My Journey</h2>
            <p className="leading-relaxed">
              Started with hardware, not code. <strong>Digital Electronics</strong>, <strong>Analog Electronics</strong>, <strong>Wireless Comms</strong>, <strong>Power Electronics</strong>, <strong>Semiconductors</strong> all before a single line of software. That background quietly shaped how to think about systems from the ground up.
            </p>
            <p className="leading-relaxed">
              University brought the software world: <strong>Operating Systems</strong>, <strong>Databases</strong>, <strong>Compilers</strong>, <strong>Networking</strong>, <strong>Cloud</strong>, <strong>DevOps</strong>, <strong>Data Structures and Algorithms</strong>, <strong>Big Data</strong>. Every concept picked up got implemented right away, however small. The learning style became: build it to actually understand it, not just read about it.
            </p>
            <p className="leading-relaxed">
              That habit led to real projects across <strong>Databases</strong>, <strong>REST APIs</strong>, <strong>Cloud Platforms</strong>. Along the way, a <strong>first-principles thinking</strong> took hold, understanding <em>why</em> a system works, not just how to configure it. That is what keeps the approach <strong>stack-agnostic</strong>. The tool changes, the thinking does not.
            </p>
            <p className="leading-relaxed">
              Currently a .NET developer, but the curiosity does not stop at the job title. Actively exploring AI agents, workflows, and the math underneath, and looking to move into the AI space.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Tech Stack</h2>
            {stackRows.map(([category, tech]) => (
              <div key={category} className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full border border-zinc-500/70 bg-transparent px-3 py-1 text-xs font-semibold text-[var(--text)]">
                  {category}
                </span>
                <span className="text-[var(--muted)]">:</span>
                <p className="text-[var(--text)]">{tech}</p>
              </div>
            ))}
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

          <section className="space-y-2 pb-8">
            <h2 className="text-xl font-semibold">Open Source / Contributions</h2>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Education</h2>
            <div className="space-y-3">
              <div className="group relative overflow-hidden rounded-xl border border-indigo-400/35 bg-transparent p-4">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl border border-indigo-300/40 opacity-0 shadow-[0_0_0.7rem_rgba(129,140,248,0.28)] transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold">Ramaiah Institute of Technology · Bengaluru</h3>
                    <span className="text-sm text-[var(--muted)]">2021-2025</span>
                  </div>
                  <p className="mt-1 text-[var(--muted)]">B.Tech. Computer Science and Engineering</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-indigo-400/35 bg-transparent p-4">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl border border-indigo-300/40 opacity-0 shadow-[0_0_0.7rem_rgba(129,140,248,0.28)] transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold">Vidya Mandir Ind. PU College · Bengaluru</h3>
                    <span className="text-sm text-[var(--muted)]">2019-2021</span>
                  </div>
                  <p className="mt-1 text-[var(--muted)]">PCME</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
