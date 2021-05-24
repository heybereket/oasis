import { Query, Resolver, Ctx, Authorized } from 'type-graphql';
import { ContextType } from '@root/apolloServer';
import Notification from '@entities/Notification';
import { NoBot } from '@utils/auth/NoBot';
import { BCQuery } from '@root/bot-client-gen';

@Resolver()
export default class GetNotifications {
  @Authorized()
  @NoBot() /* Added as this is a resolver meant for UI purposes */
  @Query(() => [Notification], { nullable: true })
  @BCQuery('notification', 'Notification[]')
  async getNotifications(@Ctx() { getUser }: ContextType) {
    const user = await getUser();

    return await Notification.find({ where: { user: user } });
  }
}
