import Link from "next/link";

type MovingBorderLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function MovingBorderLink({ href, children }: MovingBorderLinkProps) {
  return (
    <Link
      href={href}
      className="group relative inline-flex overflow-hidden rounded-full p-[1px] !no-underline hover:!no-underline"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[-140%] animate-[spin_2.8s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(129,140,248,.15),rgba(129,140,248,.8),rgba(129,140,248,.15),rgba(129,140,248,.8),rgba(129,140,248,.15))]"
      />
      <span className="relative inline-flex items-center rounded-full bg-[var(--surface)]/90 px-4 py-2 text-xs font-semibold text-[var(--text)] transition-colors group-hover:bg-[var(--nav-pill)]">
        {children}
      </span>
    </Link>
  );
}
