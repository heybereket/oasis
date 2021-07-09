/* eslint-disable no-invalid-this */
import BaseClient from "../base-client";
import { Field } from "../query-builder";
import {
  Mutation,
  Query,
  MutationEditAnswerArgs,
  MutationUpvoteDownvoteAnswerArgs,
  MutationCreateAnswerArgs,
  MutationGiveBadgeArgs,
  MutationMakeBadgeArgs,
  MutationEditCommentArgs,
  MutationUpvoteDownvoteCommentArgs,
  MutationCreateCommentArgs,
  MutationDeletePostArgs,
  MutationEditPostArgs,
  MutationUpvoteDownvoteArgs,
  MutationCreatePostArgs,
  MutationDeleteQuestionArgs,
  MutationEditQuestionArgs,
  MutationCreateQuestionArgs,
  QueryGetResortByNameArgs,
  MutationJoinResortArgs,
  QueryGetUserByNameArgs,
} from "./types";
export class Client extends BaseClient {
  answer = {
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
