import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog | Nrupa",
  description: "Engineering lessons in plain words.",
};

export default async function BlogHomePage() {
  const posts = await getAllPosts();
  const [center, left, right, ...more] = posts;

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-semibold">nrupa&apos;s blog</h1>
        <p className="text-[var(--muted)]">engineering lessons for you and me, in plain words</p>
      </section>

      <section className="grid md:grid-cols-[1fr_2fr_1fr] gap-4">
        {left ? <BlogCard slug={left.slug} title={left.title} excerpt={left.excerpt} date={left.date} readTime={left.readTime} tags={left.tags} cover={left.cover} compact /> : null}
        {center ? <BlogCard slug={center.slug} title={center.title} excerpt={center.excerpt} date={center.date} readTime={center.readTime} tags={center.tags} cover={center.cover} /> : null}
        {right ? <BlogCard slug={right.slug} title={right.title} excerpt={right.excerpt} date={right.date} readTime={right.readTime} tags={right.tags} cover={right.cover} compact /> : null}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Stay in the loop</h2>
        <p className="text-[var(--muted)] mb-3">New posts delivered to your inbox. No spam.</p>
        <NewsletterForm />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">More Posts</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {more.map((post) => (
            <BlogCard key={post.slug} slug={post.slug} title={post.title} excerpt={post.excerpt} date={post.date} readTime={post.readTime} tags={post.tags} cover={post.cover} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
