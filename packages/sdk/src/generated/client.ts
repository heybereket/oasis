/* eslint-disable no-invalid-this */
import BaseClient from "../base-client";
import { Field } from "../query-builder";
import {
  Mutation,
  Query,
  QueryPaginateAnswersArgs,
  QueryGetAnswerArgs,
  MutationEditAnswerArgs,
  MutationUpvoteDownvoteAnswerArgs,
  MutationCreateAnswerArgs,
  QueryPaginateBadgesArgs,
  QueryGetBadgeArgs,
  MutationGiveBadgeArgs,
  MutationMakeBadgeArgs,
  QueryPaginateCommentsArgs,
  QueryGetCommentArgs,
  MutationEditCommentArgs,
  MutationUpvoteDownvoteCommentArgs,
  MutationCreateCommentArgs,
  QueryPaginatePostsArgs,
  QueryGetPostArgs,
  MutationDeletePostArgs,
  MutationEditPostArgs,
  MutationUpvoteDownvoteArgs,
  MutationCreatePostArgs,
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
} from "./types";
export class Client extends BaseClient {
  answer = {
    paginate: (
      limit: QueryPaginateAnswersArgs['limit'],
      offset: QueryPaginateAnswersArgs['offset'],
      sortCol?: QueryPaginateAnswersArgs['sortCol'],
      sortType?: QueryPaginateAnswersArgs['sortType'],
      queryFields: Field<"paginateAnswers"> = {}
    ) => {
      return this
        .createQueryBuilder("paginateAnswers")
        .args({ limit, offset, sortCol, sortType })
        .addFields(queryFields)
        .send()
    },
    get: (
      id: QueryGetAnswerArgs['id'],
      queryFields: Field<"getAnswer"> = {}
    ) => {
      return this
        .createQueryBuilder("getAnswer")
        .args({ id })
        .addFields(queryFields)
        .send()
    },
    edit: (
      answerId: MutationEditAnswerArgs['answerId'],
      data: MutationEditAnswerArgs['data'],
      queryFields: Field<"editAnswer"> = {}
    ) => {
      return this
        .createQueryBuilder("editAnswer")
        .args({ answerId, data })
        .addFields(queryFields)
        .send()
    },
    upvoteDownvote: (
      answerId: MutationUpvoteDownvoteAnswerArgs['answerId'],
      downvote: MutationUpvoteDownvoteAnswerArgs['downvote'],
      upvote: MutationUpvoteDownvoteAnswerArgs['upvote'],
      queryFields: Field<"upvoteDownvoteAnswer"> = {}
    ) => {
      return this
        .createQueryBuilder("upvoteDownvoteAnswer")
        .args({ answerId, downvote, upvote })
        .addFields(queryFields)
        .send()
    },
    create: (
      questionId: MutationCreateAnswerArgs['questionId'],
      data: MutationCreateAnswerArgs['data'],
      queryFields: Field<"createAnswer"> = {}
    ) => {
      return this
        .createQueryBuilder("createAnswer")
        .args({ questionId, data })
        .addFields(queryFields)
        .send()
    },
  };
  badge = {
    paginate: (
      limit: QueryPaginateBadgesArgs['limit'],
      offset: QueryPaginateBadgesArgs['offset'],
      sortCol?: QueryPaginateBadgesArgs['sortCol'],
      sortType?: QueryPaginateBadgesArgs['sortType'],
      queryFields: Field<"paginateBadges"> = {}
    ) => {
      return this
        .createQueryBuilder("paginateBadges")
        .args({ limit, offset, sortCol, sortType })
        .addFields(queryFields)
        .send()
    },
    get: (
      id: QueryGetBadgeArgs['id'],
      queryFields: Field<"getBadge"> = {}
    ) => {
      return this
        .createQueryBuilder("getBadge")
        .args({ id })
        .addFields(queryFields)
        .send()
    },
    give: (
      badgeName: MutationGiveBadgeArgs['badgeName'],
      username: MutationGiveBadgeArgs['username'],
      queryFields: Field<"giveBadge"> = {}
    ) => {
      return this
        .createQueryBuilder("giveBadge")
        .args({ badgeName, username })
        .addFields(queryFields)
        .send()
    },
    make: (
      data: MutationMakeBadgeArgs['data'],
      queryFields: Field<"makeBadge"> = {}
    ) => {
      return this
        .createQueryBuilder("makeBadge")
        .args({ data })
        .addFields(queryFields)
        .send()
    },
  };
  comment = {
    paginate: (
      limit: QueryPaginateCommentsArgs['limit'],
      offset: QueryPaginateCommentsArgs['offset'],
      sortCol?: QueryPaginateCommentsArgs['sortCol'],
      sortType?: QueryPaginateCommentsArgs['sortType'],
      queryFields: Field<"paginateComments"> = {}
    ) => {
      return this
        .createQueryBuilder("paginateComments")
        .args({ limit, offset, sortCol, sortType })
        .addFields(queryFields)
        .send()
    },
    get: (
      id: QueryGetCommentArgs['id'],
      queryFields: Field<"getComment"> = {}
    ) => {
      return this
        .createQueryBuilder("getComment")
        .args({ id })
        .addFields(queryFields)
        .send()
    },
    edit: (
      commentId: MutationEditCommentArgs['commentId'],
      data: MutationEditCommentArgs['data'],
      queryFields: Field<"editComment"> = {}
    ) => {
      return this
        .createQueryBuilder("editComment")
        .args({ commentId, data })
        .addFields(queryFields)
        .send()
    },
    upvoteDownvote: (
      commentId: MutationUpvoteDownvoteCommentArgs['commentId'],
      downvote: MutationUpvoteDownvoteCommentArgs['downvote'],
      upvote: MutationUpvoteDownvoteCommentArgs['upvote'],
      queryFields: Field<"upvoteDownvoteComment"> = {}
    ) => {
      return this
        .createQueryBuilder("upvoteDownvoteComment")
        .args({ commentId, downvote, upvote })
        .addFields(queryFields)
        .send()
    },
    create: (
      postId: MutationCreateCommentArgs['postId'],
      data: MutationCreateCommentArgs['data'],
      queryFields: Field<"createComment"> = {}
    ) => {
      return this
        .createQueryBuilder("createComment")
        .args({ postId, data })
        .addFields(queryFields)
        .send()
    },
  };
  post = {
    paginate: (
      limit: QueryPaginatePostsArgs['limit'],
      offset: QueryPaginatePostsArgs['offset'],
      sortCol?: QueryPaginatePostsArgs['sortCol'],
      sortType?: QueryPaginatePostsArgs['sortType'],
      queryFields: Field<"paginatePosts"> = {}
    ) => {
      return this
        .createQueryBuilder("paginatePosts")
        .args({ limit, offset, sortCol, sortType })
        .addFields(queryFields)
        .send()
    },
    get: (
      id: QueryGetPostArgs['id'],
      queryFields: Field<"getPost"> = {}
    ) => {
      return this
        .createQueryBuilder("getPost")
        .args({ id })
        .addFields(queryFields)
        .send()
    },
    delete: (
      postId: MutationDeletePostArgs['postId'],
      queryFields: Field<"deletePost"> = {}
    ) => {
      return this
        .createQueryBuilder("deletePost")
        .args({ postId })
        .addFields(queryFields)
        .send()
    },
    edit: (
      postId: MutationEditPostArgs['postId'],
      data: MutationEditPostArgs['data'],
      queryFields: Field<"editPost"> = {}
    ) => {
      return this
        .createQueryBuilder("editPost")
        .args({ postId, data })
        .addFields(queryFields)
        .send()
    },
    upvoteDownvote: (
      downvote: MutationUpvoteDownvoteArgs['downvote'],
      postId: MutationUpvoteDownvoteArgs['postId'],
      upvote: MutationUpvoteDownvoteArgs['upvote'],
      queryFields: Field<"upvoteDownvote"> = {}
    ) => {
      return this
        .createQueryBuilder("upvoteDownvote")
        .args({ downvote, postId, upvote })
        .addFields(queryFields)
        .send()
    },
    create: (
      data: MutationCreatePostArgs['data'],
      queryFields: Field<"createPost"> = {}
    ) => {
      return this
        .createQueryBuilder("createPost")
        .args({ data })
        .addFields(queryFields)
        .send()
    },
  };
  question = {
    paginate: (
      limit: QueryPaginateQuestionsArgs['limit'],
      offset: QueryPaginateQuestionsArgs['offset'],
      sortCol?: QueryPaginateQuestionsArgs['sortCol'],
      sortType?: QueryPaginateQuestionsArgs['sortType'],
      queryFields: Field<"paginateQuestions"> = {}
    ) => {
      return this
        .createQueryBuilder("paginateQuestions")
        .args({ limit, offset, sortCol, sortType })
        .addFields(queryFields)
        .send()
    },
    get: (
      id: QueryGetQuestionArgs['id'],
      queryFields: Field<"getQuestion"> = {}
    ) => {
      return this
        .createQueryBuilder("getQuestion")
        .args({ id })
        .addFields(queryFields)
        .send()
    },
    delete: (
      questionId: MutationDeleteQuestionArgs['questionId'],
      queryFields: Field<"deleteQuestion"> = {}
    ) => {
      return this
        .createQueryBuilder("deleteQuestion")
        .args({ questionId })
        .addFields(queryFields)
        .send()
    },
    edit: (
      questionId: MutationEditQuestionArgs['questionId'],
      data: MutationEditQuestionArgs['data'],
      queryFields: Field<"editQuestion"> = {}
    ) => {
      return this
        .createQueryBuilder("editQuestion")
        .args({ questionId, data })
        .addFields(queryFields)
        .send()
    },
    create: (
      data: MutationCreateQuestionArgs['data'],
      queryFields: Field<"createQuestion"> = {}
    ) => {
      return this
        .createQueryBuilder("createQuestion")
        .args({ data })
        .addFields(queryFields)
        .send()
    },
  };
  resort = {
    paginate: (
      limit: QueryPaginateResortsArgs['limit'],
      offset: QueryPaginateResortsArgs['offset'],
      sortCol?: QueryPaginateResortsArgs['sortCol'],
      sortType?: QueryPaginateResortsArgs['sortType'],
      queryFields: Field<"paginateResorts"> = {}
    ) => {
      return this
        .createQueryBuilder("paginateResorts")
        .args({ limit, offset, sortCol, sortType })
        .addFields(queryFields)
        .send()
    },
    get: (
      id: QueryGetResortArgs['id'],
      queryFields: Field<"getResort"> = {}
    ) => {
      return this
        .createQueryBuilder("getResort")
        .args({ id })
        .addFields(queryFields)
        .send()
    },
    getByName: (
      name: QueryGetResortByNameArgs['name'],
      queryFields: Field<"getResortByName"> = {}
    ) => {
      return this
        .createQueryBuilder("getResortByName")
        .args({ name })
        .addFields(queryFields)
        .send()
    },
    join: (
      resortId: MutationJoinResortArgs['resortId'],
      queryFields: Field<"joinResort"> = {}
    ) => {
      return this
        .createQueryBuilder("joinResort")
        .args({ resortId })
        .addFields(queryFields)
        .send()
    },
  };
  user = {
    paginate: (
      limit: QueryPaginateUsersArgs['limit'],
      offset: QueryPaginateUsersArgs['offset'],
      sortCol?: QueryPaginateUsersArgs['sortCol'],
      sortType?: QueryPaginateUsersArgs['sortType'],
      queryFields: Field<"paginateUsers"> = {}
    ) => {
      return this
        .createQueryBuilder("paginateUsers")
        .args({ limit, offset, sortCol, sortType })
        .addFields(queryFields)
        .send()
    },
    get: (
      id: QueryGetUserArgs['id'],
      queryFields: Field<"getUser"> = {}
    ) => {
      return this
        .createQueryBuilder("getUser")
        .args({ id })
        .addFields(queryFields)
        .send()
    },
    current: (
      queryFields: Field<"currentUser"> = {}
    ) => {
      return this
        .createQueryBuilder("currentUser")
        .args({})
        .addFields(queryFields)
        .send()
    },
    getByName: (
      username: QueryGetUserByNameArgs['username'],
      queryFields: Field<"getUserByName"> = {}
    ) => {
      return this
        .createQueryBuilder("getUserByName")
        .args({ username })
        .addFields(queryFields)
        .send()
    },
  };
}
