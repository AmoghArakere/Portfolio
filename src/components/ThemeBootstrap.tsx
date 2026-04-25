"use client";

import { useEffect } from "react";

export default function ThemeBootstrap() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light");

    // #region agent log
    fetch("http://127.0.0.1:7854/ingest/5b8534c4-f00f-4dd8-8795-4eff75f9aeb9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "52138e",
      },
      body: JSON.stringify({
        sessionId: "52138e",
        runId: "post-fix",
        hypothesisId: "H4",
        location: "src/components/ThemeBootstrap.tsx:18",
        message: "Theme toggle disabled, forcing dark mode",
        data: {
          storedTheme: null,
          hasLightClass: root.classList.contains("light"),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, []);

  return null;
}
