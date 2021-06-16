import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import MakeBadgeInput from './MakeBadgeInput';
import Badge from '@entities/Badge';
import { Role } from '@enums/Roles';

// @bcg-resolver(mutation, makeBadge, badge)
@Resolver()
export default class MakeBadgeResolver {
  @Mutation(() => Boolean)
  @Authorized(Role.Admin)
  async makeBadge(@Arg('data') data: MakeBadgeInput) {
    const badge = Badge.create();

    Badge.merge(badge, data);

    badge.createdAt = String(Date.now());

    await badge.save();
    return true;
  }
}
