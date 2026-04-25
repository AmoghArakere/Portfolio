"use client";

import { useRef, MouseEvent } from "react";

type CometCardProps = {
  children: React.ReactNode;
  className?: string;
  rotateDepth?: number;
  translateDepth?: number;
};

export default function CometCard({
  children,
  className = "",
  rotateDepth = 14,
  translateDepth = 10,
}: CometCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * rotateDepth}deg) rotateX(${-y * rotateDepth}deg) translateX(${x * translateDepth}px) translateY(${-y * translateDepth}px) scale(1.03)`;
  }

  function handleMouseLeave() {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(700px) rotateY(0deg) rotateX(0deg) translateX(0px) translateY(0px) scale(1)";
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.15s ease-out", willChange: "transform" }}
      className={className}
    >
      {children}
    </div>
  );
}
