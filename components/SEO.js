import Head from 'next/head';

const SEO = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="shortcut icon" href="/static/logo.svg" />
    </Head>
  );
};

export default SEO;
