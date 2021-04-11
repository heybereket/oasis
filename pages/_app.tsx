import { AppProps } from 'next/app';
import '../styles/globals.css';
import { getFirebase } from '../lib/firebase';
import Head from 'next/head'

getFirebase();

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
      />
    </Head>
    <Component {...pageProps} />
    </div>
  );
}

export default App;
