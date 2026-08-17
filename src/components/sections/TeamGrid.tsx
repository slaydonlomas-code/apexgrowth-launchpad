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
  "Updating records and follow-up tasks",
  "Following up on estimates",
  "Requesting reviews after the job",
];

export function TeamGrid() {
  return (
    <div className="relative grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
      <Reveal>
        <Panel
          icon={Users}
          title="Your team"
          subtitle="Relationships and judgment"
          items={HUMANS}
        />
      </Reveal>
      <div className="flex items-center justify-center py-1 lg:py-0">
        <div className="hidden h-full w-px bg-primary/15 lg:block" aria-hidden="true" />
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/25 bg-card text-primary shadow-elegant lg:-mx-[22px]">
          <Link2 className="h-4.5 w-4.5" aria-hidden="true" />
        </div>
      </div>
      <Reveal delay={120}>
        <Panel
          icon={Bot}
          title="Your digital workforce"
          subtitle="Coverage and consistency"
          items={DIGITAL}
          accent
        />
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
    <div
      className={`h-full rounded-2xl border bg-card p-7 ${accent ? "border-primary/30 shadow-elegant" : "border-border"}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-xl ${
            accent
              ? "bg-gold-gradient text-primary-foreground shadow-gold"
              : "border border-border bg-muted text-foreground"
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <div className="text-lg font-semibold text-foreground">{title}</div>
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {subtitle}
          </div>
        </div>
      </div>
      <ul className="mt-6 space-y-3 text-sm text-foreground">
        {items.map((i) => (
          <li key={i} className="flex gap-3">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent ? "bg-green" : "bg-primary/50"}`}
              aria-hidden="true"
            />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
