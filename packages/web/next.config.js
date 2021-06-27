const bundleAnalyzer = require('@next/bundle-analyzer');
const withTM = require('next-transpile-modules')(['@oasis-sh/parser']);
const { join } = require('path');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withTM({
    eslint: {
      ignoreDuringBuilds: true,
    },
    poweredByHeader: false,
    reactStrictMode: true,
    headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
            {
              key: 'Referrer-Policy',
              value: 'same-origin',
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains; preload',
            },
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
            // Opt-out of Google FLoC: https://amifloced.org/
            {
              key: 'Permissions-Policy',
              value:
                'camera=(), microphone=(), geolocation=(), interest-cohort=()',
            },
          ],
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: '/u/:username',
          destination: '/user/:username',
        },
        {
          source: '/r/:resort',
          destination: '/resort/:resort',
        },
      ];
    },
    async redirects() {
      return [
        {
          source: '/oss/github',
          destination: 'https://github.com/oasis-sh/oasis',
          permanent: false,
        },
      ];
    },
    webpack: (config) => {
      return config;
    },
    env: {
      PROJECT_ROOT: join(__dirname, '../..'),
      IS_NEXT: true,
      OASIS_API_SRC_PATH: join(__dirname, '../api/src'),
    },
  })
);
