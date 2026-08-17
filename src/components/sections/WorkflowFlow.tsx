import { Reveal } from "@/components/site/Reveal";
import { ChevronRight } from "lucide-react";

export interface WorkflowStep {
  label: string;
  detail: string;
}

export function WorkflowFlow({ steps, title }: { steps: WorkflowStep[]; title?: string }) {
  return (
    <div className="w-full">
      {title && <div className="mb-6 text-xs uppercase tracking-[0.2em] text-gold-soft">{title}</div>}
      <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 70}>
            <li className="relative h-full rounded-2xl border border-border bg-card/50 p-5 transition hover:border-primary/40">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-gradient text-[11px] font-medium text-primary-foreground">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{s.label}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="pointer-events-none absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-primary/50 lg:block" />
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
