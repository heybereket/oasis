const chalk = require('chalk');

export const chalkLog = (type: string, message: string): any => {
 switch (type) {
  // Successful, no issues
  case 'success':
    return chalk.green.bold(message)

  // Uh oh, there were issues found
  case 'error':
    return chalk.red.bold(message)

  // Non critical messages
  case 'warning':
    return chalk.yellow.bold(message)
 }
}
