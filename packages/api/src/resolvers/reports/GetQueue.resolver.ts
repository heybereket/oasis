import Report from '@entities/Report';
import { Role } from '@enums/Roles';
import { Authorized, Query, Resolver } from 'type-graphql';

@Resolver()
export default class GetQueueResolver {
  @Authorized(Role.Admin)
  @Query(() => [Report])
  async getQueue() {
    return await Report.find({
      where: { resolved: false },
    });
  }
}
