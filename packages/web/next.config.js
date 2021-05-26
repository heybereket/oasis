const { createSecureHeaders } = require('next-secure-headers');
const withPWA = require('next-pwa');
const { join } = require('path');

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
    register: true,
    dest: '.next',
    sw: 'sw.js',
    // https://developers.google.com/web/tools/workbox/modules/workbox-strategies
    runtimeCaching: [
      {
        handler: 'NetworkFirst',
        urlPattern: /^https?.*/,
      },
      {
        handler: 'NetworkFirst',
        urlPattern: /\/_next\/.*/,
      },
    ],
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
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
