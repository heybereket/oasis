import Report from '@entities/Report';
import { Role } from '@modules/user/Roles';
import { ContextType } from '@root/apolloServer';
import { ApolloError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Query, Resolver, Root } from 'type-graphql';

@Resolver()
export class GetQueueResolver {
  // @Authorized(Role.Moderator)
  @Query(() => [Report])
  async getQueue() {
    return await Report.find({
      where: { resolved: false },
    });
  }
}
