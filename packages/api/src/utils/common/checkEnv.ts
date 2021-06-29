import * as log from '@oasis-sh/shared';
import { exit } from '@oasis-sh/shared';

type EnvValidationFn = (logError: boolean) => Promise<boolean>;

const checkRequiredEnv = (
  envProp: string,
  required: boolean
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

    return true;
  };
};

const checkOAuthEnvs = (serviceName: string) => {
  return [
    checkRequiredEnv(`${serviceName}_CLIENT_ID`, false),
    checkRequiredEnv(`${serviceName}_CLIENT_SECRET`, false),
    checkRequiredEnv(`${serviceName}_CALLBACK_URL`, false),
  ];
};

const checkTwitterOAuthEnvs = (serviceName: string) => {
  return [
    checkRequiredEnv(`${serviceName}_KEY`, false),
    checkRequiredEnv(`${serviceName}_SECRET_KEY`, false),
    checkRequiredEnv(`${serviceName}_CALLBACK_URL`, false),
  ];
};

export const checkEnv = async (): Promise<boolean> => {
  for (const requiredEnvChecker of [
    // OAuth Credentials
    ...checkOAuthEnvs('GITHUB'),
    ...checkTwitterOAuthEnvs('TWITTER'),
    ...checkOAuthEnvs('DISCORD'),
    ...checkOAuthEnvs('GOOGLE'),
    ...checkOAuthEnvs('SPOTIFY'),
  ])
    if (!(await requiredEnvChecker(true))) return exit(1);
  return true;
};
