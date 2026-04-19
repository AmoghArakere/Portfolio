"use client";

export default function NewsletterForm() {
  return (
    <form className="border border-[var(--border)] p-4 flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="email"
        className="flex-1 bg-transparent border border-[var(--border)] px-3 py-2 outline-none focus:border-[var(--text)]"
      />
      <button type="submit" className="border border-[var(--border)] px-4 py-2 hover:bg-[var(--surface)] transition-colors">
        Subscribe
      </button>
    </form>
  );
}
