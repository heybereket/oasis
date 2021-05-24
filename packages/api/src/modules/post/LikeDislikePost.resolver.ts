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
import { ContextType } from '@root/apolloServer';
import Post from '@entities/Post';
import User from '@entities/User';
import { BCQuery } from '@root/bot-client-gen';

@Resolver(() => Post)
export class LikeDislikePostResolver {
  @Mutation(() => Boolean)
  @BCQuery('post', 'boolean')
  @Authorized()
  async likeDislike(
    @Arg('postId') postId: string,
    @Arg('like') like: boolean,
    @Arg('dislike') dislike: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    const post = await Post.findOne(postId);

    if (!post) throw new ApolloError('Post not found');

    if ((like && dislike) || (!like && !dislike))
      throw new ApolloError('Please select like or dislike');

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

    const dislikedPosts = await user.dislikedPosts;
    let alreadydisliked = false;
    const dislikedPostsMinusNew: Post[] = [];
    dislikedPosts.forEach((post) => {
      if (post.id === postId) {
        alreadydisliked = true;
      } else {
        dislikedPostsMinusNew.push(post);
      }
    });
    if (like) {
      if (!alreadyliked) {
        if (alreadydisliked) {
          user.dislikedPosts = Promise.resolve(dislikedPostsMinusNew);
        }
        user.likedPosts = Promise.resolve([...likedPosts, post]);
      } else {
        user.likedPosts = Promise.resolve(likedPostsMinusNew);
      }
    } else if (dislike) {
      if (!alreadydisliked) {
        if (alreadyliked) {
          user.likedPosts = Promise.resolve(likedPostsMinusNew);
        }
        user.dislikedPosts = Promise.resolve([...dislikedPosts, post]);
      } else {
        user.dislikedPosts = Promise.resolve(dislikedPostsMinusNew);
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
  async dislikes(@Root() post: Post) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.dislikedPosts`, 'post', 'post.id = :id', { id: post.id })
      .getCount();
  }
}
