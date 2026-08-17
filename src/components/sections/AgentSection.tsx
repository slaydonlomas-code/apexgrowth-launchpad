import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { WorkflowFlow } from "@/components/sections/WorkflowFlow";
import { CapabilityList } from "@/components/sections/CapabilityList";
import type { Agent } from "@/content/agents";

export function AgentSection({ agent, link }: { agent: Agent; link?: string }) {
  return (
    <div
      id={agent.slug}
      className="scroll-mt-24 border-t border-border py-16 first:border-t-0 first:pt-0 md:py-20"
    >
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">{agent.tagline}</div>
            <h3 className="mt-3 text-2xl md:text-4xl">{agent.name}</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">{agent.problem}</p>
            <p className="mt-3 leading-relaxed text-foreground/85">{agent.summary}</p>
          </div>
          {link && (
            <Link
              to={link as never}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition hover:border-primary/60"
            >
              Full details <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </Reveal>
      <div className="mt-10">
        <WorkflowFlow steps={agent.workflow} title="How it works" />
      </div>
      <div className="mt-10">
        <div className="mb-5 text-xs uppercase tracking-[0.2em] text-gold-soft">
          What it handles
        </div>
        <CapabilityList items={agent.capabilities} columns={2} />
      </div>
    </div>
  );
}
