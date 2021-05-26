const { createSecureHeaders } = require('next-secure-headers');
const withPWA = require('next-pwa');
const { join } = require('path');

const prod = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  future: {
    webpack5: true,
  },
  pwa: {
    disable: prod ? false : true
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
