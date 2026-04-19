import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "All Posts | Nrupa Blog",
  description: "Archive of all blog posts.",
};

export default async function BlogPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">All Posts</h1>
      {posts.map((post) => (
        <BlogCard key={post.slug} slug={post.slug} title={post.title} excerpt={post.excerpt} date={post.date} readTime={post.readTime} tags={post.tags} />
      ))}
    </div>
  );
}
