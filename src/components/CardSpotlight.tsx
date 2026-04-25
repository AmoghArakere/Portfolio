"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useState } from "react";

type CardSpotlightProps = {
  children: ReactNode;
  className?: string;
  radius?: number;
  color?: string;
};

export default function CardSpotlight({
  children,
  className = "",
  radius = 320,
  color = "99,102,241",
}: CardSpotlightProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  function onLeave() {
    setPos(null);
  }

  const style = {
    background:
      pos === null
        ? "transparent"
        : `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, rgba(${color},0.18), rgba(${color},0.08) 35%, transparent 70%)`,
  } satisfies CSSProperties;

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
        style={style}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
