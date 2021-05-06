import Head from 'next/head';
import React from 'react';

interface SEOProps {
  title: string;
  metaTitle?: string;
  metaDesc?: string;
  metaImg?: string;
}

export const SEOProvider: React.FC<SEOProps> = ({
  title,
  metaTitle,
  metaDesc,
  metaImg,
}) => {
  return (
    <Head>
      <title>{title}</title>
      {metaTitle ? (
        <meta name="og:title" content={metaTitle} />
      ) : (
        <meta name="og:title" content={title} />
      )}
      {metaDesc && <meta name="og:description" content={metaDesc} />}
      {metaImg && <meta name="og:image" content={metaImg} />}
    </Head>
  );
};
