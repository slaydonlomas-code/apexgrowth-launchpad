import { Reveal } from "@/components/site/Reveal";

export interface WorkflowStep {
  label: string;
  detail: string;
}

export function WorkflowFlow({ steps, title }: { steps: WorkflowStep[]; title?: string }) {
  return (
    <div className="w-full">
      {title && <div className="mb-6 text-xs uppercase tracking-[0.2em] text-primary">{title}</div>}
      <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 70}>
            <li className="relative h-full pl-7 lg:pl-0 lg:pt-7">
              <span
                className="absolute left-[6px] top-5 bottom-[-1rem] w-px bg-primary/20 last:hidden lg:hidden"
                aria-hidden="true"
              />
              <span
                className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-primary bg-background lg:top-0"
                aria-hidden="true"
              />
              <span
                className={`pointer-events-none absolute left-3 top-[5px] hidden h-px bg-primary/20 lg:block ${
                  i < steps.length - 1 ? "right-[-1rem]" : "right-full"
                }`}
                aria-hidden="true"
              />
              <div className="text-sm font-semibold text-foreground">
                <span className="mr-2 text-primary/70">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
