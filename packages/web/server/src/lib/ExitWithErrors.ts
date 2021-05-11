import { chalkLog } from './chalkLog';

export const ExitWithErrors = (amount: number): any => {
  if (amount < 2){ 
    console.error(`${chalkLog('error')} - Exiting with ${amount} error...`)
    return process.exit(1);
  } else {
    console.error(`${chalkLog('error')} - Exiting with ${amount} errors...`)
    return process.exit(1);
  }
}
