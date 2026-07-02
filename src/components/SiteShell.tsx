"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import StarsAmbientBackground from "@/components/StarsAmbientBackground";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");
  const isContact = pathname === "/contact";
  const isShelf = pathname.startsWith("/shelf");
  const isCli = pathname.startsWith("/cli");
  const isAbout = pathname.startsWith("/about");
  const isProjects = pathname.startsWith("/projects");
  const isHome = pathname === "/";

  if (isBlog) {
    return (
      <>
        <StarsAmbientBackground />
        <div className="relative z-10 bg-transparent">{children}</div>
        <ChatWidget />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <StarsAmbientBackground />
      <main
        className={`${
          isContact
            ? "max-w-[1100px]"
            : isShelf
              ? "max-w-none"
              : isAbout
                ? "max-w-[1150px]"
                : isProjects
                  ? "max-w-[1150px]"
                  : isHome
                    ? "max-w-[760px]"
                : isCli
                  ? "max-w-[960px]"
                  : "max-w-[680px]"
        } relative z-10 mx-auto w-full bg-transparent overflow-visible px-6 ${isShelf ? "py-6" : "py-12"} animate-fade-in`}
      >
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
