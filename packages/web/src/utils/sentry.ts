import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { isProduction } from '@lib/constants';

export const initSentry = () => {
  if (isProduction) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      release: process.env.SENTRY_RELEASE,
    });
  }
};
