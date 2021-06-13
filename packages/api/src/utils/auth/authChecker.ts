import { AuthChecker } from 'type-graphql';
import { ContextType } from '@root/server';
import { Role } from '@enums/Roles';

export const customAuthChecker: AuthChecker<ContextType> = async (
  { context },
  roles
) => {
  if (context.hasAuth) {
    const user = await context.getUser();

    for (const role of roles) {
      if (!user.roles.includes(role as Role)) return false;
    }

    return true;
  }

  return false;
};
