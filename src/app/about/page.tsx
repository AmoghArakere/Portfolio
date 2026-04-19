import type { Metadata } from "next";
import Image from "next/image";
import PageHeaderLabel from "@/components/PageHeaderLabel";

export const metadata: Metadata = {
  title: "About | Nrupa",
  description: "Journey, tools, and philosophy behind what I build.",
};

const stackRows = [
  ["Backend & APIs", "Go, Rust, TypeScript, Express, Hono, gRPC, REST, WebSockets, tRPC, Node.js"],
  ["Data & Storage", "PostgreSQL, Redis, MongoDB, Prisma, Drizzle, GORM, sqlC, sqlX"],
  ["Infrastructure", "Docker, Kafka, NATS, RabbitMQ, Pulsar, Prometheus, Grafana"],
  ["Frontend", "React, Next.js, TypeScript, JavaScript"],
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section>
        <PageHeaderLabel label="about" />
        <h1 className="text-3xl font-semibold">About Me</h1>
        <p className="text-[var(--muted)]">The journey, the tools, and the philosophy behind what I build.</p>
      </section>

      <section className="flex items-center gap-4 border border-[var(--border)] p-4">
        <Image src="/assets/avatar.jpg" className="w-16 h-16 rounded-full" alt="Amogh" width={64} height={64} />
        <div>
          <p className="font-semibold">nrupa / Amogh Nagaraj</p>
          <p className="text-[var(--muted)] text-sm">engineering my way through</p>
          <p className="text-[var(--muted)] text-sm">India</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">My Journey</h2>
        <p>I started by shipping small web products, then moved deeper into backend internals where correctness and latency matter.</p>
        <p>Over time, distributed systems became the center of my work: consensus, storage engines, observability, and fault tolerance.</p>
        <p>I enjoy building practical systems that are understandable by teams, not just technically impressive in isolation.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Stack & Style</h2>
        {stackRows.map(([category, tech]) => (
          <p key={category}>
            <span className="text-[var(--muted)]">{category}: </span>
            {tech}
          </p>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Philosophy</h2>
        <p>I optimize for clarity first, then performance. Simple systems are easier to debug, evolve, and trust under pressure.</p>
        <p>I care about ethical engineering: software should be reliable, transparent, and respectful of user time and data.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Deep Understanding", "Knowing not just how to build, but why systems behave the way they do."],
            ["Pragmatic Solutions", "Choosing clear, maintainable designs over unnecessary complexity."],
            ["Continuous Learning", "Staying curious through papers, production incidents, and open-source work."],
            ["Ethical Development", "Building technology that values reliability, privacy, and people."],
          ].map(([title, body]) => (
            <div key={title} className="border border-[var(--border)] p-4">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-[var(--muted)] mt-1">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
