"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatResponseBody } from "@/lib/chatTypes";

const BOT_AVATAR = "/chat/mandakinibot.png";
const MIN_TYPING_DELAY_MS = 1000;
const CHAT_CLOSE_MS = 320;

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
        fill="var(--chat-icon-fill)"
      />
      <circle cx="9" cy="11" r="1.2" fill="var(--chat-icon-dot)" />
      <circle cx="12" cy="11" r="1.2" fill="var(--chat-icon-dot)" />
      <circle cx="15" cy="11" r="1.2" fill="var(--chat-icon-dot)" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; text: string; sources?: ChatResponseBody["sources"] }>>([]);
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const panelVisible = open || closing;

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const openChat = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setClosing(false);
    setOpen(true);
  };

  const closeChat = () => {
    if (closing) return;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setInput("");
      setMessages([]);
      setTyping(false);
      closeTimerRef.current = null;
    }, CHAT_CLOSE_MS);
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

  return (
    <>
      {!panelVisible ? (
        <button
          onClick={openChat}
          className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--chat-panel-border)] bg-[var(--surface)]/95 text-[var(--text)] shadow-[var(--chat-fab-shadow)] transition-colors hover:bg-[var(--chat-fab-hover)]"
          aria-label="Open mandakinibot chat"
        >
          <ChatBubbleIcon className="h-8 w-8" />
        </button>
      ) : null}

      {panelVisible ? (
        <div
          className={`fixed bottom-5 right-5 z-50 h-[520px] w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[var(--chat-panel-border)] bg-[var(--chat-panel-bg)] text-[var(--text)] shadow-[var(--chat-panel-shadow)] will-change-transform ${
            closing ? "chat-panel-exit" : "chat-panel-enter"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="mandakinibot chat"
        >
      <div className="flex items-center justify-between border-b border-[var(--chat-panel-divider)] px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={BOT_AVATAR} alt="mandakinibot avatar" className="h-8 w-8 rounded-full object-cover object-[50%_18%]" />
          <div>
            <p className="text-xs font-semibold">mandakinibot</p>
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
          <img src={BOT_AVATAR} alt="mandakinibot avatar" className="h-9 w-9 rounded-full object-cover object-[50%_18%]" />
          <p className="mt-3 text-xs text-[var(--muted)]">Hi, I&apos;m mandakini</p>
          <p className="mt-2 text-sm font-medium leading-tight">what can I do for you?</p>
        </div>
        <div ref={messagesRef} className="chat-scrollbar max-h-[360px] space-y-2 overflow-y-auto px-1">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                void sendMessage(prompt);
              }}
              className="block origin-left rounded-full border border-[var(--chat-panel-subtle-border)] bg-[var(--nav-pill)] px-3 py-1.5 text-left text-xs text-[var(--muted)] transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--nav-time-bg)] hover:text-[var(--text)]"
            >
              {prompt}
            </button>
          ))}
          {messages.map((message, index) =>
            message.role === "user" ? (
              <p
                key={`${message.role}-${index}`}
                className="ml-auto max-w-[92%] rounded-xl border border-[var(--chat-user-border)] bg-[var(--chat-user-bg)] px-3 py-2 text-xs leading-relaxed text-[var(--chat-user-text)]"
              >
                {message.text}
              </p>
            ) : (
              <div key={`${message.role}-${index}`} className="flex items-start gap-2">
                <img src={BOT_AVATAR} alt="mandakinibot avatar" className="mt-0.5 h-6 w-6 rounded-full object-cover object-[50%_18%]" />
                <div className="max-w-[90%] rounded-xl border border-[var(--chat-panel-subtle-border)] bg-[var(--surface)] px-3 py-2 text-xs leading-relaxed text-[var(--muted)]">
                  <p>{message.text}</p>
                </div>
              </div>
            ),
          )}
          {typing ? (
            <div className="flex items-start gap-2">
              <img src={BOT_AVATAR} alt="mandakinibot avatar" className="mt-0.5 h-6 w-6 rounded-full object-cover object-[50%_18%]" />
              <p className="rounded-xl border border-[var(--chat-panel-subtle-border)] bg-[var(--surface)] px-3 py-2 text-xs leading-relaxed text-[var(--muted)]">
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
          className="mt-auto flex items-center gap-2 rounded-2xl border border-[var(--chat-panel-subtle-border)] bg-[var(--nav-pill)] px-3 py-2"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="ask me anything..."
            className="w-full bg-transparent text-xs text-[var(--text)] outline-none placeholder:text-[var(--input-placeholder)]"
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
      ) : null}
    </>
  );
}
