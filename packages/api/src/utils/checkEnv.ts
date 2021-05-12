import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

type EnvValidationFn = (logError: boolean) => Promise<boolean>;

export default async function checkEnv(): Promise<boolean> {
  for (let requiredEnvChecker of [
    /* Redis and dependencies */
    checkRequiredEnv('OASIS_API_REDIS_URL'),

    /* OAuth Credentials */
    ...checkRequiredOatuhEnvs('GITHUB'), // GitHub
    // ...checkRequiredOatuhEnvs('TWITTER'), // Twitter

    /* Extra props */
    checkRequiredEnv('OASIS_API_SESSION_SECRET'),

  ]) if (!(await requiredEnvChecker(true))) return false;
  return true;
}

function checkRequiredEnv(envProp: string, additionalValidation?: () => Promise<string | void>): EnvValidationFn {

  return async (logError: boolean) => {
    const isValid: boolean = process.env[envProp] !== undefined && process.env[envProp] !== null && process.env[envProp].trim().length > 0;

    // If the property is not set, we can immediately error out.
    if (!isValid) {
      if (logError) console.error(`> You must have ${envProp} set in your packages/api/.env file.`);
      return false;
    }

    // If the additionalValidation property is set, we'll call that to validate the env property.
    if (additionalValidation) {
      let additionalValidationError = await additionalValidation();
      // The additionalValidation function returns a string (i.e. an error message) if there's an issue,
      // or a 'nullish' (i.e. undefined) value if not.
      // Hence if there is error, we will print it and return false to indicate the env check failed.
      if (additionalValidationError) {
        if (logError) console.error(`>> ${additionalValidationError}`);
        return false;
      }
    }

    // Assuming all the other criteria has passed (i.e. we haven't returned false early), we know it's
    // all good!
    return true;
  };

}

function checkRequiredOatuhEnvs(serviceName: string) {

  return [
    checkRequiredEnv(`OASIS_API_${serviceName}_CLIENT_ID`),
    checkRequiredEnv(`OASIS_API_${serviceName}_CLIENT_SECRET`),
    checkRequiredEnv(`OASIS_API_${serviceName}_CALLBACK_URL`),
  ];

}
