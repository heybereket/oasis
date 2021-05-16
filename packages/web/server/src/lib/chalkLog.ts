import chalk from 'chalk';

export const chalkLog = (type: string): any => {
  switch (type) {
    // Successful, no issues
    case 'success':
      return chalk.green.bold('success');

    // Uh oh, there were issues found
    case 'error':
      return chalk.red.bold('error');

    // Non critical messages
    case 'warning':
      return chalk.yellow.bold('warning');
  }
};
