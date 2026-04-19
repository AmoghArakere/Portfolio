import type { CSSProperties } from "react";

import type { ShelfInteractiveItemType } from "@/data/shelfInteractive";

/** Helpers for realistic shelf / book-spine visuals */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

export function mixHex(a: string, b: string, t: number): string {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  if (!A || !B) return a;
  return rgbToHex(A.r + (B.r - A.r) * t, A.g + (B.g - A.g) * t, A.b + (B.b - A.b) * t);
}

/** Slight per-spine hue/lightness shift so neighbors differ authentically */
export function variedSpineBase(base: string, index: number, sectionId: string): string {
  const seed = (index * 17 + sectionId.charCodeAt(0) * 3 + sectionId.length * 11) % 21;
  const delta = seed - 10; // roughly -10..+10
  const rgb = hexToRgb(base);
  if (!rgb) return base;
  const f = (c: number) => c + delta * 1.4;
  return rgbToHex(f(rgb.r), f(rgb.g), f(rgb.b));
}

export type CategoryShelfTheme = {
  /** Wood / ledge under spines */
  railBg: string;
  railEdge: string;
  /** Soft glow under row */
  rowShadow: string;
  /** Optional accent for section label */
  labelClass: string;
};

export const CATEGORY_SHELF_THEMES: Record<string, CategoryShelfTheme> = {
  sys: {
    railBg: "linear-gradient(180deg, #1e1610 0%, #120e0a 100%)",
    railEdge: "#5c4a36",
    rowShadow: "0 10px 24px rgba(10, 24, 48, 0.35)",
    labelClass: "text-sky-300/90",
  },
  lang: {
    railBg: "linear-gradient(180deg, #2a1810 0%, #180e08 100%)",
    railEdge: "#6b4e38",
    rowShadow: "0 10px 22px rgba(48, 24, 8, 0.38)",
    labelClass: "text-amber-200/85",
  },
  cs: {
    railBg: "linear-gradient(180deg, #1c1224 0%, #100818 100%)",
    railEdge: "#5a4068",
    rowShadow: "0 10px 22px rgba(24, 8, 40, 0.4)",
    labelClass: "text-violet-300/85",
  },
  blog: {
    railBg: "linear-gradient(180deg, #0e1a12 0%, #080f0c 100%)",
    railEdge: "#2d5c3e",
    rowShadow: "0 10px 22px rgba(8, 32, 20, 0.42)",
    labelClass: "text-emerald-400/80",
  },
  vid: {
    railBg: "linear-gradient(180deg, #24180c 0%, #120a06 100%)",
    railEdge: "#7a5230",
    rowShadow: "0 10px 24px rgba(40, 20, 6, 0.45)",
    labelClass: "text-orange-300/85",
  },
};

const DEFAULT_THEME: CategoryShelfTheme = {
  railBg: "#1c1208",
  railEdge: "#3a2516",
  rowShadow: "0 8px 20px rgba(0,0,0,.35)",
  labelClass: "",
};

export function getCategoryTheme(sectionId: string): CategoryShelfTheme {
  return CATEGORY_SHELF_THEMES[sectionId] ?? DEFAULT_THEME;
}

/**
 * Realistic spine face: light catch on left, shadow on right, subtle warm/cool variation.
 */
export function getSpineFaceStyle(
  baseColor: string,
  index: number,
  sectionId: string,
  itemType?: ShelfInteractiveItemType,
): CSSProperties {
  let base = variedSpineBase(baseColor, index, sectionId);
  if (itemType === "paper") {
    base = mixHex(base, "#8a9aad", 0.1);
    base = mixHex(base, "#1a2030", 0.05);
  }
  if (itemType === "blog") {
    base = mixHex(base, "#1e5c38", 0.06);
  }
  if (itemType === "video") {
    base = mixHex(base, "#8b4513", 0.08);
  }

  const leftLit = mixHex(base, "#f0f4fc", 0.14 + (index % 5) * 0.015);
  const mid = mixHex(base, "#0a0c12", 0.06);
  const rightDeep = mixHex(base, "#010203", 0.38 + ((index * 3) % 4) * 0.03);
  const background = `linear-gradient(90deg, ${leftLit} 0%, ${mid} 42%, ${base} 72%, ${rightDeep} 100%)`;

  return {
    background,
    boxShadow: `
      inset 3px 0 5px rgba(255,255,255,.1),
      inset -4px 0 10px rgba(0,0,0,.45),
      0 1px 0 rgba(255,255,255,.12) inset,
      3px 6px 14px rgba(0,0,0,.5)
    `,
  };
}
