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
import Comment from '@entities/Comment';

@Resolver(() => Comment)
export class LikeDislikeCommentResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async likeDislikeComment(
    @Arg('commentId') commentId: string,
    @Arg('like') like: boolean,
    @Arg('dislike') dislike: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    const comment = await Comment.findOne(commentId);

    if (!comment) throw new ApolloError('Comment not found');

    if ((like && dislike) || (!like && !dislike)) throw new ApolloError('Please select like or dislike');

    const user = await getUser();

    const likedComments = await user.likedComments;
    let alreadyliked = false;
    const likedCommentsMinusNew: Comment[] = [];
    likedComments.forEach((comment) => {
      if (comment.id === commentId) {
        alreadyliked = true;
      } else {
        likedCommentsMinusNew.push(comment);
      }
    });

    const dislikedComments = await user.dislikedComments;
    let alreadydisliked = false;
    const dislikedCommentsMinusNew: Comment[] = [];
    dislikedComments.forEach((comment) => {
      if (comment.id === commentId) {
        alreadydisliked = true;
      } else {
        dislikedCommentsMinusNew.push(comment);
      }
    });
    if (like) {
      if (!alreadyliked) {
        if (alreadydisliked) {
          user.dislikedComments = Promise.resolve(dislikedCommentsMinusNew);
        }
        user.likedComments = Promise.resolve([...likedComments, comment]);
      } else {
        user.likedComments = Promise.resolve(likedCommentsMinusNew);
      }
    } else if (dislike) {
      if (!alreadydisliked) {
        if (alreadyliked) {
          user.likedComments = Promise.resolve(likedCommentsMinusNew);
        }
        user.dislikedComments = Promise.resolve([...dislikedComments, comment]);
      } else {
        user.dislikedComments = Promise.resolve(dislikedCommentsMinusNew);
      }
    }

    comment.save();
    user.save();

    return true;
  }

  @FieldResolver(() => Float)
  async likes(@Root() comment: Comment) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.likedComments`, 'comment', 'comment.id = :id', {
        id: comment.id,
      })
      .getCount();
  }

  @FieldResolver(() => Float)
  async dislikes(@Root() comment: Comment) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.dislikedComments`, 'comment', 'comment.id = :id', {
        id: comment.id,
      })
      .getCount();
  }
}
