"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type LogDatePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function toIsoDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export default function LogDatePicker({ id, value, onChange, required }: LogDatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = useMemo(() => (value ? parseISO(value) : new Date()), [value]);
  const [cursor, setCursor] = useState(startOfMonth(selected));
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (open) setCursor(startOfMonth(selected));
  }, [open, selected]);

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

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor));
    const end = endOfWeek(endOfMonth(cursor));
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "log-control-trigger flex w-full items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-left text-sm outline-none transition",
          "hover:border-white/20 focus-visible:border-indigo-400/50",
          open && "border-indigo-400/40",
        )}
      >
        <span className="tabular-nums text-[var(--text)]">{format(selected, "MMM d, yyyy")}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="shrink-0 text-[var(--muted)]"
          aria-hidden
        >
          <rect x="2" y="3" width="12" height="12" rx="1.5" />
          <path d="M2 6h12M5 1.5v3M11 1.5v3" />
        </svg>
      </button>
      {required ? <input type="hidden" value={value} required readOnly tabIndex={-1} aria-hidden /> : null}

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Choose date"
          className="log-control-panel absolute left-0 z-30 mt-2 w-[min(100%,19rem)] overflow-hidden rounded-xl border border-white/10 p-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:w-80"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setCursor((month) => subMonths(month, 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]"
              aria-label="Previous month"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="text-sm font-semibold tracking-tight text-[var(--text)]">{format(cursor, "MMMM yyyy")}</p>
            <button
              type="button"
              onClick={() => setCursor((month) => addMonths(month, 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]"
              aria-label="Next month"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <span key={day} className="py-1 text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const inMonth = isSameMonth(day, cursor);
              const selectedDay = isSameDay(day, selected);
              const today = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => {
                    onChange(toIsoDate(day));
                    setOpen(false);
                  }}
                  className={cn(
                    "relative flex h-9 items-center justify-center rounded-lg text-sm tabular-nums transition",
                    !inMonth && "text-[var(--muted)]/40",
                    inMonth && !selectedDay && "text-[var(--text)] hover:bg-white/10",
                    selectedDay && "bg-[var(--accent-indigo)] font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
                    today && !selectedDay && "ring-1 ring-inset ring-[var(--accent-indigo)]/50",
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => {
                onChange(toIsoDate(new Date()));
                setOpen(false);
              }}
              className="rounded-md px-2 py-1 text-xs font-semibold text-[var(--accent-indigo)] transition hover:bg-white/5"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1 text-xs font-semibold text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--text)]"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
