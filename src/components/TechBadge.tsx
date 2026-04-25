type TechBadgeProps = {
  label: string;
  className?: string;
};

export default function TechBadge({ label, className = "" }: TechBadgeProps) {
  return (
    <span className={`inline-block rounded-md bg-[var(--tag-bg)] text-[var(--tag-text)] text-xs px-2 py-0.5 border border-[var(--border)] ${className}`}>
      {label}
    </span>
  );
}
