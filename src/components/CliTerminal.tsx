"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cliUrbanDisplay } from "@/lib/cliUrbanFont";
import { projects as projectsData } from "@/data/projects";
import { experience } from "@/data/work";

export type CliPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
};

const SOCIAL = {
  github: "https://github.com/AmoghArakere",
  twitter: "https://twitter.com/nrupatungaa",
  linkedin: "https://linkedin.com/in/amogh07/",
} as const;

const SKILLS = [
  "Go",
  "Rust",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "Microsoft Azure",
  "OpenTelemetry",
  "Docker",
  "Distributed systems",
];

const HELP_ROWS: { cmd: string; desc: string }[] = [
  { cmd: "help", desc: "Display available commands" },
  { cmd: "whoami", desc: "Display information about me" },
  { cmd: "work", desc: "Show work experience" },
  { cmd: "projects", desc: "List my projects" },
  { cmd: "project <slug>", desc: "View details about a specific project" },
  { cmd: "blog", desc: "Show recent blog posts" },
  { cmd: "post <slug>", desc: "View a specific blog post summary" },
  { cmd: "tags", desc: "List all blog tags" },
  { cmd: "tag <name>", desc: "Show posts with a specific tag" },
  { cmd: "skills", desc: "List my technical skills" },
  { cmd: "contact", desc: "How to get in touch" },
  { cmd: "clear", desc: "Clear the terminal" },
  { cmd: "exit", desc: "Return to homepage" },
  { cmd: "github", desc: "Open my GitHub profile" },
  { cmd: "twitter", desc: "Open my Twitter profile" },
  { cmd: "linkedin", desc: "Open my LinkedIn profile" },
  { cmd: "open <path|url>", desc: "Open a page on this site or an external URL" },
  { cmd: "summon coffee", desc: "Developer magic…" },
];

function TrafficLights() {
  return (
    <div className="flex gap-1.5 pl-0.5" aria-hidden>
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

function NrupaMark() {
  return (
    <div className="relative select-none" aria-hidden>
      <div className="relative">
        <p
          className={`${cliUrbanDisplay.className} text-[clamp(2.85rem,13vw,5.25rem)] leading-[0.95] tracking-tight text-white`}
          style={{
            textShadow:
              "0 2px 0 rgb(0 0 0 / 0.85), 0 0 24px rgb(255 255 255 / 0.15), 3px 0 0 rgb(99 102 241 / 0.35), -3px 0 0 rgb(56 189 248 / 0.2)",
          }}
        >
          NRUPA
        </p>
        <p className="mt-2 max-w-[18rem] font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.42em] text-zinc-500">
          interactive shell
        </p>
      </div>
    </div>
  );
}

function PromptLine({ cmd }: { cmd: string }) {
  return (
    <p className="font-mono text-[13px] leading-relaxed">
      <span className="text-indigo-400">nrupa@terminal</span>
      <span className="text-zinc-100">:~$ </span>
      <span className="text-white">{cmd}</span>
    </p>
  );
}

function HelpBlock() {
  return (
    <div className="space-y-2 font-mono text-[13px] leading-relaxed">
      <p className="text-indigo-300">Available commands:</p>
      <div className="grid max-w-xl grid-cols-[auto_1fr] gap-x-8 gap-y-1">
        {HELP_ROWS.map((row) => (
          <div key={row.cmd} className="contents">
            <span className="font-semibold text-zinc-100">{row.cmd}</span>
            <span className="text-zinc-300">{row.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlainLines({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-0.5 font-mono text-[13px] text-zinc-300">
      {lines.map((line, i) => (
        <p key={i} className="whitespace-pre-wrap break-words">
          {line}
        </p>
      ))}
    </div>
  );
}

function Pill({
  children,
  onClick,
  icon,
}: {
  children: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-indigo-800/70 bg-indigo-950/50 px-2.5 py-1 font-mono text-[11px] text-zinc-200 transition hover:border-indigo-600/80 hover:bg-indigo-950/90 hover:text-indigo-100"
    >
      <span className="text-zinc-400 [&>svg]:size-3.5">{icon}</span>
      {children}
    </button>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconCoffee() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

type Block =
  | { id: string; kind: "prompt"; cmd: string }
  | { id: string; kind: "help" }
  | { id: string; kind: "lines"; lines: string[] };

function renderBlock(b: Block) {
  switch (b.kind) {
    case "prompt":
      return <PromptLine key={b.id} cmd={b.cmd} />;
    case "help":
      return <HelpBlock key={b.id} />;
    case "lines":
      return <PlainLines key={b.id} lines={b.lines} />;
    default:
      return null;
  }
}

export default function CliTerminal({ posts }: { posts: CliPost[] }) {
  const router = useRouter();
  const uid = useId();
  const idRef = useRef(0);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [blocks, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runRaw = useCallback(
    (raw: string) => {
      const nextBlockId = () => `${uid}-${idRef.current++}`;
      const pushOutput = (lines: string[]) => {
        if (lines.length === 0) return;
        setBlocks((prev) => [...prev, { id: nextBlockId(), kind: "lines", lines }]);
      };

      const trimmed = raw.trim();
      if (!trimmed) return;

      const parts = trimmed.split(/\s+/);
      const cmd0 = parts[0].toLowerCase();
      const args = parts.slice(1);

      const openUrl = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
      };

      const navigate = (path: string) => {
        router.push(path);
      };

      if (cmd0 === "clear") {
        setBlocks([]);
        return;
      }

      setBlocks((prev) => [...prev, { id: nextBlockId(), kind: "prompt", cmd: trimmed }]);

      if (cmd0 === "exit") {
        navigate("/");
        return;
      }

      if (cmd0 === "help") {
        setBlocks((prev) => [...prev, { id: nextBlockId(), kind: "help" }]);
        return;
      }

      if (cmd0 === "whoami" || cmd0 === "about") {
        pushOutput([
          "Amogh Nagaraj (nrupa)",
          "Backend engineer — Go, Rust, TypeScript, distributed systems, and the messy edge of production.",
          "Site: nrupa.tech",
        ]);
        return;
      }

      if (cmd0 === "work") {
        const lines: string[] = [];
        experience.forEach((role) => {
          lines.push(`${role.title} @ ${role.company} (${role.period})`);
          lines.push(`  ${role.location} · ${role.tags.join(", ")}`);
          role.bullets.slice(0, 3).forEach((b) => lines.push(`  · ${b}`));
          lines.push("");
        });
        if (lines.length && lines[lines.length - 1] === "") lines.pop();
        pushOutput(lines);
        return;
      }

      if (cmd0 === "projects") {
        const lines = projectsData.map((p) => `  ${p.slug.padEnd(14)} — ${p.tagline}`);
        pushOutput(["Projects:", ...lines, "", "Run: project <slug> for details."]);
        return;
      }

      if (cmd0 === "project") {
        const slug = args[0]?.toLowerCase();
        if (!slug) {
          pushOutput(["Usage: project <slug>", "Example: project juzfs"]);
          return;
        }
        const p = projectsData.find((x) => x.slug.toLowerCase() === slug);
        if (!p) {
          pushOutput([`No project named "${slug}". Try: projects`]);
          return;
        }
        pushOutput([
          `${p.name} [${p.language}]`,
          p.tagline,
          "",
          p.description,
          "",
          `Tags: ${p.tags.join(", ")}`,
          `GitHub: ${p.github}`,
          ...(p.live ? [`Live: ${p.live}`] : []),
          `Local: /projects/${p.slug}`,
        ]);
        return;
      }

      if (cmd0 === "blog") {
        if (posts.length === 0) {
          pushOutput(["No posts indexed yet."]);
          return;
        }
        const lines = posts.slice(0, 12).map((p) => `  ${p.slug.padEnd(22)} ${p.date}  ${p.title}`);
        pushOutput(["Recent posts:", ...lines, "", "Run: post <slug> or open /blog"]);
        return;
      }

      if (cmd0 === "post") {
        const slug = args[0]?.toLowerCase();
        if (!slug) {
          pushOutput(["Usage: post <slug>"]);
          return;
        }
        const p = posts.find((x) => x.slug.toLowerCase() === slug);
        if (!p) {
          pushOutput([`No post "${slug}". Run: blog`]);
          return;
        }
        pushOutput([`${p.title}`, `${p.date} · ${p.tags.join(", ")}`, "", p.excerpt, "", `Read: /blog/${p.slug}`]);
        return;
      }

      if (cmd0 === "tags") {
        const set = new Set<string>();
        posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
        const sorted = [...set].sort((a, b) => a.localeCompare(b));
        pushOutput(sorted.length ? ["Tags:", ...sorted.map((t) => `  ${t}`)] : ["No tags found."]);
        return;
      }

      if (cmd0 === "tag") {
        const tagName = args.join(" ").trim().toLowerCase();
        if (!tagName) {
          pushOutput(["Usage: tag <name>"]);
          return;
        }
        const matches = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tagName));
        if (matches.length === 0) {
          pushOutput([`No posts with tag "${args.join(" ")}". Run: tags`]);
          return;
        }
        pushOutput([
          `Posts tagged "${args.join(" ")}":`,
          ...matches.map((p) => `  ${p.slug.padEnd(20)} ${p.title}`),
        ]);
        return;
      }

      if (cmd0 === "skills") {
        pushOutput(["Skills & tools:", ...SKILLS.map((s) => `  · ${s}`)]);
        return;
      }

      if (cmd0 === "contact") {
        pushOutput([
          "Email: amogh.nagaraj03@gmail.com",
          "GitHub / Twitter / LinkedIn: run github, twitter, linkedin",
          "Pages: /contact · /newsletter",
        ]);
        return;
      }

      if (cmd0 === "github") {
        openUrl(SOCIAL.github);
        pushOutput(["Opening GitHub…"]);
        return;
      }
      if (cmd0 === "twitter") {
        openUrl(SOCIAL.twitter);
        pushOutput(["Opening Twitter…"]);
        return;
      }
      if (cmd0 === "linkedin") {
        openUrl(SOCIAL.linkedin);
        pushOutput(["Opening LinkedIn…"]);
        return;
      }

      if (cmd0 === "open") {
        const target = args.join(" ").trim();
        if (!target) {
          pushOutput(["Usage: open <path or https://…>", "Examples: open /work   open https://github.com"]);
          return;
        }
        if (/^https?:\/\//i.test(target)) {
          openUrl(target);
          pushOutput([`Opened ${target}`]);
        } else {
          const path = target.startsWith("/") ? target : `/${target}`;
          navigate(path);
          pushOutput([`Navigating to ${path}…`]);
        }
        return;
      }

      if (cmd0 === "summon") {
        const rest = args.join(" ").toLowerCase();
        if (rest === "coffee") {
          pushOutput([
            "",
            "      )  (",
            "     (   ) )",
            "      ) ( (",
            "    _______)_",
            " .-'---------|",
            "( C|☕|ffeine |",
            " '-./ /_/ _/.'",
            "  '_________'",
            "",
            "☕ Fresh batch. You earned this compile.",
            "",
          ]);
          return;
        }
        pushOutput(["Unknown summon. Try: summon coffee"]);
        return;
      }

      pushOutput([`command not found: ${cmd0}`, "Type help for available commands."]);
    },
    [posts, router, uid],
  );

  const onSubmit = () => {
    runRaw(value);
    setValue("");
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <div className="overflow-hidden rounded-xl border border-zinc-700/90 bg-zinc-950 shadow-[0_24px_80px_-20px_rgba(0,0,0,.85),0_0_0_1px_rgba(255,255,255,.04)]">
        <div className="flex items-center gap-3 border-b border-zinc-800/90 bg-zinc-900/95 px-3 py-2">
          <TrafficLights />
          <p className="flex-1 text-center font-mono text-[11px] tracking-wide text-zinc-500">NRUPA ~ terminal</p>
          <span className="w-14 shrink-0" aria-hidden />
        </div>

        <div className="flex min-h-[min(72vh,640px)] flex-col bg-black">
          <div className="shrink-0 space-y-4 border-b border-zinc-800/80 p-4 sm:p-5">
            <NrupaMark />
            <p className="font-mono text-sm text-sky-400/95">Welcome to Nrupa&apos;s Terminal v2.0</p>
            <p className="font-mono text-[13px] text-zinc-200">
              Type <span className="font-semibold text-indigo-300">help</span> for available commands
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Pill icon={<IconUser />} onClick={() => runRaw("whoami")}>
                whoami
              </Pill>
              <Pill icon={<IconCode />} onClick={() => runRaw("projects")}>
                projects
              </Pill>
              <Pill icon={<IconDoc />} onClick={() => runRaw("blog")}>
                blog
              </Pill>
              <Pill icon={<IconCoffee />} onClick={() => runRaw("summon coffee")}>
                summon coffee
              </Pill>
            </div>
          </div>

          <div ref={scrollRef} className="min-h-[200px] flex-1 space-y-2 overflow-y-auto p-4 sm:p-5">
            {blocks.map((b) => renderBlock(b))}
          </div>

          <div className="shrink-0 border-t border-zinc-800/90 bg-black px-4 py-3 sm:px-5">
            <label className="flex items-center gap-1 font-mono text-[13px]">
              <span className="shrink-0 text-indigo-400">nrupa@terminal</span>
              <span className="shrink-0 text-zinc-100">:~$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSubmit();
                }}
                spellCheck={false}
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-zinc-600"
                placeholder=""
                aria-label="Terminal input"
              />
              <span className="animate-pulse text-zinc-400" aria-hidden>
                |
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2 px-1 text-center font-mono text-xs text-[var(--muted)]">
        <p>Type &apos;help&apos; for available commands or &apos;exit&apos; to return to homepage.</p>
        <p>
          Try{" "}
          <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--text)]">
            summon coffee
          </kbd>{" "}
          for a surprise! <span aria-hidden>⚡</span>
        </p>
        <p>
          <Link href="/" className="text-indigo-400/95 !no-underline hover:!no-underline hover:text-indigo-300">
            ← Back home
          </Link>
        </p>
      </div>
    </div>
  );
}
