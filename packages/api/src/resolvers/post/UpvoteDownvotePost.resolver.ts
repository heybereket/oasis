import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Post from '@entities/Post';
import { upvoteDownvote } from '@utils/votes/upvoteDownvoteEntity';
import type User from '@entities/User';

// @bcg-resolver(mutation, upvotePost, post)
// @bcg-resolver(mutation, downvotePost, post)

const action = async (upvote: boolean, postId: string, user: User) =>
  upvoteDownvote<Post>(
    await Post.findOne(postId),
    user,
    upvote,
    !upvote,
    (user) => user.upvotedPosts,
    (user) => user.downvotedPosts,
    (user, entities) => (user.upvotedPosts = Promise.resolve(entities)),
    (user, entities) => (user.downvotedPosts = Promise.resolve(entities))
  );

@Resolver(() => Post)
export default class UpvoteDownvotePostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async upvotePost(
    @Arg('postId') postId: string,
    @Ctx() { getUser }: ContextType
  ) {
    return action(true, postId, await getUser());
  }

  @Mutation(() => Boolean)
  @Authorized()
  async downvotePost(
    @Arg('postId') postId: string,
    @Ctx() { getUser }: ContextType
  ) {
    return action(false, postId, await getUser());
  }

  // @FieldResolver(() => Float)
  // async upvotes(@Root() post: Post) {
  //   return User.createQueryBuilder('user')
  //     .innerJoin(`user.upvotedPosts`, 'post', 'post.id = :id', { id: post.id })
  //     .getCount();
  // }

  // @FieldResolver(() => Float)
  // async downvotes(@Root() post: Post) {
  //   return User.createQueryBuilder('user')
  //     .innerJoin(`user.downvotedPosts`, 'post', 'post.id = :id', {
  //       id: post.id,
  //     })
  //     .getCount();
  // }
}
