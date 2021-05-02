// import admin from './common/firebase-admin';
import { NextApiRequest } from 'next';

type SocketInfo = ReturnType<NextApiRequest['socket']['address']>;

export const contextFromToken = async (
  token: string,
  socketInfo: SocketInfo
) => {
  try {
    throw new Error("auth not yet implemented");
    const data = {};
    // const data = await admin.auth().verifyIdToken(token);
    return { hasAuth: true, ...data, socketInfo };
  } catch (e) {
    return { hasAuth: false, socketInfo };
  }
};

// note PromiseLike instead of Promise, this lets it work on any thenable
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type ContextType = ThenArg<ReturnType<typeof contextFromToken>>;
