import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags?: string[];
  cover?: string;
  compact?: boolean;
  className?: string;
};

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  readTime,
  tags = [],
  cover,
  compact = false,
  className,
}: Props) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "block border border-[var(--border)] p-4 transition-colors hover:bg-[var(--surface)]",
        className,
      )}
    >
      {cover ? (
        <div className={`w-full mb-3 border border-[var(--border)] bg-[var(--surface)] ${compact ? "h-28" : "h-52"}`} />
      ) : null}
      <div className="flex flex-wrap gap-2 text-xs text-[var(--muted)] mb-2">
        {tags.map((tag) => (
          <span key={tag}>[{tag}]</span>
        ))}
      </div>
      <h3 className={`font-semibold ${compact ? "text-base" : "text-lg"}`}>{title}</h3>
      <p className="text-[var(--muted)] mt-2">{excerpt}</p>
      <p className="text-sm text-[var(--muted)] mt-3">
        {date} - {readTime}
      </p>
    </Link>
  );
}
