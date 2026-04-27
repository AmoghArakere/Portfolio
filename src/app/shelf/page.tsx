import type { Metadata } from "next";
import MovingBorderLink from "@/components/MovingBorderLink";
import PageHeaderLabel from "@/components/PageHeaderLabel";
import ShelfInteractive from "@/components/ShelfInteractive";

export const metadata: Metadata = {
  title: "Shelf | Nrupa",
  description: "Books, papers, posts, and videos on my reading rack.",
};

export default function ShelfPage() {
  return (
    <div className="space-y-4 pt-3">
      <section>
        <PageHeaderLabel label="shelf" />
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          Books, papers, blogs, and videos worth your time.
        </p>
      </section>
      <ShelfInteractive />
      <div className="flex justify-center pt-2">
        <MovingBorderLink href="/more">more about me ( non-tech )</MovingBorderLink>
      </div>
    </div>
  );
}
