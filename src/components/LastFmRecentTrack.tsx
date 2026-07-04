"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { LastFmRecentResult } from "@/lib/lastfm";

const TICK_MS = 250;
const LIVE_POLL_MS = 30000;

function toClock(ms?: number) {
  if (ms === undefined || ms === null || ms < 0) return "--:--";
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = `${totalSec % 60}`.padStart(2, "0");
  return `${min}:${sec}`;
}

function formatRelativeTime(playedAtMs: number, nowMs: number) {
  const diffSec = Math.max(0, Math.floor((nowMs - playedAtMs) / 1000));
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hr ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
  const diffWeek = Math.floor(diffDay / 7);
  return `${diffWeek} wk${diffWeek === 1 ? "" : "s"} ago`;
}

function trackProgressKey(title: string, artist: string) {
  return `lastfm:${title}:${artist}`;
}

function AudioVisualizer() {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      className="shrink-0"
      aria-hidden
    >
      <rect className="lastfm-eq-bar" x="0" y="5" width="3" height="9" rx="1.5" fill="#1ed760" />
      <rect
        className="lastfm-eq-bar"
        x="6.5"
        y="2"
        width="3"
        height="12"
        rx="1.5"
        fill="#1ed760"
        style={{ animationDelay: "120ms" }}
      />
      <rect
        className="lastfm-eq-bar"
        x="13"
        y="4"
        width="3"
        height="10"
        rx="1.5"
        fill="#1ed760"
        style={{ animationDelay: "240ms" }}
      />
    </svg>
  );
}

type LastFmRecentTrackProps = {
  result: LastFmRecentResult;
};

export default function LastFmRecentTrack({ result }: LastFmRecentTrackProps) {
  const router = useRouter();
  const { track, status } = result;
  const isNowPlaying = Boolean(track?.isNowPlaying);
  const durationMs = track?.durationMs;
  const hasDuration = Boolean(durationMs && durationMs > 0);
  const trackKey = track ? trackProgressKey(track.title, track.artist) : "";

  const [elapsedMs, setElapsedMs] = useState(0);
  const [nowMs, setNowMs] = useState(() => Date.now());
  const finishedRefreshRef = useRef(false);

  useEffect(() => {
    finishedRefreshRef.current = false;
  }, [trackKey]);

  useEffect(() => {
    if (!track || !isNowPlaying || !hasDuration || !durationMs) {
      setElapsedMs(0);
      return;
    }

    const storageKey = trackProgressKey(track.title, track.artist);
    let startedAt = Number(sessionStorage.getItem(storageKey));

    if (!startedAt || Number.isNaN(startedAt)) {
      startedAt = Date.now();
      sessionStorage.setItem(storageKey, String(startedAt));
    }

    const update = () => {
      const next = Math.min(Date.now() - startedAt, durationMs);
      setElapsedMs(next);

      if (next >= durationMs && !finishedRefreshRef.current) {
        finishedRefreshRef.current = true;
        router.refresh();
      }
    };

    update();
    const id = window.setInterval(update, TICK_MS);
    return () => window.clearInterval(id);
  }, [trackKey, isNowPlaying, hasDuration, durationMs, track, router]);

  useEffect(() => {
    if (!isNowPlaying) return;

    const id = window.setInterval(() => router.refresh(), LIVE_POLL_MS);
    return () => window.clearInterval(id);
  }, [isNowPlaying, trackKey, router]);

  useEffect(() => {
    if (isNowPlaying) return;
    const id = window.setInterval(() => setNowMs(Date.now()), 60000);
    return () => window.clearInterval(id);
  }, [isNowPlaying, track?.playedAtMs]);

  const isActive =
    isNowPlaying && (!hasDuration || !durationMs || elapsedMs < durationMs);

  const elapsedLabel = toClock(elapsedMs);
  const totalLabel = toClock(durationMs);
  const progressPct =
    hasDuration && durationMs ? Math.min(100, (elapsedMs / durationMs) * 100) : 0;

  const lastPlayedWhen = track?.playedAtMs
    ? formatRelativeTime(track.playedAtMs, nowMs)
    : "just now";

  const statusLabel = isActive ? "Now listening to" : `Last played · ${lastPlayedWhen}`;

  const art = track?.albumImageUrl;
  const artSizeClass =
    track && !isActive ? "h-16 w-16" : "h-12 w-12";

  return (
    <div className={`flex min-w-0 gap-3 ${track && !isActive ? "items-start" : "items-center"}`}>
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg bg-black/20 transition-[width,height] duration-200 ${artSizeClass}`}
      >
        {art ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={art}
            alt={track?.title ?? "Album art"}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#d51007]/15">
            <span className="text-xs font-bold tracking-tight text-[#d51007]">fm</span>
          </div>
        )}
        {isActive ? (
          <span
            className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-[#1ed760] ring-2 ring-[var(--surface)]"
            aria-hidden
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        {!track ? (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Last played
            </p>
            <p className="font-semibold">Waiting for your first scrobble</p>
            <p className="text-[var(--muted)]">
              {status === "unconfigured"
                ? "Add LASTFM_API_KEY to your environment"
                : status === "empty"
                  ? "Finish a track in Demus with Last.fm enabled"
                  : "Could not load Last.fm right now"}
            </p>
          </>
        ) : (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)]">
              {statusLabel}
            </p>
            <p className="truncate font-semibold">{track.title}</p>
            <p className="truncate text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--muted-hover)]">
              {track.artist}
            </p>

            {isActive && hasDuration ? (
              <div className="mt-1.5 grid grid-cols-[auto_auto_minmax(2rem,1fr)_auto] items-center gap-x-2 text-xs font-mono text-[var(--muted)]">
                <AudioVisualizer />
                <span className="shrink-0 tabular-nums text-white">{elapsedLabel}</span>
                <div
                  className="relative h-[3px] overflow-hidden rounded-full bg-white/15"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={durationMs}
                  aria-valuenow={elapsedMs}
                  aria-label={`Playback progress: ${elapsedLabel} of ${totalLabel}`}
                >
                  <span
                    className="absolute left-0 top-0 h-full rounded-full bg-[#1ed760] transition-[width] duration-150 ease-linear"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="shrink-0 tabular-nums">{totalLabel}</span>
              </div>
            ) : isActive ? (
              <div className="mt-1.5">
                <AudioVisualizer />
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
