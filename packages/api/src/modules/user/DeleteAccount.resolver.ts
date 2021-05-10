import User from '../../entities/User';
import { Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '../../apolloServer';
import { createConnection } from 'typeorm';

@Resolver()
export default class DeleteAccountResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async deleteAccount(@Ctx() { getUser }: ContextType) {
    const user = await getUser();
    await User.createQueryBuilder()
      .delete()
      .where('id = :id', { id: user.id })
      .execute(); // We need to add error handling in here using catch()

    return true;
  }
}
