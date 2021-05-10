const chalk = require('chalk');

export const chalkLog = (type: string, message: string): any => {
 switch (type) {
  // Successful, no issues
  case 'success':
    return chalk.green(message)

  // Uh oh, there were issues found
  case 'error':
    return chalk.red(message)

  // Non critical, just letting you know
  case 'warning':
    return chalk.yellow(message)
 }
}
