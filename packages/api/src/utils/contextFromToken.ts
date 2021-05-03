// import admin from './common/firebase-admin';
import { IncomingMessage } from "http";

type SocketInfo = ReturnType<IncomingMessage["socket"]["address"]>;

export type AuthedContextType = {
  uid: string;
  hasAuth: true;
  socketInfo: SocketInfo;
};

export type NotAuthedContextType = {
  hasAuth: false;
  socketInfo: SocketInfo;
};

export type ContextType = AuthedContextType | NotAuthedContextType;

export const contextFromToken = async (
  token: string,
  socketInfo: SocketInfo
): Promise<ContextType> => {
  try {
    throw new Error("auth not yet implemented");
    const data = { uid: "hello" };
    // const data = await admin.auth().verifyIdToken(token);
    return { hasAuth: true, ...data, socketInfo };
  } catch (e) {
    return { hasAuth: false, socketInfo };
  }
};
