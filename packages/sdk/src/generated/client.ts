/* eslint-disable no-invalid-this */
import BaseClient from "../base-client";
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
    edit: (args: MutationEditAnswerArgs) => {
      return this.fetchGraphQL<Mutation["editAnswer"]>(
        `mutation { paginateBadges { ${this.getSelections("answer")} } }`,
        data => data.editAnswer,
        args
      );
    },
    upvoteDownvote: (args: MutationUpvoteDownvoteAnswerArgs) => {
      return this.fetchGraphQL<Mutation["upvoteDownvoteAnswer"]>(
        `mutation { paginateBadges { ${this.getSelections("answer")} } }`,
        data => data.upvoteDownvoteAnswer,
        args
      );
    },
    create: (args: MutationCreateAnswerArgs) => {
      return this.fetchGraphQL<Mutation["createAnswer"]>(
        `mutation { paginateBadges { ${this.getSelections("answer")} } }`,
        data => data.createAnswer,
        args
      );
    },
  };
  badge = {
    give: (args: MutationGiveBadgeArgs) => {
      return this.fetchGraphQL<Mutation["giveBadge"]>(
        `mutation { paginateBadges { ${this.getSelections("badge")} } }`,
        data => data.giveBadge,
        args
      );
    },
    make: (args: MutationMakeBadgeArgs) => {
      return this.fetchGraphQL<Mutation["makeBadge"]>(
        `mutation { paginateBadges { ${this.getSelections("badge")} } }`,
        data => data.makeBadge,
        args
      );
    },
  };
  comment = {
    edit: (args: MutationEditCommentArgs) => {
      return this.fetchGraphQL<Mutation["editComment"]>(
        `mutation { paginateBadges { ${this.getSelections("comment")} } }`,
        data => data.editComment,
        args
      );
    },
    upvoteDownvote: (args: MutationUpvoteDownvoteCommentArgs) => {
      return this.fetchGraphQL<Mutation["upvoteDownvoteComment"]>(
        `mutation { paginateBadges { ${this.getSelections("comment")} } }`,
        data => data.upvoteDownvoteComment,
        args
      );
    },
    create: (args: MutationCreateCommentArgs) => {
      return this.fetchGraphQL<Mutation["createComment"]>(
        `mutation { paginateBadges { ${this.getSelections("comment")} } }`,
        data => data.createComment,
        args
      );
    },
  };
  post = {
    delete: (args: MutationDeletePostArgs) => {
      return this.fetchGraphQL<Mutation["deletePost"]>(
        `mutation { paginateBadges { ${this.getSelections("post")} } }`,
        data => data.deletePost,
        args
      );
    },
    edit: (args: MutationEditPostArgs) => {
      return this.fetchGraphQL<Mutation["editPost"]>(
        `mutation { paginateBadges { ${this.getSelections("post")} } }`,
        data => data.editPost,
        args
      );
    },
    upvoteDownvote: (args: MutationUpvoteDownvoteArgs) => {
      return this.fetchGraphQL<Mutation["upvoteDownvote"]>(
        `mutation { paginateBadges { ${this.getSelections("post")} } }`,
        data => data.upvoteDownvote,
        args
      );
    },
    create: (args: MutationCreatePostArgs) => {
      return this.fetchGraphQL<Mutation["createPost"]>(
        `mutation { paginateBadges { ${this.getSelections("post")} } }`,
        data => data.createPost,
        args
      );
    },
  };
  question = {
    delete: (args: MutationDeleteQuestionArgs) => {
      return this.fetchGraphQL<Mutation["deleteQuestion"]>(
        `mutation { paginateBadges { ${this.getSelections("question")} } }`,
        data => data.deleteQuestion,
        args
      );
    },
    edit: (args: MutationEditQuestionArgs) => {
      return this.fetchGraphQL<Mutation["editQuestion"]>(
        `mutation { paginateBadges { ${this.getSelections("question")} } }`,
        data => data.editQuestion,
        args
      );
    },
    create: (args: MutationCreateQuestionArgs) => {
      return this.fetchGraphQL<Mutation["createQuestion"]>(
        `mutation { paginateBadges { ${this.getSelections("question")} } }`,
        data => data.createQuestion,
        args
      );
    },
  };
  resort = {
    getByName: (args: QueryGetResortByNameArgs) => {
      return this.fetchGraphQL<Query["getResortByName"]>(
        `query { paginateBadges { ${this.getSelections("resort")} } }`,
        data => data.getResortByName,
        args
      );
    },
    join: (args: MutationJoinResortArgs) => {
      return this.fetchGraphQL<Mutation["joinResort"]>(
        `mutation { paginateBadges { ${this.getSelections("resort")} } }`,
        data => data.joinResort,
        args
      );
    },
  };
  user = {
    current: () => {
      return this.fetchGraphQL<Query["currentUser"]>(
        `query { paginateBadges { ${this.getSelections("user")} } }`,
        data => data.currentUser,
        {}
      );
    },
    getByName: (args: QueryGetUserByNameArgs) => {
      return this.fetchGraphQL<Query["getUserByName"]>(
        `query { paginateBadges { ${this.getSelections("user")} } }`,
        data => data.getUserByName,
        args
      );
    },
  };
}
