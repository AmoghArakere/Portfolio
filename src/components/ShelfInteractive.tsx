"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  shelfInteractiveSections,
  type ShelfInteractiveItem,
  type ShelfInteractiveItemType,
} from "@/data/shelfInteractive";
import { getCategoryTheme, getSpineFaceStyle } from "@/lib/shelfSpineStyle";

const BADGES: Partial<
  Record<ShelfInteractiveItemType, { label: string; bg: string; fg: string; br: string }>
> = {
  paper: { label: "PAPER", bg: "#252535", fg: "#8888bb", br: "rgba(136,136,187,.35)" },
  blog: { label: "BLOG", bg: "#0a2618", fg: "#4ab870", br: "rgba(74,184,112,.35)" },
  video: { label: "YT", bg: "#2a1506", fg: "#c07030", br: "rgba(192,112,48,.35)" },
};

const TYPE_CHIP: Record<
  ShelfInteractiveItemType,
  { bg: string; fg: string; br: string }
> = {
  book: { bg: "rgba(26,53,100,.15)", fg: "#7ab0e8", br: "rgba(122,176,232,.3)" },
  paper: { bg: "rgba(37,37,53,.18)", fg: "#8888bb", br: "rgba(136,136,187,.3)" },
  blog: { bg: "rgba(12,46,30,.18)", fg: "#4ab870", br: "rgba(74,184,112,.3)" },
  video: { bg: "rgba(46,26,6,.18)", fg: "#c07030", br: "rgba(192,112,48,.3)" },
};

type Tab = "all" | "books" | "papers" | "blogs" | "videos";

const tabToType: Record<Exclude<Tab, "all">, ShelfInteractiveItemType> = {
  books: "book",
  papers: "paper",
  blogs: "blog",
  videos: "video",
};

function matchesTab(item: ShelfInteractiveItem, tab: Tab) {
  if (tab === "all") return true;
  return item.type === tabToType[tab];
}

function Spine({
  item,
  sectionId,
  spineIndex,
  selected,
  onSelect,
}: {
  item: ShelfInteractiveItem;
  sectionId: string;
  spineIndex: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const b = BADGES[item.type];
  const title =
    item.title.length > 26 ? `${item.title.slice(0, 25)}…` : item.title;
  const sub = item.sub
    .split("·")[0]
    ?.trim()
    .slice(0, 13)
    .toUpperCase() ?? "";

  const faceStyle = getSpineFaceStyle(item.color, spineIndex, sectionId, item.type);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`px-book group flex shrink-0 cursor-pointer flex-col transition-transform duration-200 ease-out hover:!-translate-y-2.5 hover:drop-shadow-[0_12px_20px_rgba(0,0,0,.55)] ${
        selected ? "!-translate-y-2.5 drop-shadow-[0_14px_24px_rgba(0,0,0,.55)]" : ""
      }`}
      style={{ width: item.w }}
    >
      <div className="flex h-[22px] items-end justify-center pb-0.5">
        {b ? (
          <span
            className="whitespace-nowrap text-[7px] tracking-wide shadow-sm"
            style={{
              background: b.bg,
              color: b.fg,
              padding: "2px 5px",
              border: `0.5px solid ${b.br}`,
              boxShadow: "0 1px 2px rgba(0,0,0,.4)",
            }}
          >
            {b.label}
          </span>
        ) : null}
      </div>
      <div
        className="relative shrink-0 overflow-hidden rounded-t-[3px] border-l border-r border-t border-white/15 border-black/50"
        style={{
          height: item.h,
          ...faceStyle,
          outline: selected ? "1.5px solid rgba(255,255,255,.45)" : undefined,
          outlineOffset: selected ? "-1px" : undefined,
        }}
      >
        {/* Top edge highlight (cloth binding) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-b from-white/25 to-transparent"
          aria-hidden
        />
        {/* Subtle vertical grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,.4) 1px, rgba(255,255,255,.4) 2px)`,
            backgroundSize: "3px 100%",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-0.5 py-1.5">
          <span
            className="max-h-[75%] overflow-hidden text-[10px] leading-snug text-white/[0.92] drop-shadow-[0_1px_1px_rgba(0,0,0,.65)]"
            style={{ writingMode: "vertical-rl" }}
          >
            {title}
          </span>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <span
            className="text-[7px] tracking-widest text-white/30 drop-shadow-sm"
            style={{ writingMode: "vertical-rl" }}
          >
            {sub}
          </span>
        </div>
        {/* Page block at bottom */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[5px] border-t border-white/10 bg-gradient-to-b from-[#2a2a2e] via-[#e8e4dc] to-[#c8c4bc]"
          aria-hidden
        />
      </div>
    </button>
  );
}

function DetailLink({ url }: { url: string }) {
  const display = url.replace(/^https:\/\//, "");
  if (url.startsWith("/")) {
    return (
      <Link href={url} className="mt-2 inline-block border-b border-[var(--border)] text-[11px] text-[var(--muted)] !no-underline hover:!no-underline hover:text-[var(--text)]">
        {display}
      </Link>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mt-2 inline-block border-b border-[var(--border)] text-[11px] text-[var(--muted)] !no-underline hover:!no-underline hover:text-[var(--text)]"
    >
      {display}
    </a>
  );
}

export default function ShelfInteractive() {
  const [tab, setTab] = useState<Tab>("all");
  const [sel, setSel] = useState<{ sectionId: string; index: number } | null>(null);

  const counts = useMemo(() => {
    const c = { book: 0, paper: 0, blog: 0, video: 0 };
    shelfInteractiveSections.forEach((s) =>
      s.items.forEach((i) => {
        c[i.type]++;
      }),
    );
    return c;
  }, []);

  const visibleSections = useMemo(() => {
    return shelfInteractiveSections
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => matchesTab(i, tab)),
      }))
      .filter((s) => s.items.length > 0);
  }, [tab]);

  const selectedItem = useMemo((): ShelfInteractiveItem | null => {
    if (!sel) return null;
    const sec = shelfInteractiveSections.find((x) => x.id === sel.sectionId);
    if (!sec) return null;
    return sec.items[sel.index] ?? null;
  }, [sel]);

  const tabs: Tab[] = ["all", "books", "papers", "blogs", "videos"];

  return (
    <div className="max-w-full py-2 font-mono">
      <h2 className="sr-only">Interactive shelf — books, papers, blog posts, and videos</h2>

      <div className="mb-6 flex flex-wrap gap-7">
        {(
          [
            ["book", "books", "#7ab0e8"],
            ["paper", "papers", "#8888bb"],
            ["blog", "blogs", "#4ab870"],
            ["video", "videos", "#c07030"],
          ] as const
        ).map(([key, label, col]) => (
          <div key={key}>
            <span className="block text-2xl font-medium tabular-nums leading-none" style={{ color: col }}>
              {counts[key]}
            </span>
            <span className="text-[11px] text-[var(--muted)]">{label}</span>
          </div>
        ))}
      </div>

      <div className="mb-7 flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTab(t);
              setSel(null);
            }}
            className={`cursor-pointer border px-3 py-1 font-mono text-xs tracking-wide transition-colors ${
              tab === t
                ? "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                : "border-transparent text-[var(--muted)] hover:border-[var(--border)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {visibleSections.map((section) => {
        const catTheme = getCategoryTheme(section.id);
        return (
          <div key={section.id} className="mb-9">
            <div className="mb-2 flex items-baseline justify-between">
              <span
                className={`text-[11px] tracking-wide text-[var(--muted)] transition-colors ${catTheme.labelClass}`}
              >
                {section.label}
              </span>
              <span className="text-[11px] text-[var(--muted)]">{section.items.length}</span>
            </div>
            <div
              className="no-scrollbar flex items-end gap-[3px] overflow-x-auto overflow-y-visible rounded-md pb-1 pl-0.5"
              style={{ boxShadow: catTheme.rowShadow }}
            >
              {section.items.map((item) => {
                const fullIndex = shelfInteractiveSections.find((x) => x.id === section.id)?.items.indexOf(item);
                const idx = fullIndex ?? 0;
                const isSel = Boolean(sel && sel.sectionId === section.id && sel.index === idx);
                return (
                  <Spine
                    key={`${section.id}-${idx}`}
                    sectionId={section.id}
                    spineIndex={idx}
                    item={item}
                    selected={isSel}
                    onSelect={() => {
                      setSel((prev) =>
                        prev?.sectionId === section.id && prev.index === idx
                          ? null
                          : { sectionId: section.id, index: idx },
                      );
                    }}
                  />
                );
              })}
            </div>
            <div
              className="mt-0 h-2.5 rounded-sm"
              style={{
                background: catTheme.railBg,
                borderTop: `2.5px solid ${catTheme.railEdge}`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.05)",
              }}
            />
          </div>
        );
      })}

      {selectedItem ? (
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span
                className="mb-2.5 inline-block font-mono text-[10px] tracking-widest"
                style={{
                  background: TYPE_CHIP[selectedItem.type].bg,
                  color: TYPE_CHIP[selectedItem.type].fg,
                  border: `0.5px solid ${TYPE_CHIP[selectedItem.type].br}`,
                  padding: "2px 9px",
                }}
              >
                {selectedItem.type}
              </span>
              <div className="mb-1 text-sm font-medium leading-snug text-[var(--text)]">{selectedItem.title}</div>
              <div className="mb-2.5 font-mono text-xs text-[var(--muted)]">{selectedItem.sub}</div>
              <p className="mb-3 text-[13px] leading-relaxed text-[var(--muted)]">{selectedItem.desc}</p>
              <div className="flex flex-wrap gap-1">
                {(selectedItem.tags ?? []).map((tg) => (
                  <span
                    key={tg}
                    className="mb-1 inline-block border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--muted)]"
                  >
                    {tg}
                  </span>
                ))}
              </div>
              {selectedItem.url ? <DetailLink url={selectedItem.url} /> : null}
            </div>
            <button
              type="button"
              onClick={() => setSel(null)}
              className="shrink-0 cursor-pointer border border-[var(--border)] px-2 py-1 font-mono text-[11px] text-[var(--muted)] transition-colors hover:border-[var(--accent)]"
              aria-label="Close detail"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
