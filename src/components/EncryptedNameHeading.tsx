"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function pickChar(charset: string) {
  return charset[Math.floor(Math.random() * charset.length)] ?? "x";
}

export type EncryptedNameHeadingProps = {
  text: string;
  revealDelayMs?: number;
  flipDelayMs?: number;
  charset?: string;
};

/**
 * Gibberish → reveal animation (Aceternity-style encrypted text).
 * @see https://ui.aceternity.com/components/encrypted-text
 */
export default function EncryptedNameHeading({
  text,
  revealDelayMs = 55,
  flipDelayMs = 40,
  charset = DEFAULT_CHARSET,
}: EncryptedNameHeadingProps) {
  const [revealed, setRevealed] = useState(0);
  const [flipTick, setFlipTick] = useState(0);

  useEffect(() => {
    if (revealed >= text.length) return;
    const id = window.setInterval(() => setFlipTick((t) => t + 1), flipDelayMs);
    return () => window.clearInterval(id);
  }, [revealed, text.length, flipDelayMs]);

  useEffect(() => {
    if (revealed >= text.length) return;
    const id = window.setTimeout(() => setRevealed((r) => r + 1), revealDelayMs);
    return () => window.clearTimeout(id);
  }, [revealed, text.length, revealDelayMs]);

  const chars = useMemo(() => {
    void flipTick;
    return text.split("").map((ch, i) => {
      if (ch === " ") {
        return { key: i, kind: "gap" as const };
      }
      if (i < revealed) {
        return { key: i, kind: "char" as const, content: ch, isReal: true };
      }
      return { key: i, kind: "char" as const, content: pickChar(charset), isReal: false };
    });
  }, [text, revealed, flipTick, charset]);

  return (
    <span className="inline-flex flex-wrap items-baseline select-none" aria-hidden="true">
      {chars.map((item) => {
        if (item.kind === "gap") {
          return (
            <span
              key={item.key}
              className="inline-block w-[0.65rem] shrink-0 sm:w-[1.1rem]"
              aria-hidden
            />
          );
        }
        const { key, content, isReal } = item;
        return (
          <span
            key={key}
            className={
              isReal ? "text-white" : "text-white/40 transition-colors duration-75"
            }
          >
            {content}
          </span>
        );
      })}
    </span>
  );
}
