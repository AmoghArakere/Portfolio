"use client";

import dynamic from "next/dynamic";

const EncryptedNameHeading = dynamic(() => import("@/components/EncryptedNameHeading"), {
  ssr: false,
  loading: () => (
    <span className="inline-block select-none text-transparent" aria-hidden>
      Amogh Nagaraj
    </span>
  ),
});

const TITLE =
  "home-name-title inline-block w-fit max-w-full text-5xl font-normal leading-tight tracking-wide sm:text-6xl";

export default function HomeHeroName({ fontClassName }: { fontClassName: string }) {
  return (
    <h1 aria-label="Amogh Nagaraj" className={`${fontClassName} ${TITLE}`}>
      <EncryptedNameHeading text="Amogh Nagaraj" revealDelayMs={55} flipDelayMs={40} />
    </h1>
  );
}
