import chalk from 'chalk';

const colors = {
  error: chalk.red('error') + ' -',
  ready: chalk.green('ready') + ' -',
};

export const log = (type: string, message: string) => {
  switch (type) {
    // Ready, no issues
    case 'ready':
      return console.log(colors.ready, message);

    // Uh oh, there were issues found
    case 'error':
      return console.error(colors.error, message);
  }
};
