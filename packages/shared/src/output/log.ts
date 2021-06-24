import chalk from 'chalk';

export const colors = {
  error: chalk.red('error') + ' -',
  ready: chalk.green('ready') + ' -',
  warn: chalk.yellow('warn') + ' -',
  event: chalk.magenta('event') + ' -',
  info: chalk.magenta('info') + ' -',
};

// Ready, no issues
export const ready = (...message: string[]) => {
  console.log(colors.ready, ...message);
};

// Uh oh, there were issues found
export const error = (...message: string[]) => {
  console.error(colors.error, ...message);
};

export const warn = (...message: string[]) => {
  console.warn(colors.warn, ...message);
};

export const event = (...message: string[]) => {
  console.log(colors.event, ...message);
};

// Information
export const info = (...message: string[]) => {
  console.log(colors.info, ...message);
};
