import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import Badge from '@entity/Badge';
import { Role } from '@enum/Roles';
import User from '@entity/User';

@Resolver()
export default class GiveBadgeResolver {
  @Mutation(() => Boolean)
  @Authorized(Role.Admin)
  async giveBadge(
    @Arg('username') username: string,
    @Arg('badgeName') badgeName: string
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
