"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { hiNameFont } from "@/lib/hiNameFont";

const BANNER = "/hi/banner.png";
const AVATAR = "/hi/avatar.png";
const RESUME_URL = "https://drive.google.com";
const HI_FLIP_WORDS = [
  "Backend Engineer",
  "Agentic AI Systems",
  "LLMOps",
  "API Architect",
  "Databases & Cloud",
] as const;

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="block h-[13px] w-[13px] shrink-0" aria-hidden>
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.2.8-.6v-2.2c-3.4.8-4.1-1.4-4.1-1.4-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.8 1.1 1.8 1.1 1 .1 2 .8 2.5 1.8.9.1 1.9.1 2.8 0 .3-.8.8-1.4 1.5-1.8-2.8-.3-5.8-1.4-5.8-6.2 0-1.4.5-2.6 1.3-3.5-.2-.3-.6-1.6.1-3.3 0 0 1.1-.3 3.6 1.3a12 12 0 0 1 6.6 0c2.5-1.6 3.6-1.3 3.6-1.3.7 1.7.3 3 .1 3.3.8.9 1.3 2.1 1.3 3.5 0 4.8-3 5.9-5.8 6.2.5.4 1 .9 1 2v3c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="block h-[13px] w-[13px] shrink-0" aria-hidden>
      <path
        fill="currentColor"
        d="M18.9 2h3.7l-8.1 9.2L24 22h-7.4l-5.8-7.5L4.2 22H.5l8.7-9.9L0 2h7.6l5.3 6.9L18.9 2Zm-1.3 17.8h2L6.5 4.1H4.4l13.2 15.7Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="block h-[13px] w-[13px] shrink-0" aria-hidden>
      <path
        fill="currentColor"
        d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.2 2.3 4.2 5.3v6.4ZM5.2 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13.1H3.4V9H7v11.5Z"
      />
    </svg>
  );
}

/**
 * Twitter-style cover + avatar overlapping the bottom-left of the banner.
 * Place images at `public/hi/banner.png` and `public/hi/avatar.png`.
 */
export default function HiProfileHeader() {
  const [bannerFailed, setBannerFailed] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [flipIndex, setFlipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const onBannerError = useCallback(() => setBannerFailed(true), []);
  const onAvatarError = useCallback(() => setAvatarFailed(true), []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsVisible(false);
      window.setTimeout(() => {
        setFlipIndex((prev) => (prev + 1) % HI_FLIP_WORDS.length);
        setIsVisible(true);
      }, 180);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Inner wrapper = positioning context for PFP. Without it, `bottom-0` was relative to the whole block including text. */}
      <div className="relative -mx-6">
        <div className="relative h-28 overflow-hidden rounded-2xl border border-[var(--contact-panel-border)] sm:h-32 md:h-36">
          {bannerFailed ? (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-zinc-900 to-black" aria-hidden />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- public asset + onError fallback */}
              <img
                src={BANNER}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
                onError={onBannerError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" aria-hidden />
            </>
          )}
        </div>

        <div className="pointer-events-none absolute -bottom-12 left-0 z-10 sm:-bottom-14 sm:left-3">
          <div className="pointer-events-auto size-24 shrink-0 overflow-hidden rounded-xl border-2 border-black bg-[var(--surface)] shadow-lg ring-1 ring-black/40 sm:size-28">
            {!avatarFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={AVATAR}
                alt="Profile"
                width={88}
                height={88}
                className="h-full w-full object-cover object-[50%_18%]"
                onError={onAvatarError}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-700 to-indigo-950 font-mono text-lg font-semibold text-white sm:text-xl">
                N
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="-ml-6 pb-1 pt-14 sm:-ml-3 sm:pt-16">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className={`${hiNameFont.className} flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--text)] sm:text-xl`}>
              <span>Amogh Nagaraj</span>
              <span className="text-sm font-medium text-[var(--muted)] sm:text-base">@nrupa</span>
            </h1>
            <p className="mt-1 h-5 text-xs text-[var(--muted)]/85 sm:text-sm">
              <span
                className={`inline-block transition-all duration-200 ease-out ${
                  isVisible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                }`}
              >
                {HI_FLIP_WORDS[flipIndex]}
              </span>
            </p>
          </div>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-[var(--nav-pill)] px-3 py-1.5 text-sm font-semibold text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition hover:bg-[var(--nav-time-bg)] !no-underline hover:!no-underline"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
              <path fill="currentColor" d="M11 3h2v9l3.3-3.3 1.4 1.4-5.7 5.7-5.7-5.7 1.4-1.4L11 12V3Zm-7 14h16v3H4v-3Z" />
            </svg>
            Resume
          </a>
        </div>




        <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
          Crafting resilient backend systems and blazing-fast APIs. I obsess over clean architecture.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/45 bg-indigo-400 px-4 py-2 text-sm font-semibold text-indigo-950 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] transition hover:border-indigo-300/70 hover:bg-indigo-300 !no-underline hover:!no-underline"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
              <path
                fill="currentColor"
                d="M7 2a1 1 0 0 0-1 1v2H5a2 2 0 0 0-2 2v2h18V7a2 2 0 0 0-2-2h-1V3a1 1 0 1 0-2 0v2H8V3a1 1 0 0 0-1-1ZM21 11H3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11Z"
              />
            </svg>
            Let’s talk
          </Link>

          <a
            href="mailto:amogh.nagaraj03@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition hover:bg-white/10 !no-underline hover:!no-underline"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
              <path
                fill="currentColor"
                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.25-7.4 4.63a2 2 0 0 1-2.2 0L4 8.25V6l7.4 4.63a.5.5 0 0 0 .55 0L20 6v2.25Z"
              />
            </svg>
            Drop a mail
          </a>
        </div>

        <p className="mt-5 text-sm text-[var(--muted)]">
          My <strong>socials</strong>
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {[
            { label: "GitHub", href: "https://github.com/AmoghArakere", icon: <GithubIcon /> },
            { label: "Twitter", href: "https://twitter.com/nrupatungaa", icon: <XIcon /> },
            { label: "LinkedIn", href: "https://linkedin.com/in/amogh07/", icon: <LinkedInIcon /> },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 overflow-visible rounded-xl bg-[var(--nav-pill)] px-2.5 py-1.5 text-sm font-semibold leading-none text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition hover:bg-[var(--nav-time-bg)] !no-underline hover:!no-underline"
            >
              <span className="inline-flex size-4 shrink-0 items-center justify-center overflow-visible text-[var(--muted)]" aria-hidden>{item.icon}</span>
              {item.label}
            </a>
          ))}

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 overflow-visible rounded-xl bg-[var(--nav-pill)] px-2.5 py-1.5 text-sm font-semibold leading-none text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,.06)] transition hover:bg-[var(--nav-time-bg)] !no-underline hover:!no-underline"
          >
            <span className="inline-flex w-4 shrink-0 items-center justify-center overflow-visible text-[var(--muted)]" aria-hidden>
              ≡
            </span>
            More
          </Link>
        </div>
      </div>
    </div>
  );
}
