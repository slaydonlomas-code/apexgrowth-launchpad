import { Reveal } from "@/components/site/Reveal";
import { Check, X } from "lucide-react";

export interface CoverageRow {
  time: string;
  scenario: string;
  traditional: string;
  digital: string;
}

const DEFAULT_ROWS: CoverageRow[] = [
  { time: "8:00 AM", scenario: "Two calls come in at once", traditional: "Second caller hits voicemail", digital: "Both calls answered, details captured" },
  { time: "12:15 PM", scenario: "Lunch break", traditional: "Phone rings out", digital: "Call answered and qualified" },
  { time: "3:40 PM", scenario: "Office manager is on another line", traditional: "Caller waits or hangs up", digital: "Overflow call picked up instantly" },
  { time: "7:45 PM", scenario: "After hours request", traditional: "Voicemail until tomorrow", digital: "Request logged, follow-up text sent" },
  { time: "Saturday", scenario: "Weekend emergency", traditional: "No coverage", digital: "Urgency screened, on-call person alerted" },
];

export function CoverageTimeline({ rows = DEFAULT_ROWS }: { rows?: CoverageRow[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card/40">
      <div className="grid grid-cols-1 border-b border-border bg-background/60 text-xs uppercase tracking-[0.15em] text-muted-foreground md:grid-cols-[150px_1fr_1fr]">
        <div className="hidden px-5 py-4 md:block">When</div>
        <div className="px-5 py-4">Traditional office coverage</div>
        <div className="border-t border-border px-5 py-4 text-gold-soft md:border-l md:border-t-0">With digital coverage</div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r, i) => (
          <Reveal key={r.time} delay={(i % 3) * 60}>
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr_1fr]">
              <div className="px-5 pt-5 md:py-5">
                <div className="text-sm text-foreground">{r.time}</div>
                <div className="mt-1 text-xs text-muted-foreground">{r.scenario}</div>
              </div>
              <div className="flex items-start gap-3 px-5 py-4 md:py-5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" />
                <span className="text-sm text-muted-foreground">{r.traditional}</span>
              </div>
              <div className="flex items-start gap-3 border-t border-border px-5 py-4 md:border-l md:border-t-0 md:py-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{r.digital}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
