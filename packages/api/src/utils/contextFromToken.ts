import admin from './firebase-admin';
import { NextApiRequest } from 'next';

type SocketInfo = ReturnType<NextApiRequest['socket']['address']>;

export const contextFromToken = async (
  token: string,
  socketInfo: SocketInfo
) => {
  try {
    const data = await admin.auth().verifyIdToken(token);
    return { hasAuth: true, ...data, socketInfo };
  } catch (e) {
    return { hasAuth: false, socketInfo };
  }
};
