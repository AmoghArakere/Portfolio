import type { Metadata } from "next";
import CliTerminal from "@/components/CliTerminal";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "CLI | Nrupa",
  description: "Interactive terminal — projects, blog, links, and a few surprises.",
};

export default async function CliPage() {
  const posts = await getAllPosts();
  const postsPayload = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    tags: p.tags,
    excerpt: p.excerpt,
  }));

  return (
    <div className="py-1">
      <h1 className="sr-only">NRUPA terminal</h1>
      <CliTerminal posts={postsPayload} />
    </div>
  );
}
