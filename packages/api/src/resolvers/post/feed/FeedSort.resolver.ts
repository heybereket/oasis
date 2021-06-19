import { Arg, Query, Resolver } from 'type-graphql';
import Post from '@entities/Post';

@Resolver()
export class DeletePostResolver {
  @Query(() => [Post])
  async feedSortPosts(
    @Arg('limit') limit: number,
    @Arg('offset') offset: number
  ) {
    return await Post.createQueryBuilder('post')
      .addSelect('COUNT(upvoters.id) as upvotes')
      .leftJoin('post.upvoters', 'upvoters')
      // .leftJoin('post.downvoters', 'downvoters')
      .groupBy('post.id')
      .orderBy('upvotes', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .offset(offset)
      .limit(limit)
      .getMany();
  }
}
