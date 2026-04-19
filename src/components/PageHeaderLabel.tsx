export default function PageHeaderLabel({ label }: { label: string }) {
  return (
    <div className="mb-4 text-sm text-[var(--muted)]">{label}</div>
  );
}
