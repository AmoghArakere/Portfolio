"use client";

import Link from "next/link";
import { useState } from "react";

const EMAIL = "amogh.nagaraj03@gmail.com";

export default function HomeContactActions() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex justify-start p-1 text-xs font-mono tracking-wide text-[var(--home-link)]">
      <div className="flex flex-wrap items-center justify-start gap-6">
        <Link
          href="/contact"
          className="!text-[var(--home-link)] visited:!text-[var(--home-link)] transition-colors duration-200 hover:!text-[var(--home-link-hover)] !no-underline hover:!no-underline"
        >
          Get in touch
        </Link>
        <div className="relative inline-flex">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-[var(--home-link)] transition-colors duration-200 hover:text-[var(--home-link-hover)]"
            aria-label="Copy email address"
            title={copied ? "Copied" : "Copy email"}
          >
            Email
            <svg
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h9" />
            </svg>
          </button>
          <span
            aria-live="polite"
            className={`border-hairline pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[var(--text)] shadow-[0_8px_20px_rgba(0,0,0,.25)] transition-all duration-200 ${
              copied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            Copied
          </span>
        </div>
        <Link
          href="/cli"
          className="!text-[var(--home-link)] visited:!text-[var(--home-link)] transition-colors duration-200 hover:!text-[var(--home-link-hover)] !no-underline hover:!no-underline"
        >
          &gt;_ CLI
        </Link>
      </div>
    </div>
  );
}
