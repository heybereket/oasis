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
      .groupBy('post.id')
      .orderBy('post.upvotes - post.downvotes', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .offset(offset)
      .limit(limit)
      .getMany();
  }
}
