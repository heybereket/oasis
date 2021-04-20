const { createSecureHeaders } = require("next-secure-headers");
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: false,
    runtimeCaching,
  },
  async headers() {
    return [{ source: "/(.*)", headers: createSecureHeaders() }];
  },
  async redirects() {
    return [
      {
        source: '/u/:username',
        destination: '/user/:username',
        permanent: true,
      },
      {
        source: '/r/:repo*',
        destination: '/repo/:repo*',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
})
