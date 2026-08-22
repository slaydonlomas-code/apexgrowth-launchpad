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

type Draft = Record<Key, string>;

const KEYS = Object.keys(DEFAULT_INPUTS) as Key[];

const toDraft = (inputs: CalculatorInputs): Draft =>
  KEYS.reduce((acc, k) => {
    acc[k] = String(inputs[k]);
    return acc;
  }, {} as Draft);

/** Returns a number when the raw text is a complete, in-range value, else null. */
function parseField(key: Key, raw: string): number | null {
  const text = raw.trim();
  if (text === "") return null;
  if (!/^\d*(\.\d+)?$/.test(text)) return null;
  const n = Number(text);
  if (!Number.isFinite(n)) return null;
  const { min, max } = LIMITS[key];
  if (n < min || n > max) return null;
  return n;
}

/** Strips unnecessary leading zeros while preserving 0 and decimals. */
function normalize(raw: string): string {
  const text = raw.trim();
  if (text === "") return "";
  if (!/^\d*(\.\d+)?$/.test(text)) return text;
  const n = Number(text);
  if (!Number.isFinite(n)) return text;
  return String(n);
}

export function SavingsCalculator() {
  const [draft, setDraft] = useState<Draft>(() => toDraft(DEFAULT_INPUTS));
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const started = useRef(false);
  const completed = useRef(false);

  const parsed = useMemo(() => {
    const values = {} as CalculatorInputs;
    for (const k of KEYS) {
      const n = parseField(k, draft[k]);
      if (n === null) return null;
      values[k] = n;
    }
    return values;
  }, [draft]);

  const results = useMemo(() => (parsed ? calculate(parsed) : null), [parsed]);
  const recoveryText = parseField("recoveryPct", draft.recoveryPct);

  useEffect(() => {
    if (results && results.monthlyOpportunity > 0 && !completed.current) {
      completed.current = true;
      trackEvent("calculator_complete", { calculator: "automation_savings" });
    }
  }, [results]);

  const markStarted = () => {
    if (!started.current) {
      started.current = true;
      trackEvent("calculator_start", { calculator: "automation_savings" });
    }
  };

  const setText = (key: Key, text: string) => {
    markStarted();
    setDraft((prev) => ({ ...prev, [key]: text }));
  };

  const setFromSlider = (key: Key, value: number) => {
    markStarted();
    setDraft((prev) => ({ ...prev, [key]: String(clampInput(key, value)) }));
  };

  const blurField = (key: Key) => {
    setDraft((prev) => {
      const next = normalize(prev[key]);
      if (next === "") return prev[key] === "" ? prev : { ...prev, [key]: "" };
      const n = Number(next);
      const final = Number.isFinite(n) ? String(clampInput(key, n)) : next;
      return final === prev[key] ? prev : { ...prev, [key]: final };
    });
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
            <Field
              key={f.key}
              def={f}
              value={draft[f.key]}
              onChange={setText}
              onSlide={setFromSlider}
              onBlur={blurField}
            />
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
            Estimates assume only {recoveryText ?? DEFAULT_RECOVERY_PCT}% of missed or
            under-followed leads could realistically be recovered — a deliberately conservative
            assumption
            {recoveryText !== null && recoveryText !== DEFAULT_RECOVERY_PCT
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
                value={draft.recoveryPct}
                onChange={setText}
                onSlide={setFromSlider}
                onBlur={blurField}
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
  onSlide,
  onBlur,
}: {
  def: FieldDef;
  value: string;
  onChange: (key: Key, value: string) => void;
  onSlide: (key: Key, value: number) => void;
  onBlur: (key: Key) => void;
}) {
  const id = `calc-${def.key}`;
  const helpId = `${id}-help`;
  const limits = LIMITS[def.key];
  const parsedValue = parseField(def.key, value);
  const invalid = parsedValue === null;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {def.label}
      </label>
      <p id={helpId} className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {def.help}
      </p>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative w-36 shrink-0">
          {def.prefix && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground"
            >
              {def.prefix}
            </span>
          )}
          <input
            id={id}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            aria-describedby={helpId}
            aria-invalid={invalid || undefined}
            onChange={(e) => onChange(def.key, e.target.value)}
            onBlur={() => onBlur(def.key)}
            className={`no-spinner w-full rounded-xl border border-border bg-background py-2.5 text-sm text-foreground outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 ${
              def.prefix ? "pl-7" : "pl-3"
            } ${def.suffix ? "pr-12" : "pr-3"}`}
          />
          {def.suffix && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground"
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
            value={parsedValue ?? limits.min}
            aria-label={`${def.label} slider`}
            onChange={(e) => onSlide(def.key, e.target.valueAsNumber)}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-primary"
          />
        )}
      </div>
    </div>
  );
}


function Results({ results }: { results: ReturnType<typeof calculate> | null }) {
  const rows = results
    ? [
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
      ]
    : [];

  const placeholder = "Complete all fields to see your estimate";

  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-3xl border border-border bg-card/60 p-7 md:p-9">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Your estimate
        </div>
        <h2 className="mt-3 text-2xl text-foreground md:text-3xl">
          Estimated combined monthly opportunity
        </h2>
        {results ? (
          <>
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
          </>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite" role="status">
            {placeholder}
          </p>
        )}

        {results && (
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {rows.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="text-sm leading-snug text-muted-foreground">{r.label}</dt>
                <dd className="shrink-0 text-sm font-medium text-foreground">{r.value}</dd>
              </div>
            ))}
          </dl>
        )}


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
