"use client";

import { useState } from "react";

const quickPrompts = [
  "What projects have you built?",
  "What’s your tech stack?",
  "What are you currently reading?",
  "Tell me about your favorite anime",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm hover:bg-[#171717] z-50"
      >
        pixbot chat
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-[440px] max-w-[calc(100vw-2rem)] border border-[var(--border)] bg-[#0b0b0b] z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <div>
          <p className="font-semibold">pixbot</p>
          <p className="text-xs text-[var(--muted)]">online</p>
        </div>
        <button onClick={() => setOpen(false)} className="text-[var(--muted)]">
          ×
        </button>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-xl font-semibold">what&apos;s on your mind?</p>
        <div className="space-y-2">
          {quickPrompts.map((prompt) => (
            <button key={prompt} className="block w-full text-left border border-[var(--border)] px-3 py-2 text-[var(--muted)] hover:text-[var(--text)]">
              {prompt}
            </button>
          ))}
        </div>
        <div className="border border-[var(--border)] px-3 py-2 text-[var(--muted)]">ask me anything...</div>
      </div>
    </div>
  );
}
