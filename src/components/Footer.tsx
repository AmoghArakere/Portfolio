import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-[680px] mx-auto px-6 py-10 mt-24 text-[var(--muted)] text-sm">
      <div className="flex gap-4 mb-3 flex-wrap">
        <Link href="/newsletter">Newsletter</Link>
        <Link href="/contact">Get in touch</Link>
        <a href="mailto:nrupa@example.com">Email</a>
        <Link href="/cli">CLI</Link>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <span>© 2026 Amogh Nagaraj. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="https://github.com/nrupa" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://twitter.com/nrupa" target="_blank" rel="noreferrer">
            Twitter
          </a>
          <a href="https://www.linkedin.com/in/yashaswi-kumar-mishra/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
