require('dotenv').config();

module.exports = {
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
};
