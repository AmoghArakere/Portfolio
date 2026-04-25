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

function mixHex(a: string, b: string, t: number): string {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  if (!A || !B) return a;
  return rgbToHex(A.r + (B.r - A.r) * t, A.g + (B.g - A.g) * t, A.b + (B.b - A.b) * t);
}

/** Slight per-spine hue/lightness shift so neighbors differ authentically */
function variedSpineBase(base: string, index: number, sectionId: string): string {
  const seed = (index * 17 + sectionId.charCodeAt(0) * 3 + sectionId.length * 11) % 21;
  const delta = seed - 10; // roughly -10..+10
  const rgb = hexToRgb(base);
  if (!rgb) return base;
  const f = (c: number) => c + delta * 1.4;
  return rgbToHex(f(rgb.r), f(rgb.g), f(rgb.b));
}

type CategoryShelfTheme = {
  /** Wood / ledge under spines */
  railBg: string;
  railEdge: string;
  /** Soft glow under row */
  rowShadow: string;
  /** Optional accent for section label */
  labelClass: string;
};

const CATEGORY_SHELF_THEMES: Record<string, CategoryShelfTheme> = {
  sys: {
    railBg: "linear-gradient(180deg, #5a3c24 0%, #3b2618 48%, #26180f 100%)",
    railEdge: "#8a623f",
    rowShadow: "0 10px 24px rgba(10, 24, 48, 0.35)",
    labelClass: "text-white",
  },
  lang: {
    railBg: "linear-gradient(180deg, #654229 0%, #442a19 48%, #2a1a10 100%)",
    railEdge: "#956948",
    rowShadow: "0 10px 22px rgba(48, 24, 8, 0.38)",
    labelClass: "text-white",
  },
  cs: {
    railBg: "linear-gradient(180deg, #5e3c24 0%, #3d2818 48%, #26190f 100%)",
    railEdge: "#8f6544",
    rowShadow: "0 10px 22px rgba(24, 8, 40, 0.4)",
    labelClass: "text-white",
  },
  blog: {
    railBg: "linear-gradient(180deg, #664328 0%, #432a19 48%, #291a10 100%)",
    railEdge: "#9a6f48",
    rowShadow: "0 10px 22px rgba(8, 32, 20, 0.42)",
    labelClass: "text-white",
  },
  vid: {
    railBg: "linear-gradient(180deg, #70472a 0%, #4a2e1b 48%, #2d1b10 100%)",
    railEdge: "#a7774d",
    rowShadow: "0 10px 24px rgba(40, 20, 6, 0.45)",
    labelClass: "text-white",
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
  const vibrance = 0.16 + (index % 4) * 0.035;
  if (itemType === "book") {
    base = mixHex(base, "#5da8ff", vibrance);
    base = mixHex(base, "#7d4dff", 0.05);
  }
  if (itemType === "paper") {
    base = mixHex(base, "#f4f1ea", 0.7);
    base = mixHex(base, "#eee7db", 0.18);
  }
  if (itemType === "blog") {
    base = mixHex(base, "#37cc7e", 0.18);
  }
  if (itemType === "video") {
    base = mixHex(base, "#ff2b2b", 0.45);
    base = mixHex(base, "#050505", 0.25);
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
