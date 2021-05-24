import User from '@entities/User';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import { ApolloError } from 'apollo-server-errors';
import { BCQuery } from '@root/bot-client-gen';

@Resolver()
export default class FollowUserResolver {
  @Mutation(() => Boolean)
  @Authorized()
  @BCQuery('users', 'boolean')
  async followUser(
    @Arg('userId') userId: string,
    @Ctx() { getUser }: ContextType
  ) {
    const user = await getUser();
    const userToFollow = await User.findOne(userId);

    if (!userToFollow) throw new ApolloError('Could not find user to follow');

    user.following = Promise.resolve([...(await user.following), userToFollow]);

    user.save();
    return true;
  }
}
