import { ContextType } from '@root/apolloServer';
import User from '@entities/User';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

export const createContext = async (req: Request): Promise<ContextType> => {
  let uid: string;

  if (req.headers.authorization) {
    const [, type, token] = req.headers.authorization.split(' ');
    switch (type) {
      case 'BOT':
        uid = (verify(token, process.env.BOT_TOKEN_SECRET) as any).uid;
      case 'VSC': {
        const data = verify(
          token,
          process.env.VSCODE_ACCESS_TOKEN_SECRET
        ) as any;

        const user = await User.findOne(data.uid);

        if (user.vscTokenCount === data.count) {
          uid = data.uid;
        }
      }
    }
  } else {
    uid = (req.session as any)?.passport?.user?.id;
  }

  return { hasAuth: !!uid, uid, getUser: () => User.findOne(uid) };
};
