"use client";

import { useEffect, useState } from "react";

type SpotifyNowPlayingProps = {
  isPlaying: boolean;
  title: string;
  artist: string;
  progressMs?: number;
  durationMs?: number;
};

function toClock(ms?: number) {
  if (!ms || ms < 0) return "--:--";
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = `${totalSec % 60}`.padStart(2, "0");
  return `${min}:${sec}`;
}

export default function SpotifyNowPlaying({ isPlaying, title, artist, progressMs = 0, durationMs }: SpotifyNowPlayingProps) {
  const [elapsedMs, setElapsedMs] = useState(progressMs);

  useEffect(() => {
    if (!isPlaying || !durationMs) return;

    const interval = window.setInterval(() => {
      setElapsedMs((prev) => Math.min(prev + 1000, durationMs));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPlaying, durationMs]);

  const elapsedLabel = toClock(elapsedMs);
  const totalLabel = toClock(durationMs);
  const progressPct =
    durationMs && durationMs > 0 ? Math.min(100, (elapsedMs / durationMs) * 100) : 0;

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)]">
        {isPlaying ? "Now Playing" : "Last Played"}
      </p>
      <p className="font-semibold">{title}</p>
      <p className="text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)]">{artist}</p>
      {isPlaying ? (
        <div className="mt-1 flex items-center gap-2">
          <div className="flex h-3 items-end gap-[2px]" aria-hidden>
            <span className="spotify-eq-bar h-1.5" />
            <span className="spotify-eq-bar h-2.5 [animation-delay:120ms]" />
            <span className="spotify-eq-bar h-2 [animation-delay:240ms]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 text-xs font-mono text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)]">
            <span className="shrink-0 tabular-nums">{elapsedLabel}</span>
            <div
              className="relative h-[3px] min-w-[48px] flex-1 rounded-full bg-[var(--border)]"
              aria-hidden
              title={`${elapsedLabel} — ${totalLabel}`}
            >
              {durationMs ? (
                <span
                  className="absolute left-0 top-0 h-full rounded-full bg-[var(--accent)] transition-[width] duration-1000 ease-linear"
                  style={{ width: `${progressPct}%` }}
                />
              ) : null}
            </div>
            <span className="shrink-0 tabular-nums">{totalLabel}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
