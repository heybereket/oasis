import Head from 'next/head';

interface SEOProps {
  title: string;
}

export const SEO: React.FC<SEOProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};
