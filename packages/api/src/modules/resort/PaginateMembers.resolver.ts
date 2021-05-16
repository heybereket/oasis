import Resort from '@entities/Resort';
import User from '@entities/User';
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';

@Resolver((of) => Resort)
export class PaginateResortMembersResolver {
  @FieldResolver(() => [User])
  async members(
    @Root() resort: Resort,
    @Arg('limit') limit: number,
    @Arg('offset') offset: number
  ) {
    const resortId = resort.id;
    return await User.createQueryBuilder('user')
      .innerJoin('user.joinedResorts', 'resort', 'resort.id = :resortId', {
        resortId,
      })
      .orderBy('user.id')
      .skip(offset)
      .take(limit)
      .getMany();
  }
}
