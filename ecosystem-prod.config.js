module.exports = {
  apps: [
    {
      name: 'oasis-prod',
      script: 'yarn',
      args: 'start',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
      },
    },
  ],

  deploy: {
    production: {
      user: 'ci-runner',
      host: 'oasis-deploy',
      ref: 'origin/prod',
      repo: 'https://github.com/oasis-sh/oasis.git',
      path: '/opt/oasis/production',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-deploy-local': '',
      'post-deploy':
        'yarn && yarn build && yarn workspace @oasis/api typeorm:run_migrations && env PM2_HOME=/opt/oasis/.pm2 pm2 reload ecosystem-prod.config.js --env production',
      'pre-setup': '',
    },
  },
};
