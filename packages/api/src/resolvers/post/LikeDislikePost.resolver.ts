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

// @bcg-resolver(mutation, likeDownvote, post)

@Resolver(() => Post)
export class UpvoteDownvotePostResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async likeDownvote(
    @Arg('postId') postId: string,
    @Arg('like') like: boolean,
    @Arg('downvote') downvote: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    const post = await Post.findOne(postId);

    if (!post) throw new ApolloError('Post not found');

    if ((like && downvote) || (!like && !downvote)) {
      throw new ApolloError('Please select like or downvote');
    }

    const user = await getUser();

    const likedPosts = await user.likedPosts;
    let alreadyliked = false;
    const likedPostsMinusNew: Post[] = [];
    likedPosts.forEach((post) => {
      if (post.id === postId) {
        alreadyliked = true;
      } else {
        likedPostsMinusNew.push(post);
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
    if (like) {
      if (!alreadyliked) {
        if (alreadydownvoted) {
          user.downvotedPosts = Promise.resolve(downvotedPostsMinusNew);
        }
        user.likedPosts = Promise.resolve([...likedPosts, post]);
      } else {
        user.likedPosts = Promise.resolve(likedPostsMinusNew);
      }
    } else if (downvote) {
      if (!alreadydownvoted) {
        if (alreadyliked) {
          user.likedPosts = Promise.resolve(likedPostsMinusNew);
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
  async likes(@Root() post: Post) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.likedPosts`, 'post', 'post.id = :id', { id: post.id })
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
