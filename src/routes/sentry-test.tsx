import { createFileRoute } from "@tanstack/react-router";
import * as Sentry from "@sentry/tanstackstart-react";
import { useState } from "react";

export const Route = createFileRoute("/sentry-test")({
  head: () => ({
    meta: [
      { title: "Sentry Test — ApexGrowth" },
      { name: "description", content: "Temporary internal page used to verify error monitoring." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Sentry Test — ApexGrowth" },
      { property: "og:description", content: "Temporary internal error monitoring check." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SentryTestPage,
});

function SentryTestPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-medium text-foreground">Error monitoring test</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Temporary internal page. Sending a test event confirms monitoring is connected. Remove
          this page once verified.
        </p>
        <button
          type="button"
          onClick={() => {
            Sentry.captureException(new Error("ApexGrowth Sentry verification event"));
            setSent(true);
          }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Send test event
        </button>
        {sent ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Test event sent. Check your Sentry issues feed in a moment.
          </p>
        ) : null}
      </div>
    </main>
  );
}
