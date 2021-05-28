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
        source: '/',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
          {
            key: 'Feature-Policy',
            value: "geolocation 'self'; microphone 'self'; camera 'self'",
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
