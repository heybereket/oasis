import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Float,
  Mutation,
  Resolver,
  Root,
} from 'type-graphql';
import { ContextType } from '@root/server';
import Post from '@entities/Post';
import User from '@entities/User';
import { upvoteDownvote } from '@utils/upvoteDownvote/upvoteDownvoteEntity';

// @bcg-resolver(mutation, upvoteDownvote, post)

@Resolver(() => Post)
export class UpvoteDownvotePostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async upvoteDownvote(
    @Arg('postId') postId: string,
    @Arg('upvote') upvote: boolean,
    @Arg('downvote') downvote: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    return upvoteDownvote<Post>(
      await Post.findOne(postId),
      await getUser(),
      upvote,
      downvote,
      (user) => user.upvotedPosts,
      (user) => user.downvotedPosts,
      (user, entities) => (user.upvotedPosts = Promise.resolve(entities)),
      (user, entities) => (user.downvotedPosts = Promise.resolve(entities))
    );
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
