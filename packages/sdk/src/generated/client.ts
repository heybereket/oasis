/* eslint-disable no-invalid-this */
import BaseClient from '../base-client';
import {
  Mutation,
  Query,
  MutationGiveBadgeArgs,
  MutationMakeBadgeArgs,
  MutationEditCommentArgs,
  MutationLikeDislikeCommentArgs,
  MutationCreateCommentArgs,
  MutationDeletePostArgs,
  MutationEditPostArgs,
  MutationLikeDislikeArgs,
  MutationCreatePostArgs,
  QueryGetResortByNameArgs,
  MutationJoinResortArgs,
  QueryGetUserByNameArgs,
} from './types';
export class Client extends BaseClient {
  badge = {
    give: (args: MutationGiveBadgeArgs) => {
      return this.fetchGraphQL<Mutation['giveBadge']>(
        `mutation { paginateBadges { ${this.getSelections('badge')} } }`,
        (data) => data.giveBadge,
        args
      );
    },
    make: (args: MutationMakeBadgeArgs) => {
      return this.fetchGraphQL<Mutation['makeBadge']>(
        `mutation { paginateBadges { ${this.getSelections('badge')} } }`,
        (data) => data.makeBadge,
        args
      );
    },
  };
  comment = {
    edit: (args: MutationEditCommentArgs) => {
      return this.fetchGraphQL<Mutation['editComment']>(
        `mutation { paginateBadges { ${this.getSelections('comment')} } }`,
        (data) => data.editComment,
        args
      );
    },
    likeDislike: (args: MutationLikeDislikeCommentArgs) => {
      return this.fetchGraphQL<Mutation['likeDislikeComment']>(
        `mutation { paginateBadges { ${this.getSelections('comment')} } }`,
        (data) => data.likeDislikeComment,
        args
      );
    },
    create: (args: MutationCreateCommentArgs) => {
      return this.fetchGraphQL<Mutation['createComment']>(
        `mutation { paginateBadges { ${this.getSelections('comment')} } }`,
        (data) => data.createComment,
        args
      );
    },
  };
  post = {
    delete: (args: MutationDeletePostArgs) => {
      return this.fetchGraphQL<Mutation['deletePost']>(
        `mutation { paginateBadges { ${this.getSelections('post')} } }`,
        (data) => data.deletePost,
        args
      );
    },
    edit: (args: MutationEditPostArgs) => {
      return this.fetchGraphQL<Mutation['editPost']>(
        `mutation { paginateBadges { ${this.getSelections('post')} } }`,
        (data) => data.editPost,
        args
      );
    },
    likeDislike: (args: MutationLikeDislikeArgs) => {
      return this.fetchGraphQL<Mutation['likeDislike']>(
        `mutation { paginateBadges { ${this.getSelections('post')} } }`,
        (data) => data.likeDislike,
        args
      );
    },
    create: (args: MutationCreatePostArgs) => {
      return this.fetchGraphQL<Mutation['createPost']>(
        `mutation { paginateBadges { ${this.getSelections('post')} } }`,
        (data) => data.createPost,
        args
      );
    },
  };
  resort = {
    getByName: (args: QueryGetResortByNameArgs) => {
      return this.fetchGraphQL<Query['getResortByName']>(
        `query { paginateBadges { ${this.getSelections('resort')} } }`,
        (data) => data.getResortByName,
        args
      );
    },
    join: (args: MutationJoinResortArgs) => {
      return this.fetchGraphQL<Mutation['joinResort']>(
        `mutation { paginateBadges { ${this.getSelections('resort')} } }`,
        (data) => data.joinResort,
        args
      );
    },
  };
  user = {
    current: () => {
      return this.fetchGraphQL<Query['currentUser']>(
        `query { paginateBadges { ${this.getSelections('user')} } }`,
        (data) => data.currentUser,
        {}
      );
    },
    getByName: (args: QueryGetUserByNameArgs) => {
      return this.fetchGraphQL<Query['getUserByName']>(
        `query { paginateBadges { ${this.getSelections('user')} } }`,
        (data) => data.getUserByName,
        args
      );
    },
  };
}
