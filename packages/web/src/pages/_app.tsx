import { AppProps } from 'next/app';
import '../styles/globals.css';
import { getFirebase } from '../lib/firebase';
import Head from 'next/head';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { useEffect } from 'react';
import isElectron from 'is-electron';
import { useHostStore } from '../global-stores/useHostStore';

getFirebase();

Sentry.init({
  dsn:
    'https://071d49981fda48c7baa379bc1933a144@o571596.ingest.sentry.io/5720036',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (isElectron()) {
      const ipcRenderer = window.require('electron').ipcRenderer;
      ipcRenderer.send('@app/hostPlatform');
      ipcRenderer.on(
        '@app/hostPlatform',
        (
          event: any,
          platform: { isLinux: boolean; isWin: boolean; isMac: boolean }
        ) => {
          useHostStore.getState().setData(platform);
        }
      );
    }
    console.log(useHostStore.getState());
  }, []);
  return (
    <>
      <Head>
        <title>Oasis - Discover and Discuss</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
        <meta
          name="description"
          content="Oasis - Discover new ideas, Discuss with developers."
        />
        <meta
          name="keywords"
          content="developers,ideas,discuss,fun,programming,graphql,typescript,nextjs,firebase,tailwindcss,react,apollo"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
