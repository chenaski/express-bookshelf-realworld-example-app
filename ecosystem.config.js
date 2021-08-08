module.exports = {
  apps: [
    {
      name: process.env.DB_NAME,
      script: 'lib/server.js',
      watch: '.',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: process.env.SSH_USER,
      host: process.env.SSH_HOST,
      ref: 'origin/main',
      repo: process.env.REPOSITORY_URL,
      path: process.env.DEPLOY_DEST_DIR,
      ssh_options: ['StrictHostKeyChecking=no'],
      'post-deploy': `cp ../.env . && npm i && env DB_NAME=${process.env.DB_NAME} pm2 startOrRestart ecosystem.config.js --env production --update-env`,
    },
  },
};
