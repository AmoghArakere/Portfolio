import type { BookItem } from "@/data/shelf";

export default function BookCard({ item }: { item: BookItem }) {
  return (
    <div className="border border-[var(--border)] p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="font-semibold">{item.title}</p>
        {item.readCount ? (
          <span className="text-xs border border-[var(--border)] px-2 py-0.5 text-[var(--muted)]">read count: {item.readCount}</span>
        ) : null}
      </div>
      <p className="text-[var(--muted)] mt-1 uppercase tracking-wide text-sm">{item.author}</p>
      {item.isbn ? <p className="text-sm text-[var(--muted)] mt-2">ISBN {item.isbn}</p> : <p className="text-sm text-[var(--muted)] mt-2">{item.source}</p>}
    </div>
  );
}
