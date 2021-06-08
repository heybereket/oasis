import Report from '@entities/Report';
import { Role } from '@typings/Roles';
import { Authorized, Query, Resolver } from 'type-graphql';

@Resolver()
export class GetQueueResolver {
  @Authorized(Role.Moderator)
  @Query(() => [Report])
  async getQueue() {
    return await Report.find({
      where: { resolved: false },
    });
  }
}
