import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';

const prompt = async (args) =>
  await inquirer.prompt([{ type: 'input', ...args, name: 'cmd' }]).then((a) => {
    return args.parse ? args.parse(a.cmd) : a.cmd;
  });

const writeEnv = async (obj, pkg) => {
  console.log(chalk.green('*') + chalk.magenta.bold(' Writing configuration...'));
  let env = '';
  Object.keys(obj).forEach((k) => (env += `\n${k}='${obj[k]}'`));

  fs.writeFile(`./packages/${pkg}/.env`, env, () => {});
};

const runSetup = async () => {
  if (fs.existsSync('./packages/web/.env'))
    await prompt({
      type: 'confirm',
      message: 'You have already setup before, would you like to re-setup?',
      parse: (bool) => !bool && process.exit(),
    });

  const apiMode = await prompt({
    type: 'list',
    message: 'What development mode do you want to use?',
    choices: ['Local (Run API Locally)', 'Remote (Connect to Staging API)'],
    parse: (str) => str.replace(/ .*/, '').toLowerCase(),
  });
  if (apiMode === 'remote') writeEnv({ STAGING_API: true }, 'web');
  else {
    const env = {
      TRUST_PROXY: await prompt({
        type: 'confirm',
        message: 'Are you reverse-proxying the API server?',
        default: false,
      }),
    };

    await prompt({
      type: 'checkbox',
      message: 'Please select the authentication providers you want to enable.',
      choices: [
        { name: 'Github' },
        { name: 'Twitter' },
        { name: 'Discord' },
        { name: 'Google' },
      ],
      validate(answer) {
        return answer.length < 1
          ? 'You must choose at least one provider.'
          : true;
      },
    }).then(async (data) => {
      for (const e of data) {
        env[`${e.toUpperCase()}_CLIENT_ID`] = await prompt({
          message: `Please enter your ${e} Client ID:`,
        });

        env[`${e.toUpperCase()}_CLIENT_SECRET`] = await prompt({
          message: `Please enter your ${e} Client Secret:`,
        });

        env[
          `${e.toUpperCase()}_CALLBACK_URL`
        ] = `http://localhost:3000/api/auth/${e.toLowerCase()}/callback`;
      }
    });

    const isUsingSpotify = await prompt({
      type: 'confirm',
      message: 'Do you want to enable Spotify intergration?',
    });

    if (isUsingSpotify) {
      env.SPOTIFY_CLIENT_ID = await prompt({
        message: `Please enter your Spotify Client ID:`,
      });

      env.SPOTIFY_CLIENT_SECRET = await prompt({
        message: `Please enter your Spotify Client Secret:`,
      });

      env.SPOTIFY_CALLBACK_URL = `http://localhost:3000/api/[not-implemented]`;
    }

    const isUsingAWS = await prompt({
      type: 'confirm',
      message: 'Are you using AWS to store images?',
    });
    if (isUsingAWS) {
      env.STORE_IMAGES_LOCALLY = false;
      env.STORE_IMAGES_ON_S3 = true;
      env.AWS_ACCESS_KEY_ID = await prompt({
        message: `Please enter your AWS Access Key ID:`,
      });
      env.AWS_SECRET_ACCESS_KEY = await prompt({
        message: `Please enter your AWS Secret Access Key:`,
      });
      env.AWS_ENDPOINT = await prompt({
        message: `Please enter your AWS Endpoint:`,
      });
      env.AWS_S3_BUCKET = await prompt({
        message: `Please enter your AWS S3 Bucket:`,
      });
    } else {
      env.STORE_IMAGES_LOCALLY = true;
      env.STORE_IMAGES_ON_S3 = false;
    }

    await writeEnv(env, 'api');
    await writeEnv({ STAGING_API: false }, 'web');
  }
  console.log(chalk.yellow.bold('Finished setting up configuration!'));
  console.log(chalk.green('\nTo get started, build packages using:'));
  console.log('\nyarn build:dev');
  console.log(chalk.green('\nAnd then start the development server with:'));
  console.log('\nyarn dev');
};

runSetup();
