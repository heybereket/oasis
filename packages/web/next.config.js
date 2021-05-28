const bundleAnalyzer = require('@next/bundle-analyzer');
const { join } = require('path');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  future: {
    webpack5: true,
  },
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
  async redirects() {
    return [
      {
        source: '/u/:username',
        destination: '/user/:username',
        permanent: true,
      },
      {
        source: '/r/:resort',
        destination: '/resort/:resort',
        permanent: true,
      },
      {
        source: '/oss/github',
        destination: 'https://github.com/oasis-sh/oasis',
        permanent: false,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    // if (!isServer) {
    //   config.node = {
    //     fs: 'empty',
    //   };
    // }

    return config;
  },
  env: {
    PROJECT_ROOT: join(__dirname, '../..'),
    IS_NEXT: true,
    OASIS_API_SRC_PATH: join(__dirname, '../api/src'),
    API_MODE: process.env.API_MODE === 'remote' ? 'remote' : 'local',
  },
});
