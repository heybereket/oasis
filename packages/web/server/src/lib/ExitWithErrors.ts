const chalk = require('chalk');
import { chalkLog } from './chalkLog';

export const ExitWithErrors = (amount: number): any => {
  if (amount < 2){ 
    return console.error(`${chalkLog('error',`error`)} - Exiting with ${amount} error...`)
  } else {
    return console.error(`${chalkLog('error',`error`)} - Exiting with ${amount} errors...`)
  }
}
