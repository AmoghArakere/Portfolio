export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 w-full px-6 pb-5 pt-4 text-[13px] text-[var(--muted)]">
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3 border-t border-[#cfd4dc]/40 pt-2.5">
        <span className="shrink-0 self-end">© 2026 Amogh Nagaraj. All rights reserved.</span>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/nrupa" target="_blank" rel="noreferrer" className="!no-underline hover:!no-underline">
              GitHub
            </a>
            <a href="https://twitter.com/nrupa" target="_blank" rel="noreferrer" className="!no-underline hover:!no-underline">
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/yashaswi-kumar-mishra/"
              target="_blank"
              rel="noreferrer"
              className="!no-underline hover:!no-underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
