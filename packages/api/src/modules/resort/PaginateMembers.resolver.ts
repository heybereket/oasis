import User from '@entities/User';
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver()
export class PaginateResortMembersResolver {
  @Query(() => [User], { nullable: true })
  async paginateResortMembers(
    @Arg('resortId') resortId: string,
    @Arg('limit') limit: number,
    @Arg('offset') offset: number
  ) {
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
