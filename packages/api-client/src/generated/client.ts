import BaseClient from "../base-client";
import { Mutation, MutationGiveBadgeArgs, MutationMakeBadgeArgs, MutationEditCommentArgs, MutationLikeDislikeCommentArgs, MutationCreateCommentArgs } from "./types";
export class Client extends BaseClient {
  badge = {
    giveBadge: (args: MutationGiveBadgeArgs) => {
      const selection = this.options.selections?.badge || [];
      return this.fetchGraphQL<Mutation["giveBadge"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.giveBadge, args);
    },
    makeBadge: (args: MutationMakeBadgeArgs) => {
      const selection = this.options.selections?.badge || [];
      return this.fetchGraphQL<Mutation["makeBadge"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.makeBadge, args);
    },
  }
  comment = {
    editComment: (args: MutationEditCommentArgs) => {
      const selection = this.options.selections?.comment || [];
      return this.fetchGraphQL<Mutation["editComment"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.editComment, args);
    },
    likeDislikeComment: (args: MutationLikeDislikeCommentArgs) => {
      const selection = this.options.selections?.comment || [];
      return this.fetchGraphQL<Mutation["likeDislikeComment"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.likeDislikeComment, args);
    },
    createComment: (args: MutationCreateCommentArgs) => {
      const selection = this.options.selections?.comment || [];
      return this.fetchGraphQL<Mutation["createComment"]>(`mutation { paginateBadges { ${selection.join(",")} } }`, data => data.createComment, args);
    },
  }
}
