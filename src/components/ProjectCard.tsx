import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  variant?: "bento" | "plain";
  className?: string;
};

export default function ProjectCard({ project, variant = "bento", className = "" }: ProjectCardProps) {
  const isPlain = variant === "plain";
  const githubLabel = project.github.replace("https://", "");

  if (isPlain) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className={`group block rounded-xl bg-[var(--surface)]/55 p-5 backdrop-blur-md transition-colors duration-200 hover:bg-[var(--surface)]/80 !no-underline hover:!no-underline ${className}`}
      >
        <h2 className="text-xl font-semibold">{project.name}</h2>
        <p className="mt-1">{project.tagline}</p>
        <p className="mt-3 text-[var(--muted)]">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm">{githubLabel} -&gt;</p>
        {project.live ? <p className="mt-1 text-sm text-[var(--muted)]">{project.live.replace("https://", "")}</p> : null}
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block h-full min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-[0_10px_30px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-0.5 hover:border-white/20 !no-underline hover:!no-underline ${className}`}
    >
      <Image
        src="/hi/banner.png"
        alt=""
        fill
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 100vw, 50vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/95 via-black/70 to-transparent" aria-hidden />
      <div className="absolute right-4 top-4 z-10 text-zinc-200">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7 17L17 7" />
          <path d="M9 7h8v8" />
          <path d="M15 17H7V9" />
        </svg>
      </div>
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-white/20 bg-black/45 px-2 py-0.5 text-[11px] text-zinc-200">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-semibold leading-tight text-white transition-colors duration-200 group-hover:text-indigo-300 group-hover:animate-project-title-wobble">
          {project.name}
        </h2>
        <p className="mt-1 text-sm text-zinc-200">{project.tagline}</p>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-300">{project.description}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" aria-hidden />
    </Link>
  );
}
