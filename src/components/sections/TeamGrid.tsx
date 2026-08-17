import { Reveal } from "@/components/site/Reveal";
import { Users, Bot, Link2 } from "lucide-react";

const HUMANS = [
  "Building trust with customers",
  "Judgment calls and pricing decisions",
  "On-site work and quality",
  "Complex or sensitive conversations",
  "Closing the job",
];

const DIGITAL = [
  "Answering calls around the clock",
  "Capturing and qualifying new leads",
  "Booking and confirming appointments",
  "Following up on estimates",
  "Requesting reviews after the job",
];

export function TeamGrid() {
  return (
    <div className="relative grid gap-5 lg:grid-cols-[1fr_auto_1fr]">
      <Reveal>
        <Panel icon={Users} title="Your team" subtitle="Relationships and judgment" items={HUMANS} />
      </Reveal>
      <div className="hidden items-center justify-center lg:flex">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-gold-gradient text-primary-foreground shadow-gold">
          <Link2 className="h-5 w-5" />
        </div>
      </div>
      <Reveal delay={120}>
        <Panel icon={Bot} title="Your digital workforce" subtitle="Coverage and consistency" items={DIGITAL} accent />
      </Reveal>
    </div>
  );
}

function Panel({
  icon: Icon,
  title,
  subtitle,
  items,
  accent,
}: {
  icon: typeof Users;
  title: string;
  subtitle: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className={`h-full rounded-2xl border p-7 ${accent ? "border-primary/40 bg-card/70" : "border-border bg-card/40"}`}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-primary-foreground shadow-gold">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <div className="text-lg">{title}</div>
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{subtitle}</div>
        </div>
      </div>
      <ul className="mt-6 space-y-3 text-sm text-foreground/85">
        {items.map((i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
