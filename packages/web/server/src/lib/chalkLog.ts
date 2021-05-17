import chalk from 'chalk';

export const chalkLog = (type: string, message: string): any => {
  switch (type) {
    // Successful, no issues
    case 'success':
      return console.log(`${chalk.green.bold('success')} - ${message}`);

    // Uh oh, there were issues found
    case 'error':
      return console.error(`${chalk.red.bold('error')} - ${message}`);

    // Non critical messages
    case 'warn':
      return console.warn(`${chalk.yellow.bold('warn')} - ${message}`);

    // Information messages
    case 'info':
      return console.info(`${chalk.cyan.bold('info')} - ${message}`);
  }
};
