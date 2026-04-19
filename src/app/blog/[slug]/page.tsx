import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    return {
      title: `${post.frontmatter.title} | Nrupa Blog`,
      description: post.frontmatter.excerpt,
    };
  } catch {
    return { title: "Post not found" };
  }
}

async function safeGetPost(slug: string) {
  try {
    return await getPostBySlug(slug);
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await safeGetPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-5">
      <h1 className="text-3xl font-semibold">{post.frontmatter.title}</h1>
      <p className="text-sm text-[var(--muted)]">
        {formatDate(post.frontmatter.date)} · {post.frontmatter.readTime}
      </p>
      <div className="max-w-none [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h3]:font-semibold [&_p]:my-4 [&_code]:bg-[var(--surface)] [&_code]:px-1 [&_pre]:bg-[#0d0d0d] [&_pre]:border [&_pre]:border-[var(--border)] [&_pre]:p-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
        {post.content}
      </div>
      <button className="border border-[var(--border)] px-3 py-2">Buy Me a Coffee</button>
    </article>
  );
}
