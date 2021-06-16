import Report from '@entity/Report';
import { Role } from '@enum/Roles';
import { Authorized, Query, Resolver } from 'type-graphql';

@Resolver()
export class GetQueueResolver {
  @Authorized(Role.Admin)
  @Query(() => [Report])
  async getQueue() {
    return await Report.find({
      where: { resolved: false },
    });
  }
}
