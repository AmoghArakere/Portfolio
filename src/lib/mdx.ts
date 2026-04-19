import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  cover: string;
  excerpt: string;
  featured?: boolean;
  slug: string;
};

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(BLOG_DIR, file);
        const source = await fs.readFile(fullPath, "utf-8");
        const { data } = matter(source);
        return { ...(data as Omit<PostMeta, "slug">), slug };
      }),
  );
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(source);
  const { content: mdxContent } = await compileMDX({ source: content, options: { parseFrontmatter: false } });
  return {
    frontmatter: { ...(data as Omit<PostMeta, "slug">), slug },
    content: mdxContent,
  };
}
