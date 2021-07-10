/* eslint-disable no-invalid-this */
import BaseClient from '../base-client';
import { Field, ResolverKeys } from '../query-builder';
import { wrapPost } from '../wrappers/post';
import {
  QueryPaginateAnswersArgs,
  QueryGetAnswerArgs,
  MutationEditAnswerArgs,
  MutationCreateAnswerArgs,
  MutationUpvoteAnswerArgs,
  MutationDownvoteAnswerArgs,
  QueryPaginateBadgesArgs,
  QueryGetBadgeArgs,
  MutationGiveBadgeArgs,
  MutationMakeBadgeArgs,
  QueryPaginateCommentsArgs,
  QueryGetCommentArgs,
  MutationEditCommentArgs,
  MutationCreateCommentArgs,
  MutationUpvoteCommentArgs,
  MutationDownvoteCommentArgs,
  Post,
  QueryPaginatePostsArgs,
  QueryGetPostArgs,
  MutationDeletePostArgs,
  MutationEditPostArgs,
  MutationCreatePostArgs,
  MutationUpvotePostArgs,
  MutationDownvotePostArgs,
  QueryPaginateQuestionsArgs,
  QueryGetQuestionArgs,
  MutationDeleteQuestionArgs,
  MutationEditQuestionArgs,
  MutationCreateQuestionArgs,
  QueryPaginateResortsArgs,
  QueryGetResortArgs,
  QueryGetResortByNameArgs,
  MutationJoinResortArgs,
  QueryPaginateUsersArgs,
  QueryGetUserArgs,
  QueryGetUserByNameArgs,
} from './types';
export class Client extends BaseClient {
  answer = {
    paginate: (
      args: QueryPaginateAnswersArgs,
      queryFields:
        | ResolverKeys<'paginateAnswers'>
        | Field<'paginateAnswers'> = {}
    ) => {
      return this.createQueryBuilder('paginateAnswers')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    get: (
      args: QueryGetAnswerArgs,
      queryFields: ResolverKeys<'getAnswer'> | Field<'getAnswer'> = {}
    ) => {
      return this.createQueryBuilder('getAnswer')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    edit: (
      args: MutationEditAnswerArgs,
      queryFields: ResolverKeys<'editAnswer'> | Field<'editAnswer'> = {}
    ) => {
      return this.createQueryBuilder('editAnswer')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    create: (
      args: MutationCreateAnswerArgs,
      queryFields: ResolverKeys<'createAnswer'> | Field<'createAnswer'> = {}
    ) => {
      return this.createQueryBuilder('createAnswer')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    upvote: (
      args: MutationUpvoteAnswerArgs,
      queryFields: ResolverKeys<'upvoteAnswer'> | Field<'upvoteAnswer'> = {}
    ) => {
      return this.createQueryBuilder('upvoteAnswer')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    downvote: (
      args: MutationDownvoteAnswerArgs,
      queryFields: ResolverKeys<'downvoteAnswer'> | Field<'downvoteAnswer'> = {}
    ) => {
      return this.createQueryBuilder('downvoteAnswer')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
  };
  badge = {
    paginate: (
      args: QueryPaginateBadgesArgs,
      queryFields: ResolverKeys<'paginateBadges'> | Field<'paginateBadges'> = {}
    ) => {
      return this.createQueryBuilder('paginateBadges')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    get: (
      args: QueryGetBadgeArgs,
      queryFields: ResolverKeys<'getBadge'> | Field<'getBadge'> = {}
    ) => {
      return this.createQueryBuilder('getBadge')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    give: (
      args: MutationGiveBadgeArgs,
      queryFields: ResolverKeys<'giveBadge'> | Field<'giveBadge'> = {}
    ) => {
      return this.createQueryBuilder('giveBadge')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    make: (
      args: MutationMakeBadgeArgs,
      queryFields: ResolverKeys<'makeBadge'> | Field<'makeBadge'> = {}
    ) => {
      return this.createQueryBuilder('makeBadge')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
  };
  comment = {
    paginate: (
      args: QueryPaginateCommentsArgs,
      queryFields:
        | ResolverKeys<'paginateComments'>
        | Field<'paginateComments'> = {}
    ) => {
      return this.createQueryBuilder('paginateComments')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    get: (
      args: QueryGetCommentArgs,
      queryFields: ResolverKeys<'getComment'> | Field<'getComment'> = {}
    ) => {
      return this.createQueryBuilder('getComment')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    edit: (
      args: MutationEditCommentArgs,
      queryFields: ResolverKeys<'editComment'> | Field<'editComment'> = {}
    ) => {
      return this.createQueryBuilder('editComment')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    create: (
      args: MutationCreateCommentArgs,
      queryFields: ResolverKeys<'createComment'> | Field<'createComment'> = {}
    ) => {
      return this.createQueryBuilder('createComment')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    upvote: (
      args: MutationUpvoteCommentArgs,
      queryFields: ResolverKeys<'upvoteComment'> | Field<'upvoteComment'> = {}
    ) => {
      return this.createQueryBuilder('upvoteComment')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    downvote: (
      args: MutationDownvoteCommentArgs,
      queryFields:
        | ResolverKeys<'downvoteComment'>
        | Field<'downvoteComment'> = {}
    ) => {
      return this.createQueryBuilder('downvoteComment')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
  };
  post = {
    wrap: (post: Post) => wrapPost(post, this),
    paginate: (
      args: QueryPaginatePostsArgs,
      queryFields: ResolverKeys<'paginatePosts'> | Field<'paginatePosts'> = {}
    ) => {
      return this.createQueryBuilder('paginatePosts')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    get: (
      args: QueryGetPostArgs,
      queryFields: ResolverKeys<'getPost'> | Field<'getPost'> = {}
    ) => {
      return this.createQueryBuilder('getPost')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    delete: (
      args: MutationDeletePostArgs,
      queryFields: ResolverKeys<'deletePost'> | Field<'deletePost'> = {}
    ) => {
      return this.createQueryBuilder('deletePost')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    edit: (
      args: MutationEditPostArgs,
      queryFields: ResolverKeys<'editPost'> | Field<'editPost'> = {}
    ) => {
      return this.createQueryBuilder('editPost')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    create: (
      args: MutationCreatePostArgs,
      queryFields: ResolverKeys<'createPost'> | Field<'createPost'> = {}
    ) => {
      return this.createQueryBuilder('createPost')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    upvote: (
      args: MutationUpvotePostArgs,
      queryFields: ResolverKeys<'upvotePost'> | Field<'upvotePost'> = {}
    ) => {
      return this.createQueryBuilder('upvotePost')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    downvote: (
      args: MutationDownvotePostArgs,
      queryFields: ResolverKeys<'downvotePost'> | Field<'downvotePost'> = {}
    ) => {
      return this.createQueryBuilder('downvotePost')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
  };
  question = {
    paginate: (
      args: QueryPaginateQuestionsArgs,
      queryFields:
        | ResolverKeys<'paginateQuestions'>
        | Field<'paginateQuestions'> = {}
    ) => {
      return this.createQueryBuilder('paginateQuestions')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    get: (
      args: QueryGetQuestionArgs,
      queryFields: ResolverKeys<'getQuestion'> | Field<'getQuestion'> = {}
    ) => {
      return this.createQueryBuilder('getQuestion')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    delete: (
      args: MutationDeleteQuestionArgs,
      queryFields: ResolverKeys<'deleteQuestion'> | Field<'deleteQuestion'> = {}
    ) => {
      return this.createQueryBuilder('deleteQuestion')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    edit: (
      args: MutationEditQuestionArgs,
      queryFields: ResolverKeys<'editQuestion'> | Field<'editQuestion'> = {}
    ) => {
      return this.createQueryBuilder('editQuestion')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    create: (
      args: MutationCreateQuestionArgs,
      queryFields: ResolverKeys<'createQuestion'> | Field<'createQuestion'> = {}
    ) => {
      return this.createQueryBuilder('createQuestion')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
  };
  resort = {
    paginate: (
      args: QueryPaginateResortsArgs,
      queryFields:
        | ResolverKeys<'paginateResorts'>
        | Field<'paginateResorts'> = {}
    ) => {
      return this.createQueryBuilder('paginateResorts')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    get: (
      args: QueryGetResortArgs,
      queryFields: ResolverKeys<'getResort'> | Field<'getResort'> = {}
    ) => {
      return this.createQueryBuilder('getResort')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    getByName: (
      args: QueryGetResortByNameArgs,
      queryFields:
        | ResolverKeys<'getResortByName'>
        | Field<'getResortByName'> = {}
    ) => {
      return this.createQueryBuilder('getResortByName')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    join: (
      args: MutationJoinResortArgs,
      queryFields: ResolverKeys<'joinResort'> | Field<'joinResort'> = {}
    ) => {
      return this.createQueryBuilder('joinResort')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
  };
  user = {
    paginate: (
      args: QueryPaginateUsersArgs,
      queryFields: ResolverKeys<'paginateUsers'> | Field<'paginateUsers'> = {}
    ) => {
      return this.createQueryBuilder('paginateUsers')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    get: (
      args: QueryGetUserArgs,
      queryFields: ResolverKeys<'getUser'> | Field<'getUser'> = {}
    ) => {
      return this.createQueryBuilder('getUser')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
    current: (
      queryFields: ResolverKeys<'currentUser'> | Field<'currentUser'> = {}
    ) => {
      return this.createQueryBuilder('currentUser')

        .addFields(queryFields as any)
        .send();
    },
    getByName: (
      args: QueryGetUserByNameArgs,
      queryFields: ResolverKeys<'getUserByName'> | Field<'getUserByName'> = {}
    ) => {
      return this.createQueryBuilder('getUserByName')
        .args(args)
        .addFields(queryFields as any)
        .send();
    },
  };
}
