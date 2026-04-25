"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useMemo, useState } from "react";
import {
  shelfInteractiveSections,
  type ShelfInteractiveItem,
} from "@/data/shelfInteractive";
import { getCategoryTheme, getSpineFaceStyle } from "@/lib/shelfSpineStyle";

const shelfReaderFrames = [
  "/shelf/mot-1.png",
  "/shelf/mot-3.png",
  "/shelf/mot-4.png",
  "/shelf/mot-5.png",
] as const;

function Spine({
  item,
  sectionId,
  spineIndex,
  selected,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  spineKey,
}: {
  item: ShelfInteractiveItem;
  sectionId: string;
  spineIndex: number;
  selected: boolean;
  onSelect: () => void;
  onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: () => void;
  spineKey: string;
}) {
  const typeBaseWidth =
    item.type === "paper" ? 0.58 : item.type === "blog" ? 0.66 : item.type === "video" ? 0.94 : 1.1;
  const widthJitter = item.type === "book" ? [0.82, 0.94, 1.08, 1.22, 1.34] : [0.96, 1.02, 1.08];
  const jitter = widthJitter[(spineIndex + sectionId.length) % widthJitter.length];
  const boostedWidth = Math.round(item.w * typeBaseWidth * jitter);
  const blogTiltProfile = [-1.2, -0.6, 0, 0.5, 1];
  const tiltDeg =
    item.type === "blog"
      ? blogTiltProfile[(spineIndex + sectionId.charCodeAt(0)) % blogTiltProfile.length]
      : 0;
  const title =
    item.title.length > (item.type === "paper" ? 19 : 26)
      ? `${item.title.slice(0, item.type === "paper" ? 18 : 25)}…`
      : item.title;
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-spine-key={spineKey}
      className={`px-book group relative z-0 flex shrink-0 cursor-pointer flex-col transition-shadow duration-200 ease-out hover:z-20 hover:drop-shadow-[0_10px_18px_rgba(0,0,0,.45)] ${
        selected ? "drop-shadow-[0_12px_20px_rgba(0,0,0,.5)]" : ""
      }`}
      style={{ width: boostedWidth }}
    >
      <div className="h-[8px]" />
      <div
        className="relative shrink-0 overflow-hidden rounded-t-[3px] border-l border-r border-t border-white/15 border-black/50"
        style={{
          height: item.type === "video" ? Math.max(200, item.h) : item.type === "blog" ? Math.round(item.h * 0.86) : item.h,
          ...(item.type === "blog"
            ? {
                background:
                  "linear-gradient(180deg, #f7f2e8 0%, #efe5d3 50%, #e5d8c2 100%)",
                boxShadow:
                  "inset 2px 0 6px rgba(255,255,255,.45), inset -3px 0 8px rgba(0,0,0,.15), 2px 6px 12px rgba(0,0,0,.35)",
              }
            : item.type === "video"
              ? {
                  background:
                    "linear-gradient(180deg, #26282c 0%, #1b1d20 45%, #121316 100%)",
                  boxShadow:
                    "inset 1px 0 0 rgba(255,255,255,.08), inset -2px 0 0 rgba(0,0,0,.45), 2px 6px 12px rgba(0,0,0,.42)",
                }
              : faceStyle),
          transform: tiltDeg ? `rotate(${tiltDeg}deg)` : undefined,
          transformOrigin: "bottom center",
          outline: selected ? "1.5px solid rgba(255,255,255,.45)" : undefined,
          outlineOffset: selected ? "-1px" : undefined,
        }}
      >
        {item.type === "blog" ? (
          <>
            <div className="pointer-events-none absolute inset-x-[3px] top-0 h-[6px] rounded-b-full border-b border-[#c9b79a] bg-[#f2e7d4]" aria-hidden />
            <div className="pointer-events-none absolute inset-x-[3px] bottom-0 h-[6px] rounded-t-full border-t border-[#c9b79a] bg-[#eadcc5]" aria-hidden />
          </>
        ) : item.type === "video" ? (
          <>
            <div className="pointer-events-none absolute left-1/2 top-2 h-4 w-[76%] -translate-x-1/2 rounded-sm border border-zinc-600/80 bg-black/65" aria-hidden>
              <div className="absolute left-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-zinc-400/70" />
              <div className="absolute right-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-zinc-400/70" />
            </div>
            <div className="pointer-events-none absolute inset-x-1.5 top-[38%] rounded-sm border border-zinc-500/60 bg-gradient-to-r from-zinc-500/30 via-zinc-300/25 to-zinc-500/30 px-1 py-0.5" aria-hidden>
              <div className="mx-auto h-[3px] w-[88%] rounded-full bg-zinc-100/40" />
            </div>
          </>
        ) : (
          <>
            {/* Top edge highlight (cloth binding) */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-b from-white/25 to-transparent"
              aria-hidden
            />
            {/* Top texture lines (varied thin/thick bands) */}
            {spineIndex % 2 === 0 ? (
              <div className="pointer-events-none absolute inset-x-1 top-2 z-10" aria-hidden>
                <div className={`h-px ${item.type === "paper" ? "bg-zinc-500/80" : "bg-white/35"}`} />
                <div className={`mt-1 h-[2px] ${item.type === "paper" ? "bg-zinc-600/75" : "bg-black/30"}`} />
              </div>
            ) : (
              <div className="pointer-events-none absolute inset-x-1 top-2 z-10" aria-hidden>
                <div className={`h-[2px] ${item.type === "paper" ? "bg-zinc-500/75" : "bg-white/22"}`} />
                <div className={`mt-1 h-px ${item.type === "paper" ? "bg-zinc-600/80" : "bg-black/35"}`} />
              </div>
            )}
            {/* Right edge depth strip for thicker 3D spine feel */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-[3px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.45))",
                boxShadow: "inset 1px 0 0 rgba(255,255,255,0.2)",
              }}
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
          </>
        )}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-0.5 py-1.5">
          <span
            className={`max-h-[75%] overflow-hidden text-[10px] leading-snug ${
              item.type === "paper"
                ? "text-black/80 drop-shadow-none"
                : item.type === "blog"
                  ? "text-[#4a3c28]"
                  : item.type === "video"
                    ? "text-zinc-100"
                : "text-white/[0.92] drop-shadow-[0_1px_1px_rgba(0,0,0,.65)]"
            }`}
            style={{ writingMode: "vertical-rl" }}
          >
            {title}
          </span>
        </div>
        <div className="absolute bottom-1.5 left-1.5 top-1.5 flex items-end">
          <span
            className={`block max-h-[45%] overflow-hidden text-[7px] tracking-wide ${
              item.type === "paper" ? "text-black/45 drop-shadow-none" : "text-white/35 drop-shadow-sm"
            }`}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {item.type === "paper" ? "" : sub}
          </span>
        </div>
        {item.type === "video" ? null : (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[5px] border-t border-white/10 bg-gradient-to-b from-[#2a2a2e] via-[#e8e4dc] to-[#c8c4bc]"
            aria-hidden
          />
        )}
      </div>
    </button>
  );
}

function ExpandableBookCard({ item }: { item: ShelfInteractiveItem }) {
  const isHandsOnLlm = item.title === "Hands-On Large Language Models";
  const coverWidthClass = isHandsOnLlm ? "w-[7.6rem]" : "w-[6.8rem]";

  return (
    <div className="w-full max-w-[18rem] min-h-[18.5rem] overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)]/95 p-4 shadow-[0_18px_48px_rgba(0,0,0,.65)] backdrop-blur-md transition-all duration-300 ease-out sm:p-5">
      <div className="mb-4 flex justify-center">
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="overflow-hidden rounded-xl border border-white/10 bg-black/30 !no-underline hover:!no-underline"
            aria-label={`Open ${item.title}`}
          >
            {item.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.cover} alt={item.title} className={`h-40 ${coverWidthClass} object-cover`} />
            ) : (
              <div className={`flex h-40 ${coverWidthClass} items-center justify-center bg-gradient-to-b from-zinc-700 to-zinc-900 text-center text-xs text-white/60`}>
                Book Cover
              </div>
            )}
          </a>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
            {item.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.cover} alt={item.title} className={`h-40 ${coverWidthClass} object-cover`} />
            ) : (
              <div className={`flex h-40 ${coverWidthClass} items-center justify-center bg-gradient-to-b from-zinc-700 to-zinc-900 text-center text-xs text-white/60`}>
                Book Cover
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mb-1 text-center text-2xl font-semibold leading-snug text-[var(--text)]">{item.title}</div>
      <div className="mb-3 text-center text-base text-[var(--muted)]">{item.sub}</div>
      <p className="mb-2 text-left text-[13px] leading-relaxed text-[var(--muted)]">{item.desc}</p>
      {item.url ? (
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block rounded-lg border border-indigo-300/35 bg-indigo-400/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 !no-underline hover:!no-underline hover:bg-indigo-400/20"
        >
          Link
        </a>
      ) : null}
    </div>
  );
}

export default function ShelfInteractive() {
  const [sel, setSel] = useState<{ sectionId: string; index: number } | null>(null);
  const [readerFrame, setReaderFrame] = useState(0);
  const [paperTooltip, setPaperTooltip] = useState<string | null>(null);
  const [paperTooltipCard, setPaperTooltipCard] = useState<{
    key: string;
    title: string;
    sub: string;
    x: number;
    y: number;
  } | null>(null);

  const visibleSections = useMemo(() => {
    const allPapers = shelfInteractiveSections.flatMap((section) =>
      section.items.filter((item) => item.type === "paper"),
    );

    return shelfInteractiveSections
      .map((section) => {
        if (section.id === "sys") {
          return {
            ...section,
            items: section.items.filter((item) => item.type !== "paper"),
          };
        }

        if (section.id === "blog") {
          return {
            ...section,
            label: "Blogs and Papers",
            items: [...section.items, ...allPapers],
          };
        }

        return section;
      })
      .filter((section) => section.items.length > 0);
  }, []);

  const selectedItem = useMemo((): ShelfInteractiveItem | null => {
    if (!sel) return null;
    const sec = visibleSections.find((x) => x.id === sel.sectionId);
    if (!sec) return null;
    return sec.items[sel.index] ?? null;
  }, [sel, visibleSections]);

  useEffect(() => {
    // Preload all frames once so none get skipped on first loops.
    shelfReaderFrames.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const timer = window.setInterval(() => {
      setReaderFrame((current) => (current + 1) % shelfReaderFrames.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="max-w-full py-0 font-mono">
      <h2 className="sr-only">Interactive shelf — books, papers, blog posts, and videos</h2>

      {visibleSections.map((section) => {
        const catTheme = getCategoryTheme(section.id);
        return (
          <div key={section.id} className="relative mb-9" data-shelf-section={section.id}>
            <div className="mb-2 flex items-baseline justify-between">
              <span
                className={`text-[11px] tracking-wide text-[var(--muted)] transition-colors ${catTheme.labelClass}`}
              >
                {section.label}
              </span>
              <span className="text-[11px] text-[var(--muted)]">{section.items.length}</span>
            </div>
            <div
              data-shelf-row
              className="no-scrollbar relative z-20 flex items-end gap-[3px] overflow-x-auto overflow-y-visible rounded-md pb-1 pl-0.5"
              style={{ boxShadow: catTheme.rowShadow }}
            >
              {section.items.map((item, idx) => {
                const isSel = Boolean(sel && sel.sectionId === section.id && sel.index === idx);
                return (
                  <Spine
                    key={`${section.id}-${idx}`}
                    spineKey={`${section.id}-${idx}`}
                    sectionId={section.id}
                    spineIndex={idx}
                    item={item}
                    selected={isSel || paperTooltip === `${section.id}-${idx}`}
                    onSelect={() => {
                      if (item.type === "paper") {
                        if (item.url) {
                          window.open(item.url, "_blank", "noopener,noreferrer");
                        }
                        setPaperTooltip(null);
                        setPaperTooltipCard(null);
                        setSel(null);
                        return;
                      }
                      if (item.type === "blog") {
                        if (item.url) {
                          window.open(item.url, "_blank", "noopener,noreferrer");
                        }
                        setPaperTooltip(null);
                        setPaperTooltipCard(null);
                        setSel(null);
                        return;
                      }
                      if (item.type === "video") {
                        if (item.url) {
                          window.open(item.url, "_blank", "noopener,noreferrer");
                        }
                        setPaperTooltip(null);
                        setPaperTooltipCard(null);
                        setSel(null);
                        return;
                      }
                      setPaperTooltip(null);
                      setPaperTooltipCard(null);
                      setSel((prev) =>
                        prev?.sectionId === section.id && prev.index === idx
                          ? null
                          : { sectionId: section.id, index: idx },
                      );
                    }}
                    onMouseEnter={(event) => {
                      if (
                        item.type === "paper" ||
                        item.type === "video" ||
                        item.type === "blog" ||
                        item.type === "book"
                      ) {
                        const rect = event.currentTarget.getBoundingClientRect();
                        const key = `${section.id}-${idx}`;
                        const tooltipWidth = 176;
                        const viewportPadding = 12;
                        const rawCenterX = rect.left + rect.width / 2;
                        const minX = viewportPadding + tooltipWidth / 2;
                        const maxX = window.innerWidth - viewportPadding - tooltipWidth / 2;
                        const clampedX = Math.max(minX, Math.min(rawCenterX, maxX));
                        setPaperTooltip(key);
                        setPaperTooltipCard({
                          key,
                          title: item.title,
                          sub: item.sub,
                          x: clampedX,
                          y: rect.bottom + 10,
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      if (
                        item.type === "paper" ||
                        item.type === "video" ||
                        item.type === "blog" ||
                        item.type === "book"
                      ) {
                        const key = `${section.id}-${idx}`;
                        setPaperTooltip((prev) => (prev === `${section.id}-${idx}` ? null : prev));
                        setPaperTooltipCard((prev) => (prev?.key === key ? null : prev));
                      }
                    }}
                  />
                );
              })}
            </div>
            {section.id === "cs" ? (
              <div className="pointer-events-none absolute bottom-0 right-24 z-40 flex items-end">
                <Image
                  src={shelfReaderFrames[readerFrame]}
                  alt="Animated reader character"
                  width={184}
                  height={184}
                  className="h-[184px] w-auto translate-y-[40px] select-none object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,.62)]"
                  priority={false}
                  unoptimized
                />
              </div>
            ) : null}
            <div
              data-shelf-rail
              className="relative z-0 mt-0 h-2.5 rounded-sm"
              style={{
                background: catTheme.railBg,
                borderTop: `2.5px solid ${catTheme.railEdge}`,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,.05)",
              }}
            />
          </div>
        );
      })}

      {selectedItem && selectedItem.type === "book" ? (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 p-4"
          onClick={() => setSel(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.type} details`}
        >
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <button
              type="button"
              onClick={() => setSel(null)}
              className="absolute -right-2 -top-2 z-10 h-7 w-7 rounded-full border border-white/15 bg-black/65 text-sm text-white/85"
              aria-label="Close detail"
            >
              ✕
            </button>
            <ExpandableBookCard item={selectedItem} />
          </div>
        </div>
      ) : null}

      {paperTooltipCard ? (
        <div
          className="pointer-events-none fixed z-[120] w-44 -translate-x-1/2 rounded-[1.35rem] border border-indigo-300/30 bg-[#070a12]/98 px-3 py-2.5 text-center shadow-[0_14px_34px_rgba(0,0,0,.75)] backdrop-blur-md"
          style={{ left: paperTooltipCard.x, top: paperTooltipCard.y }}
        >
          <p className="text-[12px] font-semibold leading-snug text-white">{paperTooltipCard.title}</p>
          <p className="mt-1 text-[10px] leading-none text-white/35">{paperTooltipCard.sub}</p>
        </div>
      ) : null}
    </div>
  );
}
