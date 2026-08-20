import * as Sentry from "@sentry/tanstackstart-react";

const DSN =
  "https://4f4f88281c1f34f2461ef9719b598da9@o4511933012967424.ingest.us.sentry.io/4511944459354112";

const isProd = import.meta.env.PROD;

Sentry.init({
  dsn: DSN,
  environment: isProd ? "production" : "development",

  // Privacy: never send user identity or request/response bodies.
  sendDefaultPii: false,
  dataCollection: {
    userInfo: false,
    httpBodies: [],
  },

  // Low sampling in production to stay within the free plan.
  tracesSampleRate: isProd ? 0.05 : 0,

  // Session Replay intentionally disabled for now.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});
