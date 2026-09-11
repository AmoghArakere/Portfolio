"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { ActivityEntryType } from "@/data/activityLog";
import { cn } from "@/lib/utils";

const typeOptions: {
  value: ActivityEntryType;
  label: string;
  hint: string;
  chip: string;
  dot: string;
}[] = [
  {
    value: "read",
    label: "Read",
    hint: "Articles, papers, books",
    chip: "bg-teal-500/15 text-teal-300",
    dot: "bg-teal-400",
  },
  {
    value: "watched",
    label: "Watched",
    hint: "Talks, videos, streams",
    chip: "bg-violet-500/15 text-violet-300",
    dot: "bg-violet-400",
  },
  {
    value: "building",
    label: "Building",
    hint: "Projects and experiments",
    chip: "bg-amber-500/15 text-amber-300",
    dot: "bg-amber-400",
  },
];

type LogTypeSelectProps = {
  id?: string;
  value: ActivityEntryType;
  onChange: (value: ActivityEntryType) => void;
};

export default function LogTypeSelect({ id, value, onChange }: LogTypeSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = typeOptions.find((option) => option.value === value) ?? typeOptions[0];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "log-control-trigger flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-left text-sm outline-none transition",
          "hover:border-white/20 focus-visible:border-indigo-400/50",
          open && "border-indigo-400/40",
        )}
      >
        <span className={cn("rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide", selected.chip)}>
          {selected.label}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={cn("shrink-0 text-[var(--muted)] transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Entry type"
          className="log-control-panel absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-white/10 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
        >
          {typeOptions.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition",
                    isSelected ? "bg-white/10" : "hover:bg-white/5",
                  )}
                >
                  <span className={cn("h-2 w-2 shrink-0 rounded-full", option.dot)} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-[var(--text)]">{option.label}</span>
                    <span className="block text-[11px] text-[var(--muted)]">{option.hint}</span>
                  </span>
                  {isSelected ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      className="shrink-0 text-[var(--accent-indigo)]"
                      aria-hidden
                    >
                      <path d="M3.5 8.5l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
