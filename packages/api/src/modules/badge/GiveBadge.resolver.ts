import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import Badge from '@entities/Badge';
import { Role } from '@modules/user/Roles';
import User from '@entities/User';
import { BCMutation } from '@root/bot-client-gen';

@Resolver()
export default class GiveBadgeResolver {
  @Mutation(() => Boolean)
  @Authorized(Role.Admin)
  @BCMutation('badges', 'boolean', {
    args: { username: 'string', badgeName: 'string' },
  })
  async giveBadge(
    @Arg('username') username: String,
    @Arg('badgeName') badgeName: String
  ) {
    const user = await User.createQueryBuilder()
      .where('username = :username', { username })
      .getOne();

    user.badges = Promise.resolve([
      ...(await user.badges),
      await Badge.createQueryBuilder()
        .where('name = :name', {
          name: badgeName,
        })
        .getOne(),
    ]);

    await user.save();
    return true;
  }
}
