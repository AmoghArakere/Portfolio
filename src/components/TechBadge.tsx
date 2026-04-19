export default function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-md bg-[var(--tag-bg)] text-[var(--tag-text)] text-xs px-2 py-0.5 border border-[var(--border)]">
      {label}
    </span>
  );
}
