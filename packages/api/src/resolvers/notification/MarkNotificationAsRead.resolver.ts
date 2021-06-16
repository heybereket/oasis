import { Resolver, Ctx, Authorized, Mutation, Arg } from 'type-graphql';
import { ContextType } from '@root/server';
import Notification from '@entities/Notification';
import { ApolloError } from 'apollo-server-express';
import { NoBot } from '@utils/auth/NoBot';

@Resolver()
export default class MarkNotificationAsRead {
  @Authorized()
  @NoBot()
  @Mutation(() => Boolean)
  async markNotificationAsRead(
    @Ctx() { getUser }: ContextType,
    @Arg('notificationId') notificationId: string
  ) {
    const notification = await Notification.findOne(notificationId);

    if (!notification) throw new ApolloError('Notification not found');
    const notificationUser = await notification.user;
    const user = await getUser();
    if (notificationUser.id !== user.id) {
      throw new ApolloError(
        'You do not have permission to mark this notifiaction as read'
      );
    }
    notification.read = true;
    notification.save();
    return true;
  }
}
