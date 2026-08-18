import type { Metadata } from "next";
import Image from "next/image";

import PageHeaderLabel from "@/components/PageHeaderLabel";

export const metadata: Metadata = {
  title: "More | mandakini",
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

  const media = [
    {
      label: "Letterboxd",
      sub: "Movies",
      href: "https://letterboxd.com/mandakini_/",
      image: "/more/letterboxd.png",
    },
    {
      label: "AniList",
      sub: "Anime",
      href: "https://anilist.co/user/mandakini/",
      image: "/more/anilist.png",
    },
    {
      label: "Serializd",
      sub: "TV shows",
      href: "https://www.serializd.com/user/mandakini/profile",
      image: "/more/serializd.png",
      imageClassName: "object-cover object-[50%_6%]",
    },
  ];

  return (
    <div className="space-y-4 pt-3">
      <section>
        <PageHeaderLabel label="more" />
        <div className="mt-4 max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Media</h2>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {media.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-xl border border-white/10 bg-[var(--surface)]/40 !no-underline hover:!no-underline"
                  aria-label={`${item.label} — ${item.sub}`}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(max-width: 640px) 33vw, 180px"
                      className={`${item.imageClassName ?? "object-cover object-center"} transition duration-300 group-hover:scale-[1.03]`}
                    />
                  </div>
                  <div className="border-t border-white/10 px-2 py-2 text-center sm:px-3">
                    <p className="text-xs font-semibold text-indigo-300/90 transition-colors group-hover:text-indigo-200 sm:text-sm">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-[var(--muted)] sm:text-xs">{item.sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
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
        </div>
      </section>
    </div>
  );
}
