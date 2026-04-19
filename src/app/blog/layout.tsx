import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[680px] mx-auto px-6 py-8">
      <nav className="flex items-center justify-between text-sm text-[var(--muted)]">
        <Link href="/">Site</Link>
        <span>nrupa/blog</span>
      </nav>
      <div className="flex items-center justify-between mt-4 border-b border-[var(--border)] pb-3 text-sm">
        <div className="flex gap-4">
          <Link href="/blog">Home</Link>
          <Link href="/blog/posts">All Posts</Link>
        </div>
        <span>⌘K</span>
      </div>
      <div className="mt-8">{children}</div>
      <footer className="mt-16 text-sm text-[var(--muted)] border-t border-[var(--border)] pt-4">
        nrupa/blog © 2026 · <Link href="/">Main Site</Link> · <Link href="/contact">Contact</Link> · <a href="/rss.xml">RSS</a>
      </footer>
    </div>
  );
}
