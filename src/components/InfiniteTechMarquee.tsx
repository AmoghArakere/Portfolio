/**
 * Compact pill marquee (infinite scroll) — inspired by Aceternity “Infinite Moving Cards”
 * @see https://ui.aceternity.com/components/infinite-moving-cards
 */
type TechMarqueeItem = {
  /** simple-icons slug for https://cdn.simpleicons.org/{slug}/{color} (ignored when localIcon is set) */
  iconSlug: string;
  /** brand hex without # */
  iconColor: string;
  label: string;
  /** optional static asset under /public (e.g. /tech/azure.png) */
  localIcon?: string;
};

const DEFAULT_ITEMS: TechMarqueeItem[] = [
  { iconSlug: "react", iconColor: "61DAFB", label: "React" },
  { iconSlug: "go", iconColor: "00ADD8", label: "Go" },
  { iconSlug: "docker", iconColor: "2496ED", label: "Docker" },
  { iconSlug: "postgresql", iconColor: "4169E1", label: "PostgreSQL" },
  { iconSlug: "redis", iconColor: "DC382D", label: "Redis" },
  { iconSlug: "microsoftazure", iconColor: "0078D4", label: "Azure", localIcon: "/tech/azure.png" },
  { iconSlug: "dotnet", iconColor: "512BD4", label: ".NET Core" },
  { iconSlug: "python", iconColor: "3776AB", label: "Python" },
  { iconSlug: "anthropic", iconColor: "D97757", label: "Claude", localIcon: "/tech/claude.png" },
  { iconSlug: "postman", iconColor: "FF6C37", label: "Postman" },
  { iconSlug: "apachekafka", iconColor: "D2D2D2", label: "Kafka" },
  { iconSlug: "git", iconColor: "F05032", label: "Git" },
];

function iconSrc(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

function TechPill({ item }: { item: TechMarqueeItem }) {
  const src = item.localIcon ?? iconSrc(item.iconSlug, item.iconColor);

  return (
    <div className="hi-tech-pill inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-zinc-700 bg-black px-2.5 pl-2 pr-3 font-sans text-sm font-medium text-white shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element -- external SVG badge */}
      <img
        src={src}
        alt=""
        width={20}
        height={20}
        className="size-5 shrink-0 object-contain"
        loading="lazy"
        decoding="async"
      />
      <span className="whitespace-nowrap leading-none">{item.label}</span>
    </div>
  );
}

export default function InfiniteTechMarquee({ items = DEFAULT_ITEMS }: { items?: TechMarqueeItem[] }) {
  const loop = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
      <div className="hi-stack-marquee-track">
        {loop.map((item, idx) => (
          <TechPill key={`${item.iconSlug}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}
