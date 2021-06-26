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

export const checkEnv = async (): Promise<boolean> => {
  for (const requiredEnvChecker of [
    // Redis Connection URL
    checkRequiredEnv('OASIS_API_REDIS_URL', true),

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
