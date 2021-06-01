import { Arg, Query, Resolver } from 'type-graphql';
import Post from '@entities/Post';

@Resolver()
export class DeletePostResolver {
  @Query(() => [Post])
  async feedSortPosts(
    @Arg('limit') limit: number,
    @Arg('offset') offset: number
  ) {
    const dataIds = Post.query(
      `SELECT post.id,
    COUNT(user_liked_posts_post."userId") - COUNT(user_disliked_posts_post."userId") AS likesTotal

    FROM post

    LEFT JOIN user_liked_posts_post
    ON post.id = user_liked_posts_post."postId"

    LEFT JOIN user_disliked_posts_post
    ON post.id = user_disliked_posts_post."postId"

    GROUP BY post.id
    ORDER BY likesTotal DESC, post."createdAt" DESC
    LIMIT $1 OFFSET $2;`,
      [limit, offset]
    );

    return ((await dataIds) as any[]).map((idObj) => Post.findOne(idObj.id));
  }
}
