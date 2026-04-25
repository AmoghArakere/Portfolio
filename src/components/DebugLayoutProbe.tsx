"use client";

import { useEffect } from "react";

export default function DebugLayoutProbe() {
  useEffect(() => {
    const scripts = Array.from(document.querySelectorAll("script"));
    const scriptSummary = scripts.map((script) => ({
      id: script.id || null,
      type: script.getAttribute("type"),
      dataNscript: script.getAttribute("data-nscript"),
      src: script.getAttribute("src"),
    }));

    // #region agent log
    fetch("http://127.0.0.1:7854/ingest/5b8534c4-f00f-4dd8-8795-4eff75f9aeb9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "52138e",
      },
      body: JSON.stringify({
        sessionId: "52138e",
        runId: "run1",
        hypothesisId: "H1",
        location: "src/components/DebugLayoutProbe.tsx:15",
        message: "Client mounted and script tags enumerated",
        data: {
          scriptCount: scripts.length,
          hasThemeBootstrapId: scripts.some((script) => script.id === "theme-bootstrap"),
          scriptSummary: scriptSummary.slice(0, 12),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    const raf = window.requestAnimationFrame(() => {
      const hasInlineScriptInHead = Array.from(document.head.querySelectorAll("script")).some(
        (script) => !(script as HTMLScriptElement).src,
      );

      // #region agent log
      fetch("http://127.0.0.1:7854/ingest/5b8534c4-f00f-4dd8-8795-4eff75f9aeb9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "52138e",
        },
        body: JSON.stringify({
          sessionId: "52138e",
          runId: "run1",
          hypothesisId: "H2",
          location: "src/components/DebugLayoutProbe.tsx:44",
          message: "Post-hydration head script shape",
          data: {
            hasInlineScriptInHead,
            headScriptCount: document.head.querySelectorAll("script").length,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  return null;
}
