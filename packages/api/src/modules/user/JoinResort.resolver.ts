import { Arg, Resolver, Authorized, Ctx, Mutation } from 'type-graphql';
import Resort from '@entities/Resort';
import { ApolloError } from 'apollo-server-errors';
import { ContextType } from '@root/apolloServer';
import { BCQuery } from '@root/bot-client-gen';

@Resolver()
export class JoinResortResolver {
  @Mutation(() => Boolean, { nullable: true })
  @Authorized()
  @BCQuery('users', 'boolean')
  async joinResort(
    @Arg('resortId') resortId: string,
    @Ctx() { getUser }: ContextType
  ) {
    const resort = await Resort.findOne(resortId);
    if (!resort) throw new ApolloError('Resort not found', 'RESORT_NOT_FOUND');
    const user = await getUser();

    user.joinedResorts = Promise.resolve([
      ...(await user.joinedResorts),
      resort,
    ]);

    user.save();

    return true;
  }
}
