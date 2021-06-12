import { Query, Resolver, Ctx, Authorized } from 'type-graphql';
import { ContextType } from '@root/server';
import Notification from '@entities/Notification';
import { NoBot } from '@utils/auth/NoBot';

@Resolver()
export default class GetNotifications {
  @Authorized()
  @NoBot() /* Added as this is a resolver meant for UI purposes */
  @Query(() => [Notification], { nullable: true })
  async getNotifications(@Ctx() { getUser }: ContextType) {
    const user = await getUser();

    return await Notification.find({ where: { user } });
  }
}
