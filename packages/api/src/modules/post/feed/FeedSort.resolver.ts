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
      `SELECT post.id, COUNT(user_liked_posts_post."userId") AS likesCount
    FROM post

    LEFT JOIN user_liked_posts_post
    ON post.id = user_liked_posts_post."postId"

    LEFT JOIN "user"
    ON post."authorId" = "user"."id"

    GROUP BY post.id, "user"."id"
    ORDER BY likesCount DESC, post."createdAt" DESC
    LIMIT $1 OFFSET $2;`,
      [limit, offset]
    );

    return ((await dataIds) as any[]).map((idObj) => Post.findOne(idObj.id));
  }
}
