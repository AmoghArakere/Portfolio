import type { Metadata } from "next";
import Link from "next/link";
import PageHeaderLabel from "@/components/PageHeaderLabel";
import { flatReadingList } from "@/data/shelf";

export const metadata: Metadata = {
  title: "Reading List | Nrupa Shelf",
  description: "Linear reading list of books and papers.",
};

export default function ShelfReadsPage() {
  return (
    <div className="space-y-6">
      <PageHeaderLabel label="shelf/reads" />
      <h1 className="text-3xl font-semibold">Reading List</h1>
      <div className="text-sm">
        <Link href="/shelf">Bookshelf</Link> |{" "}
        <Link href="/shelf/reads" className="underline">
          Reading List
        </Link>
      </div>
      <ul className="space-y-2">
        {flatReadingList.map((item) => (
          <li key={`${item.category}-${item.title}`} className="border-b border-[var(--border)] pb-2">
            {item.title} - <span className="text-[var(--muted)]">{item.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
