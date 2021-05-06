module.exports = {
  apps: [{
    name: 'oasis',
    script: 'yarn',
    args: 'start',
    interpreter: 'none',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    staging: {
      user: 'ci-runner',
      host: 'oasis',
      ref: 'origin/staging',
      repo: 'git@github.com:oasis-sh/oasis.git',
      path: '/opt/oasis/staging',
      'pre-deploy-local': '',
      'post-deploy' : 'yarn && yarn build && env PM2_HOME=/opt/oasis/.pm2 pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    },

    production: {
      user: 'ci-runner',
      host: 'oasis',
      ref: 'origin/prod',
      repo: 'git@github.com:oasis-sh/oasis.git',
      path: '/opt/oasis/production',
      'pre-deploy-local': '',
      'post-deploy' : 'yarn && yarn build && env PM2_HOME=/opt/oasis/.pm2 pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
