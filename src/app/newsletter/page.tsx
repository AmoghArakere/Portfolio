import NewsletterForm from "@/components/NewsletterForm";

export default function NewsletterPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Newsletter</h1>
      <p className="text-[var(--muted)]">Occasional notes about backend systems, engineering, and what I am building.</p>
      <NewsletterForm />
    </div>
  );
}
