import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ContextType } from '@root/server';
import Comment from '@entities/Comment';
import { upvoteDownvote } from '@utils/votes/upvoteDownvoteEntity';
import type User from '@entities/User';

// @bcg-resolver(mutation, upvoteComment, comment)
// @bcg-resolver(mutation, downvoteComment, comment)

const action = async (upvote: boolean, commentId: string, user: User) =>
  upvoteDownvote<Comment>(
    await Comment.findOne(commentId),
    user,
    upvote,
    !upvote,
    (user) => user.upvotedComments,
    (user) => user.downvotedComments,
    (user, entities) => (user.upvotedComments = Promise.resolve(entities)),
    (user, entities) => (user.downvotedComments = Promise.resolve(entities))
  );

@Resolver(() => Comment)
export default class UpvoteDownvoteCommentResolver {
  @Mutation(() => Boolean)
  @Authorized()
  async upvoteComment(
    @Arg('commentId') commentId: string,
    @Ctx() { getUser }: ContextType
  ) {
    return action(true, commentId, await getUser());
  }

  @Mutation(() => Boolean)
  @Authorized()
  async downvoteComment(
    @Arg('commentId') commentId: string,
    @Ctx() { getUser }: ContextType
  ) {
    return action(false, commentId, await getUser());
  }
}
