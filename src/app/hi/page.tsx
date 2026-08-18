import type { Metadata } from "next";
import Link from "next/link";
import HiProfileHeader from "@/components/HiProfileHeader";
import CometCard from "@/components/CometCard";
import InfiniteTechMarquee from "@/components/InfiniteTechMarquee";
import LastFmRecentTrack from "@/components/LastFmRecentTrack";
import HiExperienceCard from "@/components/HiExperienceCard";
import FocusProjectCards from "@/components/FocusProjectCards";
import { getLastFmRecentTrack } from "@/lib/lastfm";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Hi | mandakini",
  description: "Crafting resilient backend systems and blazing-fast APIs. I obsess over clean architecture, type safety, and making things scale.",
};

function ExternalLinkGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

type HiExperienceHighlight = {
  company: string;
  bullets: string[];
  role?: string;
  period?: string;
  location?: string;
  roles?: Array<{
    title: string;
    period: string;
    location: string;
    employmentType?: string;
  }>;
};

export default async function HiPage() {
  const lastfmResult = await getLastFmRecentTrack();
  const topProjects = projects.slice(0, 4);
  const experienceHighlights: HiExperienceHighlight[] = [
    {
      company: "Polaris Inc.",
      roles: [
        { title: "Software Engineer", period: "Jul 2027 - Present", location: "Bengaluru", employmentType: "Full-time" },
        { title: "Associate Software Engineer", period: "Jul 2025 - Jul 2027", location: "Bengaluru", employmentType: "Full-time" },
      ],
      bullets: [
        "Built and maintained backend APIs for internal and client-facing workflows.",
        "Worked on auth flows, role checks, and safe tenant data boundaries.",
        "Improved endpoint performance with query/index tuning and payload cleanups.",
        "Added observability with traces and metrics for faster issue debugging.",
      ],
    },
    {
      company: "Freelance",
      role: "Freelance Developer",
      period: "Sep 2024 - Dec 2024",
      location: "Bengaluru",
      bullets: [
        "Delivered custom full-stack features for small business and portfolio products.",
        "Implemented API + database changes with migration-safe rollout steps.",
        "Set up deployment pipelines and production bug-fix cycles for clients.",
        "Collaborated on scope, timeline, and iterative delivery with weekly milestones.",
      ],
    },
  ];

  const homeCard =
    "rounded-xl bg-[var(--surface)]/55 backdrop-blur-md transition-colors duration-200 hover:bg-[var(--surface)]/80";

  return (
    <div className="-mt-8 space-y-5 sm:-mt-10">
      <HiProfileHeader />

      <section className="-ml-6 space-y-2 pt-2 sm:-ml-3" aria-label="Tech stack marquee">
        <p className="text-sm text-[var(--muted)]">My everyday <strong>toolkit</strong></p>
        <InfiniteTechMarquee />
      </section>

      <section className="-ml-6 sm:-ml-3" aria-label="Last.fm recent track">
        <div className={`group ${homeCard}`}>
          <div className="p-4">
            <LastFmRecentTrack result={lastfmResult} />
          </div>
        </div>
      </section>

      <section className="-ml-6 space-y-3 rounded-2xl bg-[var(--surface)]/35 p-4 sm:-ml-3">
        <div className="flex items-center gap-2">
          <span className="h-8 w-1 rounded-full bg-indigo-400/90" aria-hidden />
          <h2 className="text-xl font-semibold">Experience</h2>
        </div>
        <div className="space-y-3">
          {experienceHighlights.map((role, idx) => (
            <div key={`${role.company}-${role.role ?? role.roles?.[0]?.title ?? "role"}`}>
              {idx > 0 && <hr className="border-t border-indigo-400/50" />}
              <HiExperienceCard
                company={role.company}
                role={role.role}
                period={role.period}
                location={role.location}
                roles={role.roles}
                bullets={role.bullets}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="-ml-6 space-y-3 sm:-ml-3" aria-label="Projects highlight">
        <div className="flex items-center gap-2">
          <span className="h-8 w-1 rounded-full bg-indigo-400/90" aria-hidden />
          <h2 className="text-xl font-semibold">Projects</h2>

        </div>
        <FocusProjectCards projects={topProjects} />
        <div className="flex justify-center pt-1">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-2xl border border-indigo-400/35 bg-indigo-500/10 px-5 py-2 font-semibold text-indigo-200 transition hover:border-indigo-300/60 hover:bg-indigo-500/20 !no-underline hover:!no-underline"
          >
            View more projects
            <ExternalLinkGlyph className="size-4" />
          </Link>
        </div>
      </section>

      <section className="-ml-6 space-y-3 sm:-ml-3" aria-label="Coding profiles">
        <div className="flex items-center gap-2">
          <span className="h-8 w-1 rounded-full bg-indigo-400/90" aria-hidden />
          <h2 className="text-xl font-semibold">Coding profiles</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "LeetCode", sub: "mandakinitunga", href: "https://leetcode.com/u/mandakinitunga", color: "from-orange-500/15", logo: "/coding/leetcode.png" },
            { label: "Codeforces", sub: "mandakini", href: "https://codeforces.com/profile/mandakini", color: "from-blue-500/15", logo: "/coding/codeforces.png" },
            { label: "Deep-ML", sub: "Amogh AN", href: "https://www.deep-ml.com/profile/23XxjPqSMuRbG2Cof9HyDqIp5pU2", color: "from-indigo-500/15", logo: "/coding/deepml.png" },
            { label: "TensorTonic", sub: "mandakinitunga", href: "https://www.tensortonic.com/profile/mandakinitunga", color: "from-violet-500/15", logo: "/coding/tensortonic.png" },
            { label: "PaperCode", sub: "profile", href: "https://papercode.in/profile", color: "from-emerald-500/15", logo: "/coding/papercode.png" },
          ].map((p) => (
            <CometCard key={p.label} className="rounded-2xl">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className={`flex flex-col gap-2 rounded-2xl bg-gradient-to-br ${p.color} via-transparent to-transparent p-4 !no-underline hover:!no-underline`}
              >
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logo} alt={p.label} className="h-6 w-6 rounded object-contain" />
                  <span className="text-base font-semibold text-[var(--text)]">{p.label}</span>
                </div>
              </a>
            </CometCard>
          ))}
        </div>
      </section>
    </div>
  );
}
