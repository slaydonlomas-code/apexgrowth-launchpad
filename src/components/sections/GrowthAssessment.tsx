import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  LEVEL_SUMMARY,
  QUESTIONS,
  scoreAssessment,
  scoreRange,
  type AssessmentResult,
} from "@/lib/growth-assessment";
import { trackEvent } from "@/lib/analytics";
import { CONTACT } from "@/content/site";

type Stage = "intro" | "questions" | "calculating" | "results";

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-40";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function track(name: string, params?: Record<string, unknown>) {
  try {
    trackEvent(name, params);
  } catch {
    /* analytics must never break the assessment */
  }
}

export function GrowthAssessment() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const total = QUESTIONS.length;
  const question = QUESTIONS[index];
  const selected = question ? answers[question.id] : undefined;
  const complete = useMemo(() => QUESTIONS.every((q) => typeof answers[q.id] === "number"), [answers]);

  useEffect(() => {
    if (stage === "questions") headingRef.current?.focus();
  }, [stage, index]);

  useEffect(() => {
    if (stage === "results") resultsRef.current?.focus();
  }, [stage]);

  const start = useCallback(() => {
    track("growth_assessment_start");
    setStage("questions");
    setIndex(0);
  }, []);

  const finish = useCallback(() => {
    const scored = scoreAssessment(answers);
    if (!scored) return;
    setStage("calculating");
    window.setTimeout(() => {
      setResult(scored);
      setStage("results");
      track("growth_assessment_complete", {
        readiness_level: scored.level,
        recommended_service: scored.recommendation.service,
        overall_score_range: scoreRange(scored.overall),
      });
    }, 550);
  }, [answers]);

  const retake = useCallback(() => {
    track("growth_assessment_retake");
    setAnswers({});
    setResult(null);
    setIndex(0);
    setStage("questions");
  }, []);

  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card/60 p-7 text-center md:p-10">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Free business assessment
        </div>
        <h2 className="mt-4 text-2xl leading-snug text-foreground md:text-3xl">
          12 questions. About three minutes.
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          See how prepared your business is to capture leads, follow up consistently, reduce manual
          work, and convert more opportunities.
        </p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-green" aria-hidden="true" />
          Your answers stay in your browser and are not saved or submitted.
        </p>
        <div className="mt-8">
          <button type="button" onClick={start} className={btnPrimary}>
            Start My Assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  if (stage === "calculating") {
    return (
      <div
        className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-border bg-card/60 p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary motion-reduce:animate-none" />
        <p className="mt-5 text-sm text-muted-foreground">Scoring your answers…</p>
      </div>
    );
  }

  if (stage === "results" && result) {
    return (
      <Results
        ref={resultsRef}
        result={result}
        onRetake={retake}
      />
    );
  }

  const pct = Math.round(((index + 1) / total) * 100);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-border bg-card/60 p-6 md:p-9">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Question {index + 1} of {total}
          </p>
          <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[question.category]}</p>
        </div>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={index + 1}
          aria-label={`Question ${index + 1} of ${total}`}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>

        <fieldset className="mt-7 min-w-0" aria-labelledby={`${question.id}-prompt`}>
          <h2
            id={`${question.id}-prompt`}
            ref={headingRef}
            tabIndex={-1}
            aria-live="polite"
            className="text-xl leading-snug text-foreground outline-none md:text-2xl"
          >
            {question.prompt}
          </h2>
          <div className="mt-6 space-y-3">
            {question.options.map((opt) => {
              const isSelected = selected === opt.points;
              return (
                <label
                  key={opt.label}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition focus-within:ring-2 focus-within:ring-primary/40 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={opt.points}
                    checked={isSelected}
                    onChange={() => setAnswers((a) => ({ ...a, [question.id]: opt.points }))}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
                  />
                  <span className="text-sm leading-relaxed text-foreground">{opt.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className={btnSecondary}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
          {index === total - 1 ? (
            <button
              type="button"
              onClick={finish}
              disabled={!complete}
              className={btnPrimary}
            >
              See My Results <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
              disabled={typeof selected !== "number"}
              className={btnPrimary}
            >
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        Your answers stay in your browser and are not saved or submitted.
      </p>
    </div>
  );
}

const Results = ({
  ref,
  result,
  onRetake,
}: {
  ref: React.Ref<HTMLDivElement>;
  result: AssessmentResult;
  onRetake: () => void;
}) => {
  const rec = result.recommendation;

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="region"
      aria-live="polite"
      aria-label="Your Growth Readiness results"
      className="mx-auto max-w-4xl outline-none"
    >
      <div className="rounded-3xl border border-border bg-card/60 p-6 md:p-10">
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Your results
        </div>
        <div className="mt-5 grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
          <ScoreDial value={result.overall} />
          <div className="min-w-0">
            <h2 className="text-2xl leading-snug text-foreground md:text-3xl">
              Readiness level: {result.level}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {LEVEL_SUMMARY[result.level]}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CATEGORY_ORDER.map((cat) => (
            <div key={cat} className="rounded-2xl border border-border bg-background p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium text-foreground">{CATEGORY_LABELS[cat]}</p>
                <p className="text-sm font-semibold text-foreground">{result.categories[cat]}/100</p>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${result.categories[cat]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-green">
              Strongest area
            </p>
            <p className="mt-2 text-base text-foreground">
              {CATEGORY_LABELS[result.strongest]}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
              Biggest opportunity
            </p>
            <p className="mt-2 text-base text-foreground">{CATEGORY_LABELS[result.lowest]}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <h3 className="text-xl text-foreground md:text-2xl">Three recommended next actions</h3>
          <ol className="mt-5 space-y-4">
            {rec.actions.map((a, i) => (
              <li key={a} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Step {i + 1}. </span>
                  {a}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-background p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
            Recommended solution
          </p>
          <h3 className="mt-2 text-xl text-foreground">{rec.service}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{rec.focus}</p>
          <Link
            to={rec.serviceHref as never}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80"
          >
            Explore {rec.service} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <h3 className="text-xl text-foreground md:text-2xl">
            Want a personalized plan for your business?
          </h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            We’ll review your results, discuss your current systems, and identify the
            highest-impact opportunities for your business.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONTACT.calendly}
              data-cta="primary"
              data-cta-location="growth-readiness-results"
              onClick={() => track("growth_assessment_book_call")}
              className={btnPrimary}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Get a Free Growth Systems
              Audit
            </a>
            <button type="button" onClick={onRetake} className={btnSecondary}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Retake Assessment
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          This assessment is a directional self-evaluation based on your answers. Results are not a
          guarantee of specific outcomes. Nothing you entered was saved or submitted.
        </p>
      </div>
    </div>
  );
};

function ScoreDial({ value }: { value: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative mx-auto h-36 w-36 shrink-0 md:mx-0">
      <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="64" cy="64" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">out of 100</span>
      </div>
      <span className="sr-only">Overall Growth Readiness Score: {value} out of 100.</span>
    </div>
  );
}
