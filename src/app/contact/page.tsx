import type { Metadata } from "next";
import CalBookingButton from "@/components/CalBookingButton";
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
        <section className="rounded-2xl border border-[var(--border)] bg-black/20 p-5">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Your Name</label>
              <input className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" placeholder="John Doe" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Email Address</label>
              <input className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" placeholder="john@example.com" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold">Your Message</label>
              <textarea className="min-h-28 w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2" placeholder="Tell me about your project or just say hello!" />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl border border-indigo-700 bg-indigo-800/80 px-3 py-2.5 font-semibold text-white transition hover:bg-indigo-800"
            >
              Send Message -&gt;
            </button>
          </form>
        </section>

        <section className="space-y-5 rounded-2xl border border-[var(--border)] bg-black/20 p-5">
          <h2 className="text-3xl font-semibold tracking-tight">Connect</h2>
          <p className="text-[var(--muted)]">I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
          <p className="text-[var(--muted)]">Based in India, but working with clients worldwide.</p>

          <div className="space-y-1">
            <p className="text-sm font-semibold">Email</p>
            <p className="text-indigo-800">
              amogh.nagaraj03@gmail.com
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold">Follow Me</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://github.com/AmoghArakere" rel="noreferrer" className="!no-underline hover:!no-underline hover:!text-indigo-800">
                GitHub
              </a>
              <a href="https://twitter.com/nrupatungaa" rel="noreferrer" className="!no-underline hover:!no-underline hover:!text-indigo-800">
                Twitter
              </a>
              <a href="https://linkedin.com/in/amogh07/" rel="noreferrer" className="!no-underline hover:!no-underline hover:!text-indigo-800">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold">Quick Meeting</p>
            <div className="flex flex-nowrap items-center gap-2">
              <span className="whitespace-nowrap text-indigo-800">
                Schedule a call
              </span>
              <CalBookingButton />
            </div>
          </div>

          <div className="mt-2 rounded-xl border border-[var(--border)] bg-[#232323] p-3">
            <p className="italic text-[var(--muted)]">
              &ldquo;If you want something you&rsquo;ve never had, you must be willing to do something you&rsquo;ve never
              done.&rdquo;
            </p>
            <p className="mt-2 text-right text-[var(--muted)]">— Thomas Jefferson</p>
          </div>

        </section>
      </div>
    </div>
  );
}
