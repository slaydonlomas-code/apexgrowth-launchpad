import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, ChevronDown } from "lucide-react";
import {
  CalculatorInputs,
  DEFAULT_INPUTS,
  DEFAULT_RECOVERY_PCT,
  LIMITS,
  calculate,
  clampInput,
  formatCurrency,
  formatNumber,
} from "@/lib/savings-calculator";
import { trackEvent } from "@/lib/analytics";
import { CONTACT } from "@/content/site";

type Key = keyof CalculatorInputs;

interface FieldDef {
  key: Key;
  label: string;
  help: string;
  prefix?: string;
  suffix?: string;
  slider?: boolean;
}

const FIELDS: FieldDef[] = [
  {
    key: "monthlyLeads",
    label: "New leads received per month",
    help: "Calls, form submissions, and messages from potential customers.",
  },
  {
    key: "missedPct",
    label: "Leads missed or without timely follow-up",
    help: "Your best estimate of how many go unanswered or get followed up late.",
    suffix: "%",
    slider: true,
  },
  {
    key: "customerValue",
    label: "Average value of a new customer",
    help: "Typical revenue from one job or customer relationship.",
    prefix: "$",
  },
  {
    key: "closeRatePct",
    label: "Average lead-to-customer close rate",
    help: "Of the leads you do work, how many become customers.",
    suffix: "%",
    slider: true,
  },
  {
    key: "weeklyAdminHours",
    label: "Weekly hours on repetitive admin work",
    help: "Scheduling, data entry, reminders, follow-up messages, and similar tasks.",
    suffix: "hrs",
  },
  {
    key: "hourlyCost",
    label: "Average hourly labor cost",
    help: "Loaded hourly cost of the person doing that work.",
    prefix: "$",
  },
  {
    key: "automatablePct",
    label: "Repetitive work that could reasonably be automated",
    help: "A conservative share of those hours a system could handle.",
    suffix: "%",
    slider: true,
  },
];

export function SavingsCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const started = useRef(false);
  const completed = useRef(false);

  const results = useMemo(() => calculate(inputs), [inputs]);
  const hasResults = results.monthlyOpportunity > 0;

  useEffect(() => {
    if (hasResults && !completed.current) {
      completed.current = true;
      trackEvent("calculator_complete", { calculator: "automation_savings" });
    }
  }, [hasResults]);

  const update = (key: Key, raw: number) => {
    if (!started.current) {
      started.current = true;
      trackEvent("calculator_start", { calculator: "automation_savings" });
    }
    setInputs((prev) => ({ ...prev, [key]: clampInput(key, raw) }));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <form
        className="space-y-8"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Automation savings calculator inputs"
      >
        <div className="space-y-7">
          {FIELDS.map((f) => (
            <Field key={f.key} def={f} value={inputs[f.key]} onChange={update} />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card/40 p-5">
          <button
            type="button"
            onClick={() => setAdvancedOpen((v) => !v)}
            aria-expanded={advancedOpen}
            className="flex w-full items-center justify-between gap-3 text-left text-sm font-medium text-foreground"
          >
            Advanced assumptions
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition ${advancedOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          <p className="mt-2 text-sm text-muted-foreground">
            Estimates assume only {inputs.recoveryPct}% of missed or under-followed leads could
            realistically be recovered — a deliberately conservative assumption
            {inputs.recoveryPct !== DEFAULT_RECOVERY_PCT
              ? ` (default is ${DEFAULT_RECOVERY_PCT}%)`
              : ""}
            .
          </p>
          {advancedOpen && (
            <div className="mt-5 border-t border-border pt-5">
              <Field
                def={{
                  key: "recoveryPct",
                  label: "Conservative recovery assumption",
                  help: "Share of missed leads you could realistically re-engage with faster follow-up.",
                  suffix: "%",
                  slider: true,
                }}
                value={inputs.recoveryPct}
                onChange={update}
              />
            </div>
          )}
        </div>
      </form>

      <Results results={results} />
    </div>
  );
}

function Field({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: number;
  onChange: (key: Key, value: number) => void;
}) {
  const id = `calc-${def.key}`;
  const helpId = `${id}-help`;
  const limits = LIMITS[def.key];

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {def.label}
      </label>
      <p id={helpId} className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {def.help}
      </p>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative">
          {def.prefix && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
            >
              {def.prefix}
            </span>
          )}
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={limits.min}
            max={limits.max}
            step={limits.step}
            value={Number.isFinite(value) ? value : ""}
            aria-describedby={helpId}
            onChange={(e) => onChange(def.key, e.target.valueAsNumber)}
            className={`w-32 rounded-xl border border-border bg-background py-2.5 text-sm text-foreground outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 ${
              def.prefix ? "pl-7 pr-3" : "px-3"
            }`}
          />
          {def.suffix && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
            >
              {def.suffix}
            </span>
          )}
        </div>
        {def.slider && (
          <input
            type="range"
            min={limits.min}
            max={limits.max}
            step={limits.step}
            value={value}
            aria-label={`${def.label} slider`}
            onChange={(e) => onChange(def.key, e.target.valueAsNumber)}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-primary"
          />
        )}
      </div>
    </div>
  );
}

function Results({ results }: { results: ReturnType<typeof calculate> }) {
  const rows = [
    {
      label: "Estimated missed or under-followed leads each month",
      value: formatNumber(results.missedLeads, 1),
    },
    {
      label: "Estimated monthly hours potentially saved",
      value: `${formatNumber(results.hoursSaved, 1)} hrs`,
    },
    {
      label: "Estimated monthly revenue opportunity",
      value: formatCurrency(results.revenueOpportunity),
    },
    {
      label: "Estimated monthly labor-time value",
      value: formatCurrency(results.laborValue),
    },
  ];

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-3xl border border-border bg-card/60 p-7 md:p-9">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Your estimate
        </div>
        <h2 className="mt-3 text-2xl text-foreground md:text-3xl">
          Estimated combined monthly opportunity
        </h2>
        <div
          className="mt-4 text-4xl font-semibold text-foreground md:text-5xl"
          aria-live="polite"
          role="status"
        >
          {formatCurrency(results.monthlyOpportunity)}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Estimated annual opportunity:{" "}
          <span className="font-medium text-foreground">
            {formatCurrency(results.annualOpportunity)}
          </span>
        </p>

        <dl className="mt-8 divide-y divide-border border-y border-border">
          {rows.map((r) => (
            <div key={r.label} className="flex items-baseline justify-between gap-6 py-3.5">
              <dt className="text-sm leading-snug text-muted-foreground">{r.label}</dt>
              <dd className="shrink-0 text-sm font-medium text-foreground">{r.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          These estimates are illustrative and based on the information and assumptions entered.
          Actual results depend on your business, implementation, lead quality, processes, and
          market conditions. ApexGrowth does not guarantee specific savings or revenue.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={CONTACT.calendly}
            data-cta="primary"
            data-cta-location="savings-calculator-results"
            onClick={() => trackEvent("calculator_book_call", { calculator: "automation_savings" })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Book a Free Strategy Call
          </a>
          <Link
            to="/automations"
            data-cta="secondary"
            data-cta-location="savings-calculator-results"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/60"
          >
            Explore Automations <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
