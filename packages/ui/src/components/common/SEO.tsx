import React from 'react';

interface SEOProps {
  title: string;
  description?: string;
  metaTitle?: string;
  metaDesc?: string;
  metaImg?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  metaDesc,
  metaImg,
  metaTitle,
}) => {
  return (
      <>
        <title>{title} - Oasis</title>
        <meta name="description" content={description} />
        {metaTitle ? (
          <meta name="og:title" content={metaTitle} />
        ) : (
          <meta name="og:title" content={title} />
        )}
        <meta name="og:description" content={metaDesc} />
        <meta name="og:image" content={metaImg} />
        <meta name="theme-color" content="#306EEA" />
      </>
  );
};
