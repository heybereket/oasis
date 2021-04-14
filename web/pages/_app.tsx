import { AppProps } from 'next/app';
import 'styles/globals.css';
import { getFirebase } from '../lib/firebase';
import Head from 'next/head';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
getFirebase();

Sentry.init({
  dsn:
    'https://071d49981fda48c7baa379bc1933a144@o571596.ingest.sentry.io/5720036',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
