module.exports = {
    future: {
      webpack5: true,
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
    }
  };