module.exports = {
    future: {
      webpack5: true,
    },
    async redirects() {
      return [
        {
          source: '/user/:username',
          destination: '/u/:username',
          permanent: true,
        },
        {
          source: '/repo/:repo*',
          destination: '/r/:repo*',
          permanent: true,
        },
      ];
    }
  };