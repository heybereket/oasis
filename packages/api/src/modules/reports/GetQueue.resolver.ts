import Report from '@entities/Report';
import { Role } from '@modules/user/Roles';
import { ContextType } from '@root/apolloServer';
import { ApolloError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Query, Resolver, Root } from 'type-graphql';

@Resolver()
export class GetQueueResolver {
  @Authorized()
  @Query(() => [Report])
  async getQueue(@Ctx() { getUser }: ContextType) {
    const user = await getUser();

    // if (!user.roles.includes(Role.Moderator)) {
    //   throw new ApolloError("You don't have permission to do that!");
    // }

    return await Report.find({
      where: { resolved: false },
      relations: ['accuse', 'reporter'],
    });
  }
}
