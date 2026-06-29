"use client";

import { useEffect } from "react";

export default function ThemeBootstrap() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light");
  }, []);

  return null;
}
