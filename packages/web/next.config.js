const bundleAnalyzer = require('@next/bundle-analyzer');
const withTM = require('next-transpile-modules')(['@oasis-sh/parser']);
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const esBuildMinify = (config, options) => {
	const terserIndex = config.optimization.minimizer.findIndex(minimizer => (minimizer.constructor.name === 'TerserPlugin'));
	if (terserIndex > -1) {
		config.optimization.minimizer.splice(
			terserIndex,
			1,
			new ESBuildMinifyPlugin(options),
		);
	}
};

const esBuildLoader = (config, options) => {
	const tsLoader = config.module.rules.find(rule => rule.test && rule.test.test('.ts'));

	if (tsLoader) {
		tsLoader.use.loader = 'esbuild-loader';
		tsLoader.use.options = options;
	}
};

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
    webpack: (config, { webpack }) => {
      config.plugins.push(
        new webpack.ProvidePlugin({
          React: 'react',
        }),
      );

      esBuildMinify(config);

      esBuildLoader(config, {
        // Specify `tsx` if you're using TypeSCript
        loader: 'tsx',
        target: 'es2017',
      });

      return config;
    },
  })
);
