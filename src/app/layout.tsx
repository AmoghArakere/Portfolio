import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amogh Nagaraj | Nrupa - Backend Engineer",
  description: "Backend engineer specializing in Go and Rust, building distributed systems and scalable backends.",
  openGraph: {
    title: "Amogh Nagaraj | Nrupa",
    description: "Backend engineer specializing in Go and Rust, building distributed systems and scalable backends.",
    url: "https://www.nrupa.tech",
    siteName: "nrupa",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@nrupa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var theme = localStorage.getItem("theme");
                if (theme === "light") {
                  document.documentElement.classList.add("light");
                }
              } catch (e) {}
            })();
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
