import type { Metadata } from "next";
import CalBookingButton from "@/components/CalBookingButton";
import CardSpotlight from "@/components/CardSpotlight";
import PageHeaderLabel from "@/components/PageHeaderLabel";

export const metadata: Metadata = {
  title: "Contact | Nrupa",
  description: "Get in touch for collaborations and opportunities.",
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeaderLabel label="contact" />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <section className="rounded-2xl border border-[var(--contact-panel-border)] bg-[var(--surface)] p-5">
          <h2 className="mb-4 text-lg font-semibold tracking-normal text-[var(--text)]">
            Send a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Your Name</label>
              <input className="w-full rounded-xl border border-[var(--contact-panel-border)] bg-[var(--surface)]/40 px-3 py-2 outline-none transition placeholder:text-[var(--input-placeholder)] focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/25" placeholder="John Doe" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Email Address</label>
              <input className="w-full rounded-xl border border-[var(--contact-panel-border)] bg-[var(--surface)]/40 px-3 py-2 outline-none transition placeholder:text-[var(--input-placeholder)] focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/25" placeholder="john@example.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Your Message</label>
              <textarea className="min-h-28 w-full rounded-xl border border-[var(--contact-panel-border)] bg-[var(--surface)]/40 px-3 py-2 outline-none transition placeholder:text-[var(--input-placeholder)] focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-500/25" placeholder="Tell me about your project or just say hello!" />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl border border-indigo-300/40 bg-indigo-300 px-3 py-1.5 font-semibold text-indigo-950 transition hover:border-indigo-200/80 hover:bg-indigo-200"
            >
              Send Message -&gt;
            </button>
          </form>
        </section>

        <CardSpotlight
          radius={340}
          color="99,102,241"
          className="flex h-full flex-col rounded-2xl border border-[var(--contact-panel-border)] bg-[var(--surface)] p-5"
        >
          <h2 className="mb-2 text-lg font-semibold tracking-normal text-[var(--text)]">Connect</h2>
          <p className="text-[var(--muted)]">I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
          <p className="text-[var(--muted)]">Based in India, but working with clients worldwide.</p>

          <div className="mt-4 space-y-1">
            <p className="text-sm font-semibold">Email</p>
            <p className="text-indigo-300">
              amogh.nagaraj03@gmail.com
            </p>
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-sm font-semibold">Follow Me</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://github.com/AmoghArakere" rel="noreferrer" className="!no-underline hover:!no-underline hover:!text-indigo-300">
                GitHub
              </a>
              <a href="https://twitter.com/nrupatungaa" rel="noreferrer" className="!no-underline hover:!no-underline hover:!text-indigo-300">
                Twitter
              </a>
              <a href="https://linkedin.com/in/amogh07/" rel="noreferrer" className="!no-underline hover:!no-underline hover:!text-indigo-300">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <p className="text-sm font-semibold">Quick Meeting</p>
            <div className="flex flex-nowrap items-center gap-2">
              <span className="whitespace-nowrap text-indigo-300">
                Schedule a call
              </span>
              <CalBookingButton />
            </div>
          </div>

          <div className="mt-auto pt-3">
            <CardSpotlight
              radius={260}
              color="99,102,241"
              className="rounded-2xl border border-indigo-400/15 bg-black/30 p-4 backdrop-blur-sm"
            >
              <p className="italic text-[var(--muted)]">
                &ldquo;Believe you can and you are halfway there.&rdquo;
              </p>
              <p className="mt-2 text-right text-[var(--muted)]">— Theodore Roosevelt</p>
            </CardSpotlight>
          </div>
        </CardSpotlight>
      </div>
    </div>
  );
}
