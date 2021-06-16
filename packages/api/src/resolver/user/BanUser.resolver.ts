import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import User from '@entity/User';
import { Role } from '@root/enum/Roles';
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
