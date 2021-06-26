import User from '@entities/User';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import { ApolloError } from 'apollo-server-errors';
import { NotificationType } from '@enums/Notifications';
import { createNotification } from '@utils/index';

@Resolver()
export default class FollowUserResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async followUser(
    @Arg('userId') userId: string,
    @Ctx() { getUser }: ContextType
  ) {
    const user = await getUser();
    const userToFollow = await User.findOne(userId);

    if (!userToFollow) throw new ApolloError('Could not find user to follow');

    if (user.id === userToFollow.id)
      throw new ApolloError(
        'You may not follow yourself, you dirty, dirty cheater'
      );

    user.following = Promise.resolve([...(await user.following), userToFollow]);

    user.save();

    createNotification({
      userId: userToFollow.id,
      performerId: user.id,
      type: NotificationType.Follow,
    });

    return true;
  }
}
