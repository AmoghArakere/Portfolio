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
    <div className="flex justify-start p-1 text-xs font-mono tracking-wide text-white/70">
      <div className="flex flex-wrap items-center justify-start gap-6">
        <Link
          href="/contact"
          className="!text-white/70 visited:!text-white/70 transition-colors duration-200 hover:!text-white !no-underline hover:!no-underline"
        >
          Get in touch
        </Link>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 text-white/70 transition-colors duration-200 hover:text-white"
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
        <Link
          href="/cli"
          className="!text-white/70 visited:!text-white/70 transition-colors duration-200 hover:!text-white !no-underline hover:!no-underline"
        >
          &gt;_ CLI
        </Link>
      </div>
    </div>
  );
}
