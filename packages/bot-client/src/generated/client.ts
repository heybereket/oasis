import BaseClient from "../base-client";
import { Badge, Repo, Comment, Resort, Post, Notification, User } from "./types";

export class Client extends BaseClient {
  // BADGES
  badges = {
    paginateBadges: (limit: number, offset: number) => {
      const selection = this.options.selections?.badges || [];
      return this.fetchGraphQL<Pick<Badge, typeof selection[0]>>(`{ paginateBadges { ${selection.join(",")} } }`, data => data["paginateBadges"], { limit, offset })
    },
    getBadge: (id: string) => {
      const selection = this.options.selections?.badges || [];
      return this.fetchGraphQL<Pick<Badge, typeof selection[0]>>(`{ getBadge { ${selection.join(",")} } }`, data => data["getBadge"], { id })
    },
    giveBadge: (username: string, badgeName: string) => {
      const selection = this.options.selections?.badges || [];
      return this.fetchGraphQL<Pick<Badge, typeof selection[0]>>(`{ giveBadge { ${selection.join(",")} } }`, data => data["giveBadge"], { username, badgeName })
    },
  }
  // COMMENTS
  comments = {
    paginateComments: (limit: number, offset: number) => {
      const selection = this.options.selections?.comments || [];
      return this.fetchGraphQL<Pick<Comment, typeof selection[0]>>(`{ paginateComments { ${selection.join(",")} } }`, data => data["paginateComments"], { limit, offset })
    },
    getComment: (id: string) => {
      const selection = this.options.selections?.comments || [];
      return this.fetchGraphQL<Pick<Comment, typeof selection[0]>>(`{ getComment { ${selection.join(",")} } }`, data => data["getComment"], { id })
    },
  }
  // POSTS
  posts = {
    paginatePosts: (limit: number, offset: number) => {
      const selection = this.options.selections?.posts || [];
      return this.fetchGraphQL<Pick<Post, typeof selection[0]>>(`{ paginatePosts { ${selection.join(",")} } }`, data => data["paginatePosts"], { limit, offset })
    },
    getPost: (id: string) => {
      const selection = this.options.selections?.posts || [];
      return this.fetchGraphQL<Pick<Post, typeof selection[0]>>(`{ getPost { ${selection.join(",")} } }`, data => data["getPost"], { id })
    },
  }
  // REPOS
  repos = {
    paginateRepos: (limit: number, offset: number) => {
      const selection = this.options.selections?.repos || [];
      return this.fetchGraphQL<Pick<Repo, typeof selection[0]>>(`{ paginateRepos { ${selection.join(",")} } }`, data => data["paginateRepos"], { limit, offset })
    },
    getRepo: (id: string) => {
      const selection = this.options.selections?.repos || [];
      return this.fetchGraphQL<Pick<Repo, typeof selection[0]>>(`{ getRepo { ${selection.join(",")} } }`, data => data["getRepo"], { id })
    },
  }
  // RESORTS
  resorts = {
    paginateResorts: (limit: number, offset: number) => {
      const selection = this.options.selections?.resorts || [];
      return this.fetchGraphQL<Pick<Resort, typeof selection[0]>>(`{ paginateResorts { ${selection.join(",")} } }`, data => data["paginateResorts"], { limit, offset })
    },
    getResort: (id: string) => {
      const selection = this.options.selections?.resorts || [];
      return this.fetchGraphQL<Pick<Resort, typeof selection[0]>>(`{ getResort { ${selection.join(",")} } }`, data => data["getResort"], { id })
    },
  }
  // USERS
  users = {
    paginateUsers: (limit: number, offset: number) => {
      const selection = this.options.selections?.users || [];
      return this.fetchGraphQL<Pick<User, typeof selection[0]>>(`{ paginateUsers { ${selection.join(",")} } }`, data => data["paginateUsers"], { limit, offset })
    },
    getUser: (id: string) => {
      const selection = this.options.selections?.users || [];
      return this.fetchGraphQL<Pick<User, typeof selection[0]>>(`{ getUser { ${selection.join(",")} } }`, data => data["getUser"], { id })
    },
  }
}
