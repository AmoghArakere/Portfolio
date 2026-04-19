import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import HomeHeroName from "@/components/HomeHeroName";
import PageHeaderLabel from "@/components/PageHeaderLabel";
import ProgressBar from "@/components/ProgressBar";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import TechBadge from "@/components/TechBadge";
import { getAllPosts } from "@/lib/mdx";
import { nowData } from "@/data/now";
import { getSpotifyNowPlaying } from "@/lib/spotify";
import { getGithubContributions } from "@/lib/github";
import { homeNameFont } from "@/lib/homeNameFont";

export const metadata: Metadata = {
  title: "Amogh Nagaraj | Nrupa - Backend Engineer",
  description: "Backend engineer specializing in Go and Rust, building distributed systems and scalable backends.",
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

export default async function Home() {
  const latestPost = (await getAllPosts())[0];
  const githubUser = process.env.GITHUB_USERNAME ?? "nrupa";
  const [spotify, contributions] = await Promise.all([
    getSpotifyNowPlaying(),
    getGithubContributions(githubUser),
  ]);

  return (
    <div className="space-y-16">
      <section>
        <PageHeaderLabel label="home" />
        <HomeHeroName fontClassName={homeNameFont.className} />
        <p className="text-[var(--muted)] italic mt-1">nrupa</p>
        <div className="mt-6 space-y-4">
          <p>I spend most of my time in Go and Rust, building backends that do not fall over and systems that solve when they need to.</p>
          <p>I am down to databases, distributed systems, and the kind of problems where you have to think about what happens when things go wrong.</p>
          <p>
            When I figure something out, I write about it. When an idea works, I ship it. You can read on <Link href="/blog">blog</Link>, browse builds on{" "}
            <Link href="/projects">projects</Link>, and follow the work timeline in <Link href="/work">work</Link>.
          </p>
        </div>
        <Link href="/hi" className="inline-block mt-6 rounded-lg border border-[var(--border)] px-3 py-1 transition-colors hover:bg-[var(--surface)]">
          Everything at a glance -&gt;
        </Link>
        <div className="group mt-6 overflow-hidden rounded-xl border border-[var(--border)] divide-y divide-[var(--border)] transition-[background-color,border-color] duration-200 hover:border-[var(--nav-border)] hover:bg-[var(--surface)]">
          <div className="flex items-center justify-between gap-3 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
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
        <h2 className="text-xl font-semibold">Now</h2>
        <p className="text-[var(--muted)] mt-1">A snapshot of what I am focused on right now. Reading, thinking, building.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-3">
          <div className="rounded-xl border border-[var(--border)] p-4 bg-[#2d2510]/50">
            <p className="text-xs text-[var(--muted)] mb-1">Building</p>
            <Link href={nowData.building.href} className="font-semibold text-lg">
              {nowData.building.title}
            </Link>
            <p className="text-[var(--muted)] mt-1">{nowData.building.description}</p>
            <div className="flex gap-2 mt-2">
              {nowData.building.tags.map((tag) => (
                <TechBadge key={tag} label={tag} />
              ))}
            </div>
            <ProgressBar value={nowData.building.progress} />
          </div>
          <div className="rounded-xl border border-[var(--border)] p-4 bg-[#0f1e28]/35">
            <p className="text-sm text-[var(--muted)] mb-2">Reading</p>
            <ul className="space-y-1">
              {nowData.reading.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--border)] p-4 bg-[#2b1b2a]/45">
            <p className="text-sm text-[var(--muted)] mb-2">{"// thoughts"}</p>
            <div className="space-y-1 text-[var(--muted)]">
              {nowData.thoughts.map((thought) => (
                <p key={thought}>
                  <span className="text-[var(--accent)]">{"// "}</span>
                  {thought}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="group overflow-hidden rounded-xl border border-[var(--border)] transition-[background-color,border-color] duration-200 hover:border-[var(--nav-border)] hover:bg-[var(--surface)]">
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
                          className="aspect-square w-full min-h-[2px] rounded-[3px] border border-black/10"
                          style={{ backgroundColor: day.contributionCount === 0 ? "#1a1a1a" : day.color }}
                          title={`${day.date} · ${day.contributionCount} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-[var(--border)] px-4 py-3">
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

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Latest writing</h2>
        {latestPost ? (
          <BlogCard
            slug={latestPost.slug}
            title={latestPost.title}
            excerpt={latestPost.excerpt}
            date={latestPost.date}
            readTime={latestPost.readTime}
            tags={latestPost.tags}
          />
        ) : null}
      </section>

      <section className="rounded-xl border border-[var(--border)] p-3 text-sm text-[var(--muted)]">
        <Link href="/newsletter">Newsletter</Link> · <Link href="/contact">Get in touch</Link>
      </section>
    </div>
  );
}
