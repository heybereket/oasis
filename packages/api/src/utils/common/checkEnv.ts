import * as log from '@lib/log';
import { exit } from '@lib/exit';

type EnvValidationFn = (logError: boolean) => Promise<boolean>;

const checkRequiredEnv = (
  envProp: string,
  required: boolean,
  additionalValidation?: () => Promise<string | void>
): EnvValidationFn => {
  return async (logError: boolean) => {
    const isValid: boolean =
      process.env[envProp] !== undefined &&
      process.env[envProp] !== null &&
      process.env[envProp].trim().length > 0;

    // If the property is not set, we can immediately error out.
    if (!isValid && required) {
      if (logError) {
        log.error(`${envProp} is undefined in packages/api/.env`);
      }
      return false;
    } else if (!isValid && !required) {
      if (logError) {
        log.warn(`${envProp} is undefined in packages/api/.env`);
      }
    }

    // If the additionalValidation property is set, we'll call that to validate the env property.
    if (additionalValidation) {
      const additionalValidationError = await additionalValidation();
      // The additionalValidation function returns a string (i.e. an error message) if there's an issue,
      // or a 'nullish' (i.e. undefined) value if not.
      // Hence if there is error, we will print it and return false to indicate the env check failed.
      if (additionalValidationError) {
        if (logError) log.error(`${additionalValidationError}`);

        return false;
      }
    }

    // Assuming all the other criteria has passed (i.e. we haven't returned false early), we know it's
    // all good!
    return true;
  };
};

const checkOAuthEnvs = (serviceName: string) => {
  return [
    checkRequiredEnv(`OASIS_API_${serviceName}_CLIENT_ID`, false),
    checkRequiredEnv(`OASIS_API_${serviceName}_CLIENT_SECRET`, false),
    checkRequiredEnv(`OASIS_API_${serviceName}_CALLBACK_URL`, false),
  ];
};

const checkTwitterOAuthEnvs = (serviceName: string) => {
  return [
    checkRequiredEnv(`OASIS_API_${serviceName}_KEY`, false),
    checkRequiredEnv(`OASIS_API_${serviceName}_SECRET_KEY`, false),
    checkRequiredEnv(`OASIS_API_${serviceName}_CALLBACK_URL`, false),
  ];
};

export default async function checkEnv(): Promise<boolean> {
  for (const requiredEnvChecker of [
    /* Redis and dependencies */
    checkRequiredEnv('OASIS_API_REDIS_URL', true),

    /* OAuth Credentials */
    ...checkOAuthEnvs('GITHUB'), // GitHub
    ...checkTwitterOAuthEnvs('TWITTER'), // Twitter
    ...checkOAuthEnvs('DISCORD'), // Discord
    ...checkOAuthEnvs('GOOGLE'), // Google
    ...checkOAuthEnvs('SPOTIFY'), // Google

  ]) if (!(await requiredEnvChecker(true))) return exit(1);
  return true;
}
