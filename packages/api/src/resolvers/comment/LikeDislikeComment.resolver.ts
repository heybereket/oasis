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
import { upvoteDownvote } from '@utils/upvoteDownvote/upvoteDownvoteEntity';

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
    return upvoteDownvote<Comment>(
      await Comment.findOne(commentId),
      await getUser(),
      upvote,
      downvote,
      (user) => user.upvotedComments,
      (user) => user.downvotedComments,
      (user, entities) => (user.upvotedComments = Promise.resolve(entities)),
      (user, entities) => (user.downvotedComments = Promise.resolve(entities))
    );
  }

  // @FieldResolver(() => Float)
  // async upvotes(@Root() comment: Comment) {
  //   return User.createQueryBuilder('user')
  //     .innerJoin(`user.upvotedComments`, 'comment', 'comment.id = :id', {
  //       id: comment.id,
  //     })
  //     .getCount();
  // }

  // @FieldResolver(() => Float)
  // async downvotes(@Root() comment: Comment) {
  //   return User.createQueryBuilder('user')
  //     .innerJoin(`user.downvotedComments`, 'comment', 'comment.id = :id', {
  //       id: comment.id,
  //     })
  //     .getCount();
  // }
}
