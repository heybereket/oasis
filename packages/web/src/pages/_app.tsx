import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/common/apolloClient';
import { AuthProvider } from '@lib/auth/AuthProvider';
import { SEO } from '@shared/SEO';
import { initSentry } from '@utils/sentry';

initSentry();
export default function App({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <SEO
          title="Home"
          description="The social platform for developers"
          keywords="developers,ideas,discuss,fun,programming,graphql,typescript,nextjs,tailwindcss,react,apollo"
        />
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}
