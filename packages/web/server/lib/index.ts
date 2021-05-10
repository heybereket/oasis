const chalk = require('chalk');

export const error = (message: string): any => {
  return chalk.red(message)
}
export const success = (message: string): any => {
  return chalk.green(message)
}
