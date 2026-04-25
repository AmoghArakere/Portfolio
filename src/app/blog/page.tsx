import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Nrupa",
  description: "Engineering lessons in plain words.",
};

export default function BlogHomePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold">nrupa&apos;s blog</h1>
        <p className="text-[var(--muted)]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p className="text-[var(--muted)]">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </section>
    </div>
  );
}
