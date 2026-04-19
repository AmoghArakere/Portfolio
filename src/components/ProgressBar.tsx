"use client";

import { useEffect, useState } from "react";

export default function ProgressBar({ value }: { value: number }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 30);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-full h-1 bg-[var(--border)] mt-3">
      <div className="h-full bg-[var(--text)] transition-all duration-700 ease-out" style={{ width: `${width}%` }} />
    </div>
  );
}
