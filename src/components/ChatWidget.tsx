"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatResponseBody } from "@/lib/chatTypes";

const BOT_AVATAR = "/chat/nrupabot.png";
const MIN_TYPING_DELAY_MS = 1000;

const quickPrompts = [
  "What projects have you built?",
  "What's your tech stack?",
  "Tell me about your experience",
  "Where did you study?",
  "What are you currently reading?",
];

function ChatBubbleIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 3C6.5 3 2 6.6 2 11c0 2.6 1.5 4.9 3.8 6.3L5 21l3.7-2.1c1 .2 2.1.4 3.3.4 5.5 0 10-3.6 10-8.1S17.5 3 12 3Z"
        fill="#d8dbe0"
      />
      <circle cx="9" cy="11" r="1.2" fill="#5f6670" />
      <circle cx="12" cy="11" r="1.2" fill="#5f6670" />
      <circle cx="15" cy="11" r="1.2" fill="#5f6670" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; text: string; sources?: ChatResponseBody["sources"] }>>([]);
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, typing, open]);

  const closeChat = () => {
    setOpen(false);
    setInput("");
    setMessages([]);
    setTyping(false);
  };

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTyping(true);
    setInput("");

    try {
      const [response] = await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        }),
        new Promise((resolve) => window.setTimeout(resolve, MIN_TYPING_DELAY_MS)),
      ]);
      if (!response.ok) throw new Error("chat_api_error");
      const payload = (await response.json()) as ChatResponseBody;
      setMessages((prev) => [...prev, { role: "bot", text: payload.answer, sources: payload.sources }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I could not answer right now. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface)]/95 shadow-[0_10px_30px_rgba(0,0,0,.45)] transition-colors hover:bg-[#171717]"
        aria-label="Open nrupabot chat"
      >
        <ChatBubbleIcon className="h-8 w-8" />
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50 h-[520px] w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#1a202b] bg-[#0f1116] shadow-[0_24px_70px_rgba(0,0,0,.6)]"
      role="dialog"
      aria-modal="true"
      aria-label="nrupabot chat"
    >
      <div className="flex items-center justify-between border-b border-[#111723] px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={BOT_AVATAR} alt="nrupabot avatar" className="h-8 w-8 rounded-full object-cover object-[50%_18%]" />
          <div>
            <p className="text-xs font-semibold">nrupabot</p>
            <p className="text-[11px] text-[var(--muted)]">
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
              online
            </p>
          </div>
        </div>
        <button onClick={closeChat} className="text-2xl leading-none text-[var(--muted)]" aria-label="Close chat">
          ×
        </button>
      </div>
      <div className="flex h-[calc(100%-56px)] flex-col space-y-3 p-4">
        <div>
          <img src={BOT_AVATAR} alt="nrupabot avatar" className="h-9 w-9 rounded-full object-cover object-[50%_18%]" />
          <p className="mt-3 text-xs text-[var(--muted)]">Hi, I&apos;m nrupa</p>
          <p className="mt-2 text-sm font-medium leading-tight">what can I do for you?</p>
        </div>
        <div ref={messagesRef} className="chat-scrollbar max-h-[360px] space-y-2 overflow-y-auto px-1">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                void sendMessage(prompt);
              }}
              className="block origin-left rounded-full border border-[#171f2b] bg-[var(--surface)]/40 px-3 py-1.5 text-left text-xs text-[var(--muted)] transition-all duration-200 hover:scale-[1.02] hover:text-[var(--text)]"
            >
              {prompt}
            </button>
          ))}
          {messages.map((message, index) =>
            message.role === "user" ? (
              <p
                key={`${message.role}-${index}`}
                className="ml-auto max-w-[92%] rounded-xl border border-indigo-900/45 bg-indigo-500/20 px-3 py-2 text-xs leading-relaxed text-indigo-100"
              >
                {message.text}
              </p>
            ) : (
              <div key={`${message.role}-${index}`} className="flex items-start gap-2">
                <img src={BOT_AVATAR} alt="nrupabot avatar" className="mt-0.5 h-6 w-6 rounded-full object-cover object-[50%_18%]" />
                <div className="max-w-[90%] rounded-xl border border-[#171f2b] bg-[var(--surface)] px-3 py-2 text-xs leading-relaxed text-[var(--muted)]">
                  <p>{message.text}</p>
                </div>
              </div>
            ),
          )}
          {typing ? (
            <div className="flex items-start gap-2">
              <img src={BOT_AVATAR} alt="nrupabot avatar" className="mt-0.5 h-6 w-6 rounded-full object-cover object-[50%_18%]" />
              <p className="rounded-xl border border-[#171f2b] bg-[var(--surface)] px-3 py-2 text-xs leading-relaxed text-[var(--muted)]">
                ...
              </p>
            </div>
          ) : null}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void sendMessage(input);
          }}
          className="mt-auto flex items-center gap-2 rounded-2xl border border-[#171f2b] bg-[var(--surface)]/45 px-3 py-2"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="ask me anything..."
            className="w-full bg-transparent text-xs text-[var(--text)] outline-none placeholder:text-zinc-400"
          />
          <button
            type="submit"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--nav-pill)] text-[var(--text)] transition-colors hover:bg-[var(--nav-time-bg)]"
            aria-label="Send message"
          >
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}
