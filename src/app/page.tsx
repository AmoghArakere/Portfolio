import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import HomeHeroName from "@/components/HomeHeroName";
import HomeContactActions from "@/components/HomeContactActions";
import HomeWelcomeAvatar from "@/components/HomeWelcomeAvatar";
import MovingBorderLink from "@/components/MovingBorderLink";
import PageHeaderLabel from "@/components/PageHeaderLabel";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import { getAllPosts } from "@/lib/mdx";
import { getSpotifyNowPlaying } from "@/lib/spotify";
import { getGithubContributions } from "@/lib/github";
import { homeNameFont } from "@/lib/homeNameFont";

export const metadata: Metadata = {
  title: "Amogh Nagaraj | Nrupa",
  description: "Backend engineer specializing in Go and Rust, building distributed systems and scalable backends.",
};

const RESUME_URL = "https://drive.google.com";

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

export default async function Home() {
  const latestPost = (await getAllPosts())[0];
  const githubUser = process.env.GITHUB_USERNAME ?? "AmoghArakere";
  const [spotify, contributions] = await Promise.all([
    getSpotifyNowPlaying(),
    getGithubContributions(githubUser),
  ]);

  const homeCard =
    "rounded-xl bg-[var(--surface)]/55 backdrop-blur-md transition-colors duration-200 hover:bg-[var(--surface)]/80";

  return (
    <div className="space-y-16">
      <section className="overflow-visible">
        <PageHeaderLabel label="home" />
        <HomeHeroName fontClassName={homeNameFont.className} />
        <div className="mt-1 flex items-center gap-3">
          <p className="text-zinc-500 italic">nrupa</p>
          <span className="h-px w-14 rounded-full bg-zinc-500/70" aria-hidden />
        </div>
        <div className="mt-6 grid gap-6 overflow-visible md:grid-cols-[1fr_240px] md:items-start">
          <div>
            <div className="flex gap-4">
              <span className="w-px self-stretch rounded-full bg-zinc-500/70" aria-hidden />
              <div className="space-y-4">
                <p>
                  I spend most of my time in the{" "}
                  <strong className="text-indigo-300 font-semibold">.NET ecosystem</strong>,{" "}
                  <strong className="text-indigo-300 font-semibold">Go</strong>, and{" "}
                  <strong className="text-indigo-300 font-semibold">Azure</strong>, building backends that hold up
                  under pressure. I work on databases and distributed systems, where failure is expected and
                  tradeoffs are part of the job.
                </p>
                <p>
                  My forte lies in{" "}
                  <strong className="text-indigo-300 font-semibold">Backend engineering</strong>, designing systems
                  that scale, fail gracefully, and keep working in production. I focus on building things that
                  last, not just things that run.
                </p>
                <p>
                  I am currently exploring <strong className="text-indigo-300 font-semibold">Agentic AI</strong> and
                  experimenting with different AI tools to stay close to where the field is heading.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <MovingBorderLink href="/hi">Everything at a glance</MovingBorderLink>
            </div>
          </div>
          <div className="overflow-visible md:-mt-16">
            <HomeWelcomeAvatar />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Now</h2>
        <p className="text-[var(--muted)] mt-1">What I am listening to right now.</p>
        <div className={`group mt-6 overflow-hidden ${homeCard}`}>
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--tag-bg)]">
                {spotify?.albumImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={spotify.albumImageUrl} alt={spotify.title} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div>
                <SpotifyNowPlaying
                  key={`${spotify?.title ?? "none"}-${spotify?.progressMs ?? 0}`}
                  isPlaying={Boolean(spotify?.isPlaying)}
                  title={spotify?.title ?? "Connect Spotify to show live track"}
                  artist={spotify?.artist ?? "No track available"}
                  progressMs={spotify?.progressMs}
                  durationMs={spotify?.durationMs}
                />
              </div>
            </div>
            {spotify?.songUrl ? (
              <a
                href={spotify.songUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--nav-pill)] text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition-colors hover:bg-[var(--nav-time-bg)] hover:text-emerald-300 !no-underline hover:!no-underline"
                aria-label="Open track on Spotify"
              >
                <ExternalLinkGlyph className="size-3" />
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section>
        <div className={`group overflow-hidden ${homeCard}`}>
          <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-4">
            <h2 className="text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)]">
              Contributions
            </h2>
            <a
              href={`https://github.com/${githubUser}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--nav-pill)] text-emerald-400 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition-colors hover:bg-[var(--nav-time-bg)] hover:text-emerald-300 !no-underline hover:!no-underline"
              aria-label={`${githubUser} on GitHub (opens in new tab)`}
            >
              <ExternalLinkGlyph className="size-3" />
            </a>
          </div>
          {contributions ? (
            <>
              <div className="px-4 pb-4 pt-0">
                <div className="flex w-full min-w-0 justify-between gap-0.5 text-[10px] leading-tight text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)] sm:text-xs">
                  {contributions.months.map((month, idx) => (
                    <span key={`${month}-${idx}`} className="min-w-0 flex-1 text-center">
                      {month}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex w-full min-w-0 gap-[2px]">
                  {contributions.weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex min-w-0 flex-1 flex-col gap-[2px]">
                      {week.map((day) => (
                        <div
                          key={day.date}
                          className="aspect-square w-full min-h-[2px] rounded-[3px]"
                          style={{ backgroundColor: day.contributionCount === 0 ? "var(--contrib-empty)" : day.color }}
                          title={`${day.date} · ${day.contributionCount} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-hairline border-t px-4 py-3">
                <p className="text-xs text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)]">
                  {contributions.totalContributions} contributions in the last year
                </p>
              </div>
            </>
          ) : (
            <div className="p-4">
              <p className="text-sm text-[var(--muted)]">Add GitHub token + username in env to display live contributions graph.</p>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <HomeContactActions />
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[var(--nav-pill)] px-3 py-1.5 text-xs font-semibold text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition hover:bg-[var(--nav-time-bg)] !no-underline hover:!no-underline"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
              <path fill="currentColor" d="M11 3h2v9l3.3-3.3 1.4 1.4-5.7 5.7-5.7-5.7 1.4-1.4L11 12V3Zm-7 14h16v3H4v-3Z" />
            </svg>
            Resume
          </a>
        </div>
      </section>
    </div>
  );
}
