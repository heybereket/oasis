import { ContextType } from '@root/server';
import User from '@entities/User';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

export const createContext = async (req: Request): Promise<ContextType> => {
  let uid: string;
  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ');
    switch (type) {
      case 'BOT':
        try {
          uid = (verify(token, process.env.BOT_TOKEN_SECRET) as any).uid;
        } catch (e) {
          uid = undefined;
        }
        break;
      case 'VSC': {
        try {
          const data = verify(
            token,
            process.env.VSCODE_ACCESS_TOKEN_SECRET
          ) as any;

          const user = await User.findOne(data.uid);

          if (user.vscTokenCount === data.count) {
            uid = data.uid;
          }
        } catch (e) {
          uid = undefined;
        }
        break;
      }
      case 'TESTING': {
        if (process.env.TESTING !== 'true') break;
        uid = (await User.find({ where: { username: token } }))[0].id;
      }
    }
  } else {
    uid = (req.session as any)?.passport?.user?.id;
  }

  return { hasAuth: !!uid, uid, getUser: () => User.findOne(uid), req };
};
