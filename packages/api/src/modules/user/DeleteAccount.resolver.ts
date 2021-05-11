import User from '@entities/User';
import { Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/apolloServer';

@Resolver()
export default class DeleteAccountResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async deleteAccount(@Ctx() { getUser }: ContextType) {
    const user = await getUser();
    await user.remove();

    return true;
  }
}
