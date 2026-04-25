import type { Metadata } from "next";
import PageHeaderLabel from "@/components/PageHeaderLabel";

export const metadata: Metadata = {
  title: "More | Nrupa",
  description: "More about me beyond tech.",
};

export default function MorePage() {
  return (
    <div className="space-y-4 pt-3">
      <section>
        <PageHeaderLabel label="more" />
        <h1 className="text-3xl font-semibold">More About Me</h1>
        <div className="mt-3 space-y-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </section>
    </div>
  );
}
