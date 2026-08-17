import { Reveal } from "@/components/site/Reveal";
import { WorkflowFlow } from "@/components/sections/WorkflowFlow";
import { CapabilityList } from "@/components/sections/CapabilityList";
import type { Automation } from "@/content/automations";

export function AutomationSection({ automation }: { automation: Automation }) {
  return (
    <div id={automation.slug} className="scroll-mt-24 border-t border-border py-16 first:border-t-0 first:pt-0 md:py-20">
      <Reveal>
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">{automation.tagline}</div>
          <h3 className="mt-3 text-2xl md:text-4xl">{automation.name}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{automation.problem}</p>
          <p className="mt-3 leading-relaxed text-foreground/85">{automation.summary}</p>
        </div>
      </Reveal>
      <div className="mt-10">
        <WorkflowFlow steps={automation.workflow} title="How it works" />
      </div>
      <div className="mt-10">
        <div className="mb-5 text-xs uppercase tracking-[0.2em] text-gold-soft">What it includes</div>
        <CapabilityList items={automation.capabilities} columns={2} />
      </div>
    </div>
  );
}
