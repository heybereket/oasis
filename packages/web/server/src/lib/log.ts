import chalk from 'chalk';

export const colors = {
  error: chalk.red('error') + ' -',
  ready: chalk.green('ready') + ' -',
};

// Ready, no issues
export const ready = (...message: string[]) => {
  console.log(colors.ready, ...message);
};

// Uh oh, there were issues found
export const error = (...message: string[]) => {
  console.error(colors.error, ...message);
};
