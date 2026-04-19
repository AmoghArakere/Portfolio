"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");
  const isContact = pathname === "/contact";
  const isShelf = pathname.startsWith("/shelf");
  const isCli = pathname.startsWith("/cli");
  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7854/ingest/5b8534c4-f00f-4dd8-8795-4eff75f9aeb9", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "52138e" },
      body: JSON.stringify({
        sessionId: "52138e",
        runId: "pre-fix",
        hypothesisId: "H3",
        location: "SiteShell.tsx:11",
        message: "route mounted in shell",
        data: { pathname, isBlog },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, [pathname, isBlog]);

  if (isBlog) {
    return (
      <>
        {children}
        <ChatWidget />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main
        className={`${
          isContact ? "max-w-[1100px]" : isShelf ? "max-w-none" : isCli ? "max-w-[960px]" : "max-w-[680px]"
        } mx-auto w-full px-6 py-12 animate-fade-in`}
      >
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
