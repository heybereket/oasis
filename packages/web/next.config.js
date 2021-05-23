const { createSecureHeaders } = require('next-secure-headers');
const { join } = require('path');

module.exports = {
  future: {
    webpack5: true,
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
};
