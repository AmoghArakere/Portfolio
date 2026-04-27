import type { Metadata } from "next";
import PageHeaderLabel from "@/components/PageHeaderLabel";

export const metadata: Metadata = {
  title: "More | Nrupa",
  description: "More about me beyond tech.",
};

export default function MorePage() {
  const bookshelf = [
    { title: "Project Hail Mary", author: "Andy Weir", href: "https://www.goodreads.com/search?q=Project+Hail+Mary+Andy+Weir" },
    { title: "The Singularity Is Nearer", author: "Ray Kurzweil", href: "https://www.goodreads.com/search?q=The+Singularity+Is+Nearer+Ray+Kurzweil" },
    { title: "The Guest List", author: "Lucy Foley", href: "https://www.goodreads.com/search?q=The+Guest+List+Lucy+Foley" },
    { title: "The Silent Patient", author: "Alex Michaelides", href: "https://www.goodreads.com/search?q=The+Silent+Patient+Alex+Michaelides" },
    { title: "The Martian", author: "Andy Weir", href: "https://www.goodreads.com/search?q=The+Martian+Andy+Weir" },
    { title: "The Black Swan", author: "Nassim Nicholas Taleb", href: "https://www.goodreads.com/search?q=The+Black+Swan+Nassim+Nicholas+Taleb" },
  ];

  return (
    <div className="space-y-4 pt-3">
      <section>
        <PageHeaderLabel label="more" />
        <h1 className="text-3xl font-semibold">More About Me</h1>
        <div className="mt-4 max-w-xl space-y-3">
          <h2 className="text-lg font-semibold">Bookshelf</h2>
          <div className="space-y-2 text-sm leading-relaxed">
            {bookshelf.map((book) => (
              <p key={book.title}>
                <a
                  href={book.href}
                  target="_blank"
                  rel="noreferrer"
                  className="!no-underline hover:!no-underline"
                >
                  <span className="text-indigo-300/90 transition-colors hover:text-indigo-200">{book.title}</span>
                  <span className="text-[var(--muted)]"> by {book.author}</span>
                </a>
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
