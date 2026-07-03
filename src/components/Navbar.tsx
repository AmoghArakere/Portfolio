"use client";

import LiveClock from "@/components/LiveClock";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
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
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.classList.toggle("light", next === "light");
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        // ignore storage failures (private mode, etc.)
      }
      return next;
    });
  }, []);

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
    "relative z-10 shrink-0 rounded-full px-2.5 py-1 font-mono text-sm no-underline outline-none transition-colors duration-300 ease-out";

  return (
    <nav className="navbar-pill pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-6 py-3">
      <div className="navbar-pill-bar pointer-events-auto relative inline-block w-fit max-w-[calc(100vw-3rem)] rounded-full transition-[border-color,box-shadow] duration-300">
        <div className="navbar-pill-glass backdrop-blur-2xl backdrop-saturate-150" aria-hidden />
        <div className="navbar-pill-inner inline-flex items-center gap-2 px-2.5 py-1.5">
          <div className="navbar-pill-time shrink-0 rounded-full px-2.5 py-1 transition-colors duration-300">
            <div className="navbar-pill-time-glass backdrop-blur-xl backdrop-saturate-150" aria-hidden />
            <LiveClock className="navbar-pill-time-inner font-mono text-xs text-[var(--nav-muted)]" />
          </div>

          <div
            ref={trackRef}
            className="no-scrollbar relative flex items-center gap-0.5 overflow-x-auto sm:gap-1"
            onMouseLeave={() => setHovered(null)}
          >
          <span
            ref={pillRef}
            className="navbar-pill-highlight pointer-events-none absolute left-0 top-0 bottom-0 w-0 rounded-full opacity-0 will-change-[left,width] transition-[left,width,opacity] duration-[380ms] ease-[cubic-bezier(0.25,0.08,0.25,1)]"
            aria-hidden
          />

          {navLinks.map((link, i) => {
            const isOn =
              hovered === i || (hovered === null && i === activeIndex && activeIndex >= 0);
            return (
              <div key={link.href} className="relative flex items-center">
                <Link
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
              </div>
            );
          })}
        </div>

        <div className="h-4 w-px shrink-0 bg-[var(--nav-divider)] transition-colors duration-300" aria-hidden />

        <button
          type="button"
          onClick={toggleTheme}
          className="flex shrink-0 items-center justify-center rounded-full border border-transparent p-1 text-[var(--nav-muted)] transition-colors duration-200 hover:border-white/10 hover:bg-[var(--nav-pill)] hover:text-[var(--nav-muted-hover)]"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        </div>
      </div>
    </nav>
  );
}
