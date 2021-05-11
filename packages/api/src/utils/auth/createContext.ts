import { ContextType } from '@root/apolloServer';
import User from '@entities/User';

export const createContext = async (req: any): Promise<ContextType> => {
  const uid = (req.session as any)?.passport?.user?.id;

  return { hasAuth: !!uid, uid, getUser: () => User.findOne(uid) };
};
