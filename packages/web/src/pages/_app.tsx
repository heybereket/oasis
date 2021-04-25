import { AppProps } from 'next/app';
import '../styles/globals.css';
import { getFirebase } from '../lib/firebase';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/apolloClient';

getFirebase();

export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Head>
        <noscript dangerouslySetInnerHTML={{__html: `<h1>JavaScript is not supported.</h1>`}} />
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
    </ApolloProvider>
  );
}
