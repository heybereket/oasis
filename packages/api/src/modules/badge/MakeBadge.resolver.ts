import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import MakeBadgeInput from './MakeBadgeInput';
import Badge from '../../entities/Badge';

@Resolver()
export default class MakeBadgeResolver {
  @Mutation(() => Boolean)
  @Authorized('ADMIN')
  async makeBadge(@Arg('data') data: MakeBadgeInput) {
    const badge = Badge.create();

    Badge.merge(badge, data);

    badge.createdAt = String(Date.now());

    await badge.save();
    return true;
  }
}
