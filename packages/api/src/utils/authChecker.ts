import { AuthChecker } from 'type-graphql';
import { ContextType } from '../apolloServer';

export const customAuthChecker: AuthChecker<ContextType> = async (
  { context },
  roles
) => {
  if (context.hasAuth) {
    const user = await context.getUser();

    for (const role of roles) {
      if (!user.roles.includes(role)) return false;
    }

    return true;
  }

  return false;
};
