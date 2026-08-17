import { Reveal } from "@/components/site/Reveal";
import { WorkflowFlow } from "@/components/sections/WorkflowFlow";
import { AlertTriangle, Zap } from "lucide-react";
import type { Industry } from "@/content/industries";

export function IndustrySection({ industry }: { industry: Industry }) {
  return (
    <div
      id={industry.slug}
      className="scroll-mt-24 border-t border-border py-16 first:border-t-0 first:pt-0 md:py-20"
    >
      <Reveal>
        <div className="max-w-2xl">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {industry.name}
          </div>
          <h3 className="mt-3 text-2xl md:text-4xl">{industry.headline}</h3>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl border border-border bg-card/40 p-7">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <AlertTriangle className="h-4 w-4 text-primary" /> What gets in the way
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {industry.problems.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="h-full rounded-2xl border border-primary/30 bg-card/60 p-7">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Zap className="h-4 w-4 text-primary" /> What we typically build
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/85">
              {industry.automations.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
      <div className="mt-10">
        <WorkflowFlow steps={industry.workflow} title={`${industry.name} workflow`} />
      </div>
    </div>
  );
}
