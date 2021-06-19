import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import User from '@entities/User';
import { Role } from '@enums/Roles';

@Resolver()
export class MakeAdminResolver {
  @Mutation(() => Boolean)
  @Authorized(Role.SuperAdmin)
  async makeAdmin(
    @Arg('roles', () => [Role]) roles: Role[],
    @Arg('user') username: string
  ) {
    const user = await User.createQueryBuilder('user')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .getOne();

    user.roles = roles;

    user.save();

    return true;
  }
}
