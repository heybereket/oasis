import { Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import { NoBot } from '@utils/auth/NoBot';

@Resolver()
export default class DeleteAccountResolver {
  @Mutation(() => Boolean)
  @Authorized()
  @NoBot()
  async deleteAccount(@Ctx() { getUser }: ContextType) {
    const user = await getUser();
    await user.remove();

    return true;
  }
}
