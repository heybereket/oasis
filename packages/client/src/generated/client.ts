import BaseClient from "../base-client";
import { Mutation, Query, MutationGiveBadgeArgs, MutationMakeBadgeArgs, MutationEditCommentArgs, MutationLikeDislikeCommentArgs, MutationCreateCommentArgs, MutationDeletePostArgs, MutationEditPostArgs, MutationLikeDislikeArgs, MutationCreatePostArgs, QueryGetResortByNameArgs, MutationJoinResortArgs, QueryGetUserByNameArgs } from "./types";
export class Client extends BaseClient {
  badge = {
    give: (args: MutationGiveBadgeArgs) => {
      const selection = this.options.selections?.badge || [];
      return this.fetchGraphQL<Mutation["giveBadge"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.giveBadge, args);
    },
    make: (args: MutationMakeBadgeArgs) => {
      const selection = this.options.selections?.badge || [];
      return this.fetchGraphQL<Mutation["makeBadge"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.makeBadge, args);
    },
  }
  comment = {
    edit: (args: MutationEditCommentArgs) => {
      const selection = this.options.selections?.comment || [];
      return this.fetchGraphQL<Mutation["editComment"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.editComment, args);
    },
    likeDislike: (args: MutationLikeDislikeCommentArgs) => {
      const selection = this.options.selections?.comment || [];
      return this.fetchGraphQL<Mutation["likeDislikeComment"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.likeDislikeComment, args);
    },
    create: (args: MutationCreateCommentArgs) => {
      const selection = this.options.selections?.comment || [];
      return this.fetchGraphQL<Mutation["createComment"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.createComment, args);
    },
  }
  post = {
    delete: (args: MutationDeletePostArgs) => {
      const selection = this.options.selections?.post || [];
      return this.fetchGraphQL<Mutation["deletePost"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.deletePost, args);
    },
    edit: (args: MutationEditPostArgs) => {
      const selection = this.options.selections?.post || [];
      return this.fetchGraphQL<Mutation["editPost"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.editPost, args);
    },
    likeDislike: (args: MutationLikeDislikeArgs) => {
      const selection = this.options.selections?.post || [];
      return this.fetchGraphQL<Mutation["likeDislike"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.likeDislike, args);
    },
    create: (args: MutationCreatePostArgs) => {
      const selection = this.options.selections?.post || [];
      return this.fetchGraphQL<Mutation["createPost"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.createPost, args);
    },
  }
  resort = {
    getByName: (args: QueryGetResortByNameArgs) => {
      const selection = this.options.selections?.resort || [];
      return this.fetchGraphQL<Query["getResortByName"]>(`query { paginateBadges { ${selection.join(",")} } }`, data => data.getResortByName, args);
    },
    join: (args: MutationJoinResortArgs) => {
      const selection = this.options.selections?.resort || [];
      return this.fetchGraphQL<Mutation["joinResort"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.joinResort, args);
    },
  }
  user = {
    current: () => {
      const selection = this.options.selections?.user || [];
      return this.fetchGraphQL<Query["currentUser"]>(`query { paginateBadges { ${selection.join(",")} } }`, data => data.currentUser, {});
    },
    getByName: (args: QueryGetUserByNameArgs) => {
      const selection = this.options.selections?.user || [];
      return this.fetchGraphQL<Query["getUserByName"]>(`query { paginateBadges { ${selection.join(",")} } }`, data => data.getUserByName, args);
    },
  }
}
