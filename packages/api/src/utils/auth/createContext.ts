import { ContextType } from '@root/apolloServer';
import User from '@entities/User';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

export const createContext = async (req: Request): Promise<ContextType> => {
  let uid: string;

  if (req.headers.authorization) {
    const [, token] = req.headers.authorization.split(' ');

    uid = (verify(token, process.env.BOT_TOKEN_SECRET) as any).uid;
  } else {
    uid = (req.session as any)?.passport?.user?.id;
  }

  return { hasAuth: !!uid, uid, getUser: () => User.findOne(uid) };
};
