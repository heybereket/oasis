import { Arg, Resolver, Authorized, Ctx, Mutation } from 'type-graphql';
import Resort from '@entities/Resort';
import { ApolloError } from 'apollo-server-errors';
import { ContextType } from '@root/server';

// @bcg-resolver(mutation, joinResort, resort)

@Resolver()
export class JoinResortResolver {
  @Mutation(() => Boolean, { nullable: true })
  @Authorized()
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
