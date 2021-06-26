import { createContext } from '@utils/auth/createContext';
import Connection from '@entities/Connection';
import { Request } from 'express';
import * as log from '@oasis-sh/shared';

const createConnection = async (
  accessToken: string,
  refreshToken: string,
  request: Request,
  method: string
) => {
  try {
    const userPromise = Promise.resolve(
      (await createContext(request)).getUser()
    );
    const connection = await Connection.create({
      accessToken,
      refreshToken,
      connectionMethod: method,
      user: userPromise,
    }).save();
    const user = await userPromise;
    user.connections = Promise.resolve([connection]);
    console.log(`Success! User connection to ${method} is done`);
  } catch (err) {
    log.error(err);
  }
};
export default createConnection;
