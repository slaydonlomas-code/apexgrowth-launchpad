import { useId, useState } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

const budgets = ["Under $1K", "$1K–$3K", "$3K–$6K", "$6K–$15K", "$15K+"];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjenwnj";

export function ContactForm({ source = "Website" }: { source?: string } = {}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!res.ok) {
        let msg = "Submission failed. Please try again or call us directly.";
        try {
          const data = (await res.json()) as { errors?: Array<{ message?: string }> };
          if (data?.errors?.length) {
            msg =
              data.errors
                .map((x) => x.message)
                .filter(Boolean)
                .join(", ") || msg;
          }
        } catch {
          // ignore
        }
        throw new Error(msg);
      }
      setDone(true);
      toast.success("Thank you! Your request has been received. We'll be in touch shortly.");
      form.reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-border bg-card/60 p-10 text-center shadow-elegant">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-primary-foreground">
          <Send className="h-6 w-6" />
        </div>
        <h3 className="text-2xl">Thank you!</h3>
        <p className="mt-2 text-muted-foreground">
          Your request has been received. We'll be in touch shortly. Want to lock in a time now?
        </p>
        <a
          href="https://calendly.com/slaydon-lomas/30min"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold"
        >
          Book a Call
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      action={FORMSPREE_ENDPOINT}
      method="POST"
      className="grid gap-4 rounded-3xl border border-border bg-card/60 p-6 shadow-elegant md:p-10"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field id={id("name")} label="Name" name="name" required />
        <Field id={id("email")} label="Email" name="email" type="email" required />
        <Field id={id("phone")} label="Phone number" name="phone" type="tel" required />
        <Field id={id("business")} label="Business name" name="business" />
        <Field id={id("website")} label="Current website" name="website" placeholder="https://" />
        <div>
          <label
            htmlFor={id("budget")}
            className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground"
          >
            Estimated budget
          </label>
          <select
            id={id("budget")}
            name="budget"
            className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary"
            defaultValue=""
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor={id("details")}
          className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground"
        >
          Project details
        </label>
        <textarea
          id={id("details")}
          name="details"
          required
          rows={5}
          minLength={5}
          maxLength={4000}
          placeholder="Tell us about your business and what you'd like to achieve."
          className="w-full resize-y rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary"
        />
      </div>
      {/* Honeypot for spam bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />
      <input type="hidden" name="_subject" value="New ApexGrowth lead inquiry" />
      <input type="hidden" name="source" value={source} />
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          By submitting you consent to be contacted about your inquiry.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send inquiry <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary"
      />
    </div>
  );
}
