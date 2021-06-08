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
      .addSelect('COUNT(likers.*) as likes')
      .leftJoin('post.likers', 'likers')
      // .leftJoin('post.dislikers', 'dislikers')
      .groupBy('post.id')
      .orderBy('likes', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')
      .offset(offset)
      .limit(limit)
      .getMany();
  }
}
