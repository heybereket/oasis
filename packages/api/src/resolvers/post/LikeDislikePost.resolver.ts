import { ApolloError } from 'apollo-server-errors';
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
    const post = await Post.findOne(postId);

    if (!post) throw new ApolloError('Post not found');

    if ((upvote && downvote) || (!upvote && !downvote)) {
      throw new ApolloError('Please select upvote or downvote');
    }

    const user = await getUser();

    const upvotedPosts = await user.upvotedPosts;
    let alreadyupvoted = false;
    const upvotedPostsMinusNew: Post[] = [];
    upvotedPosts.forEach((post) => {
      if (post.id === postId) {
        alreadyupvoted = true;
      } else {
        upvotedPostsMinusNew.push(post);
      }
    });

    const downvotedPosts = await user.downvotedPosts;
    let alreadydownvoted = false;
    const downvotedPostsMinusNew: Post[] = [];
    downvotedPosts.forEach((post) => {
      if (post.id === postId) {
        alreadydownvoted = true;
      } else {
        downvotedPostsMinusNew.push(post);
      }
    });
    if (upvote) {
      if (!alreadyupvoted) {
        if (alreadydownvoted) {
          user.downvotedPosts = Promise.resolve(downvotedPostsMinusNew);
        }
        user.upvotedPosts = Promise.resolve([...upvotedPosts, post]);
      } else {
        user.upvotedPosts = Promise.resolve(upvotedPostsMinusNew);
      }
    } else if (downvote) {
      if (!alreadydownvoted) {
        if (alreadyupvoted) {
          user.upvotedPosts = Promise.resolve(upvotedPostsMinusNew);
        }
        user.downvotedPosts = Promise.resolve([...downvotedPosts, post]);
      } else {
        user.downvotedPosts = Promise.resolve(downvotedPostsMinusNew);
      }
    }

    post.save();
    user.save();

    return true;
  }

  @FieldResolver(() => Float)
  async upvotes(@Root() post: Post) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.upvotedPosts`, 'post', 'post.id = :id', { id: post.id })
      .getCount();
  }

  @FieldResolver(() => Float)
  async downvotes(@Root() post: Post) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.downvotedPosts`, 'post', 'post.id = :id', {
        id: post.id,
      })
      .getCount();
  }
}
