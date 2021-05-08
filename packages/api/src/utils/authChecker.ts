import { AuthChecker } from 'type-graphql';
import { ContextType } from '../apolloServer';

export const customAuthChecker: AuthChecker<ContextType> = async (
  { context },
  roles
) => {
  console.log(context.hasAuth);
  if (context.hasAuth) {
    const user = await context.getUser();

    let authorized = true;

    roles.forEach((role) => {
      if (!user.roles.includes(role)) {
        authorized = false;
      }
    });

    return authorized;
  } else {
    return false;
  }
};
