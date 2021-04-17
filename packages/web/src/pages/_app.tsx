import { AppProps } from 'next/app';
import '../styles/globals.css';
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
           <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
