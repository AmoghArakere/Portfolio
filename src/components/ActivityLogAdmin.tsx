"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

import type { ActivityEntry, ActivityEntryType } from "@/data/activityLog";

const typeOptions: { value: ActivityEntryType; label: string }[] = [
  { value: "read", label: "Read" },
  { value: "work", label: "Work" },
  { value: "build", label: "Build" },
];

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export default function ActivityLogAdmin() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [entries, setEntries] = useState<ActivityEntry[]>([]);
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(todayIsoDate);
  const [type, setType] = useState<ActivityEntryType>("read");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loadSession = useCallback(async () => {
    const response = await fetch("/api/activity-log/auth");
    const data = (await response.json()) as { authenticated: boolean };
    setAuthenticated(data.authenticated);
    return data.authenticated;
  }, []);

  const loadEntries = useCallback(async () => {
    const response = await fetch("/api/activity-log");
    if (!response.ok) return;
    const data = (await response.json()) as { entries: ActivityEntry[] };
    setEntries(data.entries);
  }, []);

  useEffect(() => {
    void (async () => {
      const ok = await loadSession();
      if (ok) await loadEntries();
    })();
  }, [loadEntries, loadSession]);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const response = await fetch("/api/activity-log/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setBusy(false);
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Login failed.");
      return;
    }

    setPassword("");
    setAuthenticated(true);
    await loadEntries();
  }

  async function handleLogout() {
    await fetch("/api/activity-log/auth", { method: "DELETE" });
    setAuthenticated(false);
    setEntries([]);
  }

  async function handleAdd(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const response = await fetch("/api/activity-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, type, title, detail, url }),
    });

    setBusy(false);
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not save entry.");
      return;
    }

    setTitle("");
    setDetail("");
    setUrl("");
    setDate(todayIsoDate());
    await loadEntries();
  }

  async function handleDelete(id: string) {
    setBusy(true);
    setError("");

    const response = await fetch(`/api/activity-log?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    setBusy(false);
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Could not delete entry.");
      return;
    }

    await loadEntries();
  }

  if (authenticated === null) {
    return <p className="text-sm text-[var(--muted)]">Loading…</p>;
  }

  if (!authenticated) {
    return (
      <form onSubmit={handleLogin} className="mx-auto max-w-sm space-y-4">
        <div>
          <label htmlFor="log-password" className="mb-1.5 block text-sm font-semibold">
            Password
          </label>
          <input
            id="log-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
            autoComplete="current-password"
            required
          />
        </div>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg border border-white/10 bg-[var(--nav-pill)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--nav-time-bg)] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">Only you can add entries here. Latest 5 show on the homepage.</p>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition hover:bg-white/5"
        >
          Sign out
        </button>
      </div>

      <form onSubmit={handleAdd} className="space-y-4 rounded-xl border border-white/10 bg-[var(--surface)]/55 p-5">
        <h2 className="text-lg font-semibold">Add entry</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="log-date" className="mb-1.5 block text-sm font-semibold">
              Date
            </label>
            <input
              id="log-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
              required
            />
          </div>
          <div>
            <label htmlFor="log-type" className="mb-1.5 block text-sm font-semibold">
              Type
            </label>
            <select
              id="log-type"
              value={type}
              onChange={(event) => setType(event.target.value as ActivityEntryType)}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="log-title" className="mb-1.5 block text-sm font-semibold">
            Title
          </label>
          <input
            id="log-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
            placeholder="Inference Engineering"
            required
          />
        </div>
        <div>
          <label htmlFor="log-detail" className="mb-1.5 block text-sm font-semibold">
            Detail <span className="font-normal text-[var(--muted)]">(optional)</span>
          </label>
          <textarea
            id="log-detail"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
            placeholder="Short note about what you read or worked on"
          />
        </div>
        <div>
          <label htmlFor="log-url" className="mb-1.5 block text-sm font-semibold">
            Link <span className="font-normal text-[var(--muted)]">(optional)</span>
          </label>
          <input
            id="log-url"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-indigo-400/50"
            placeholder="https://"
          />
        </div>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg border border-white/10 bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/30 disabled:opacity-60"
        >
          {busy ? "Saving…" : "Add to log"}
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">All entries</h2>
        {entries.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">No entries yet.</p>
        ) : (
          <ul className="divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10">
            {entries.map((entry) => (
              <li key={entry.id} className="flex items-start justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
                    {entry.date} · {entry.type}
                  </p>
                  <p className="font-medium">{entry.title}</p>
                  {entry.detail ? <p className="mt-1 text-sm text-[var(--muted)]">{entry.detail}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  disabled={busy}
                  className="shrink-0 text-xs text-red-300 transition hover:text-red-200 disabled:opacity-60"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
