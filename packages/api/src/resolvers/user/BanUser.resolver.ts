import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import User from '@entities/User';
import { Role } from '@typings/Roles';
import { ApolloError } from 'apollo-server-errors';

@Resolver()
export class BanUser {
  @Mutation(() => Boolean)
  @Authorized(Role.Moderator)
  async banUser(
    @Arg('UserId') userId: string,
    @Arg('endDate') endDate: string
  ) {
    const user = await User.findOne(userId);

    if (!user) {
      throw new ApolloError('User not found');
    }

    user.banExiration = endDate;

    user.save();

    return true;
  }
}
