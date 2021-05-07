module.exports = {
  apps: [
    {
      name: 'oasis-staging',
      script: 'yarn',
      args: 'start',
      interpreter: 'none',
      env: {
        NODE_ENV: 'development',
        PORT: 4001,
      },
    },
  ],

  deploy: {
    staging: {
      user: 'ci-runner',
      host: 'oasis-deploy',
      ref: 'origin/staging',
      repo: 'https://github.com/oasis-sh/oasis.git',
      path: '/opt/oasis/staging',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-deploy-local': '',
      'post-deploy':
        'yarn && yarn build && yarn workspace @oasis/api typeorm:run_migrations && env PM2_HOME=/opt/oasis/.pm2 pm2 reload ecosystem-staging.config.js --env staging',
      'pre-setup': '',
    },
  },
};
