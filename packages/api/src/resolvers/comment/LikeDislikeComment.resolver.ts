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
import User from '@entities/User';
import Comment from '@entities/Comment';

// @bcg-resolver(mutation, upvoteDownvoteComment, comment)

@Resolver(() => Comment)
export class UpvoteDownvoteCommentResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async upvoteDownvoteComment(
    @Arg('commentId') commentId: string,
    @Arg('upvote') upvote: boolean,
    @Arg('downvote') downvote: boolean,
    @Ctx() { getUser }: ContextType
  ) {
    const comment = await Comment.findOne(commentId);

    if (!comment) throw new ApolloError('Comment not found');

    if ((upvote && downvote) || (!upvote && !downvote)) {
      throw new ApolloError('Please select upvote or downvote');
    }

    const user = await getUser();

    const upvotedComments = await user.upvotedComments;
    let alreadyupvoted = false;
    const upvotedCommentsMinusNew: Comment[] = [];
    upvotedComments.forEach((comment) => {
      if (comment.id === commentId) {
        alreadyupvoted = true;
      } else {
        upvotedCommentsMinusNew.push(comment);
      }
    });

    const downvotedComments = await user.downvotedComments;
    let alreadydownvoted = false;
    const downvotedCommentsMinusNew: Comment[] = [];
    downvotedComments.forEach((comment) => {
      if (comment.id === commentId) {
        alreadydownvoted = true;
      } else {
        downvotedCommentsMinusNew.push(comment);
      }
    });
    if (upvote) {
      if (!alreadyupvoted) {
        if (alreadydownvoted) {
          user.downvotedComments = Promise.resolve(downvotedCommentsMinusNew);
        }
        user.upvotedComments = Promise.resolve([...upvotedComments, comment]);
      } else {
        user.upvotedComments = Promise.resolve(upvotedCommentsMinusNew);
      }
    } else if (downvote) {
      if (!alreadydownvoted) {
        if (alreadyupvoted) {
          user.upvotedComments = Promise.resolve(upvotedCommentsMinusNew);
        }
        user.downvotedComments = Promise.resolve([
          ...downvotedComments,
          comment,
        ]);
      } else {
        user.downvotedComments = Promise.resolve(downvotedCommentsMinusNew);
      }
    }

    comment.save();
    user.save();

    return true;
  }

  @FieldResolver(() => Float)
  async upvotes(@Root() comment: Comment) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.upvotedComments`, 'comment', 'comment.id = :id', {
        id: comment.id,
      })
      .getCount();
  }

  @FieldResolver(() => Float)
  async downvotes(@Root() comment: Comment) {
    return User.createQueryBuilder('user')
      .innerJoin(`user.downvotedComments`, 'comment', 'comment.id = :id', {
        id: comment.id,
      })
      .getCount();
  }
}
