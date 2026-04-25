"use client";

type InfiniteGithubCardsProps = {
  items: readonly (readonly [string, string])[];
};

export default function InfiniteGithubCards({ items }: InfiniteGithubCardsProps) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent_0%,black_16%,black_84%,transparent_100%)]">
      <div className="github-cards-track">
        {loop.map(([name, description], index) => (
          <a
            key={`${name}-${index}`}
            href={`https://github.com/nrupa/${name}`}
            target="_blank"
            rel="noreferrer"
            className="block w-[19rem] max-w-[82vw] min-h-[9.5rem] shrink-0 rounded-2xl border border-white/10 bg-black/75 p-4 transition-colors duration-200 hover:border-white/20 hover:bg-black/90 !no-underline hover:!no-underline"
          >
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="size-4 text-violet-400" fill="currentColor" aria-hidden>
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.8-.25.8-.56v-2.08c-3.2.7-3.87-1.35-3.87-1.35-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.71.08-.71 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.72 0-1.27.46-2.3 1.2-3.12-.12-.29-.52-1.48.12-3.08 0 0 .98-.31 3.2 1.19a11.16 11.16 0 0 1 5.82 0c2.2-1.5 3.19-1.19 3.19-1.19.64 1.6.24 2.79.12 3.08.75.82 1.2 1.85 1.2 3.12 0 4.45-2.7 5.42-5.26 5.7.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.81.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              <h3 className="text-lg font-semibold lowercase text-[var(--text)]">{name}</h3>
            </div>
            <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">{description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
