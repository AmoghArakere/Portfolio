import type { Metadata } from "next";
import Link from "next/link";
import InfiniteTechMarquee from "@/components/InfiniteTechMarquee";
import PageHeaderLabel from "@/components/PageHeaderLabel";

export const metadata: Metadata = {
  title: "Hi | Nrupa",
  description: "Everything at a glance across work, projects, blog, shelf, and contact.",
};

const sections = [
  { name: "Work", href: "/work", preview: ["Experience timeline", "Featured projects", "Education"] },
  { name: "Projects", href: "/projects", preview: ["10 highlighted builds", "GitHub experiments", "Project deep-dives"] },
  { name: "Blog", href: "/blog", preview: ["Engineering essays", "System design notes", "Recent posts"] },
  { name: "Shelf", href: "/shelf", preview: ["Bookshelf", "Reading list", "Papers"] },
  { name: "Contact", href: "/contact", preview: ["Email", "Social links", "Collaboration"] },
];

export default function HiPage() {
  return (
    <div className="space-y-6">
      <PageHeaderLabel label="hi" />
      <h1 className="text-3xl font-semibold">Everything at a glance</h1>
      <p className="text-[var(--muted)]">Quick overview of each section.</p>

      <section className="space-y-2 pt-2" aria-label="Tech stack marquee">
        <h2 className="text-lg font-semibold">Tech stack</h2>
        <p className="text-sm text-[var(--muted)]">Stack strip — scrolls continuously.</p>
        <InfiniteTechMarquee />
      </section>

      <div className="grid gap-3">
        {sections.map((section) => (
          <Link key={section.name} href={section.href} className="border border-[var(--border)] p-4 hover:bg-[var(--surface)]">
            <h2 className="font-semibold">
              {section.name} -&gt;
            </h2>
            <p className="text-[var(--muted)] text-sm mt-1">{section.preview.join(" · ")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
