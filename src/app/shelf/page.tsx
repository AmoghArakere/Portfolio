import type { Metadata } from "next";
import Link from "next/link";
import PageHeaderLabel from "@/components/PageHeaderLabel";
import ShelfInteractive from "@/components/ShelfInteractive";

export const metadata: Metadata = {
  title: "Shelf | Nrupa",
  description: "Books, papers, posts, and videos on my reading rack.",
};

export default function ShelfPage() {
  const peerlistCollectionUrl = "https://peerlist.io/amoghnagaraj/collections/COLH7BJGB9O6NLNQEINOMMRER779L9";

  return (
    <div className="space-y-8">
      <section>
        <PageHeaderLabel label="shelf" />
        <h1 className="text-3xl font-semibold">My Shelf</h1>
        <p className="text-[var(--muted)]">Books, papers, blog posts, and talks</p>
      </section>
      <div className="text-sm">
        <Link href="/shelf" className="underline">
          Bookshelf
        </Link>{" "}
        | <Link href="/shelf/reads">Reading List</Link>
      </div>
      <section className="rounded-xl border border-[var(--border)] p-3 text-sm text-[var(--muted)]">
        <span>More recommendations on </span>
        <a href={peerlistCollectionUrl} target="_blank" rel="noreferrer">
          Peerlist collection
        </a>
        <span> ↗</span>
      </section>

      <ShelfInteractive />
    </div>
  );
}
