"use client";

import LiveClock from "@/components/LiveClock";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/shelf", label: "Shelf" },
  { href: "/contact", label: "Contact" },
];

function linkIsActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem("theme") === "light") {
      return "light";
    }
    return "dark";
  });

  const activeIndex = useMemo(
    () => navLinks.findIndex((link) => linkIsActive(link.href, pathname)),
    [pathname],
  );

  const targetIndex = hovered ?? (activeIndex >= 0 ? activeIndex : -1);

  const applyPill = useCallback(() => {
    const pill = pillRef.current;
    const container = trackRef.current;
    if (!pill || !container) return;

    pill.style.transitionProperty = "left, width, opacity";
    pill.style.transitionDuration = "380ms";
    pill.style.transitionTimingFunction = "cubic-bezier(0.25, 0.08, 0.25, 1)";

    if (targetIndex < 0) {
      pill.style.opacity = "0";
      pill.style.left = "0px";
      pill.style.width = "0px";
      return;
    }

    const el = itemRefs.current[targetIndex];
    if (!el) return;

    const cr = container.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    pill.style.opacity = "1";
    pill.style.left = `${er.left - cr.left}px`;
    pill.style.width = `${er.width}px`;
  }, [targetIndex]);

  useLayoutEffect(() => {
    applyPill();
  }, [applyPill, pathname]);

  useLayoutEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => applyPill());
    ro.observe(container);
    window.addEventListener("resize", applyPill);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyPill);
    };
  }, [applyPill]);

  const linkBase =
    "relative z-10 shrink-0 rounded-full px-3 py-1.5 font-mono text-sm no-underline outline-none transition-colors duration-300 ease-out";

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = theme === "dark" ? "light" : "dark";
    root.classList.toggle("light", nextTheme === "light");
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <nav className="navbar-pill mx-auto max-w-[720px] px-6 py-4">
      <div className="flex items-center gap-2.5 rounded-full border border-[var(--nav-border)] bg-[var(--nav-bg)] px-3 py-2 shadow-sm transition-colors duration-300">
        <div className="shrink-0 rounded-full bg-[var(--nav-time-bg)] px-3 py-1.5 transition-colors duration-300">
          <LiveClock className="font-mono text-xs text-[var(--nav-muted)]" />
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar relative flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto py-0.5 sm:gap-1"
          onMouseLeave={() => setHovered(null)}
        >
          <span
            ref={pillRef}
            className="pointer-events-none absolute left-0 top-0.5 bottom-0.5 w-0 rounded-full bg-[var(--nav-pill)] opacity-0 will-change-[left,width] transition-colors duration-300"
            aria-hidden
          />

          {navLinks.map((link, i) => {
            const isOn =
              hovered === i || (hovered === null && i === activeIndex && activeIndex >= 0);
            return (
              <Link
                key={link.href}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                href={link.href}
                onMouseEnter={() => setHovered(i)}
                className={
                  isOn
                    ? `${linkBase} font-semibold text-[var(--nav-active-text)] no-underline`
                    : `${linkBase} text-[var(--nav-muted)] hover:text-[var(--nav-muted-hover)] no-underline`
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="h-5 w-px shrink-0 bg-[var(--nav-divider)] transition-colors duration-300" aria-hidden />

        <button
          type="button"
          onClick={toggleTheme}
          className="flex shrink-0 items-center justify-center rounded-full p-1.5 text-[var(--nav-muted)] transition-colors duration-300 ease-out hover:bg-[var(--nav-time-bg)] hover:text-[var(--nav-muted-hover)]"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </nav>
  );
}
