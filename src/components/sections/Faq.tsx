import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-muted/60"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-foreground">{f.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
            </button>
            <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="min-h-0 px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection({ items, eyebrow = "Frequently asked", title = "Questions, answered." }: { items: FaqItem[]; eyebrow?: string; title?: string }) {
  return (
    <section id="faq" className="scroll-mt-24 border-y border-border bg-muted/40 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
            <h2 className="mt-3 text-3xl md:text-5xl">{title}</h2>
          </div>
        </Reveal>
        <div className="mt-12">
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}

export const faqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});
