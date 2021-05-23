import BaseClient from "./base-client";
import PaginationResponseType from "./pagination-response";


enum Role {
  SuperAdmin = 'SUPERADMIN',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
}



enum NotificationType {
  Follow = 'FOLLOW',
  Like = 'LIKE',
  Reply = 'REPLY',
}
interface Badge {
  id: string;
}

interface Repo {
  id: string;
  date_added: string;
  owner: User;
}

interface Comment {
  id: string;
  likes: number;
  dislikes: number;
  post: Post;
  author: User;
}

interface Resort {
  posts: PaginationResponseType<Post>;
  owner: User;
  members: PaginationResponseType<User>;
}

interface Post {
  id: string;
  topics: string[];
  author: User;
  likers: PaginationResponseType<User>;
  dislikers: PaginationResponseType<User>;
  comments: PaginationResponseType<User>;
  resort?: Resort;
}

interface Notification {
  id: string;
  type: NotificationType;
  user: User;
  performer: User;
}

interface User {
  id: string;
  roles: Role[];
  repos: Repo[];
  posts: PaginationResponseType<Post>;
  likedPosts: PaginationResponseType<Post>;
  dislikedPosts: PaginationResponseType<Post>;
  ownedResorts: Resort[];
  comments: PaginationResponseType<Comment>;
  badges: Badge[];
  botOwner?: User;
  bots: PaginationResponseType<User>;
  following: PaginationResponseType<User>;
  followers: PaginationResponseType<User>;
}

export class Client extends BaseClient {
// BADGES
badges = {
 paginateBadges: () => {
   return this.fetchGraphQL(`{ paginateBadges { ${this.getSelection("paginateBadges")} } }`, data => data["paginateBadges"])
 },
 getBadge: () => {
   return this.fetchGraphQL(`{ getBadge { ${this.getSelection("getBadge")} } }`, data => data["getBadge"])
 },
 giveBadge: () => {
   return this.fetchGraphQL(`{ giveBadge { ${this.getSelection("giveBadge")} } }`, data => data["giveBadge"])
 },
}
// COMMENTS
comments = {
 paginateComments: () => {
   return this.fetchGraphQL(`{ paginateComments { ${this.getSelection("paginateComments")} } }`, data => data["paginateComments"])
 },
 getComment: () => {
   return this.fetchGraphQL(`{ getComment { ${this.getSelection("getComment")} } }`, data => data["getComment"])
 },
}
// POSTS
posts = {
 paginatePosts: () => {
   return this.fetchGraphQL(`{ paginatePosts { ${this.getSelection("paginatePosts")} } }`, data => data["paginatePosts"])
 },
 getPost: () => {
   return this.fetchGraphQL(`{ getPost { ${this.getSelection("getPost")} } }`, data => data["getPost"])
 },
}
// REPOS
repos = {
 paginateRepos: () => {
   return this.fetchGraphQL(`{ paginateRepos { ${this.getSelection("paginateRepos")} } }`, data => data["paginateRepos"])
 },
 getRepo: () => {
   return this.fetchGraphQL(`{ getRepo { ${this.getSelection("getRepo")} } }`, data => data["getRepo"])
 },
}
// RESORTS
resorts = {
 paginateResorts: () => {
   return this.fetchGraphQL(`{ paginateResorts { ${this.getSelection("paginateResorts")} } }`, data => data["paginateResorts"])
 },
 getResort: () => {
   return this.fetchGraphQL(`{ getResort { ${this.getSelection("getResort")} } }`, data => data["getResort"])
 },
}
// USERS
users = {
 paginateUsers: () => {
   return this.fetchGraphQL(`{ paginateUsers { ${this.getSelection("paginateUsers")} } }`, data => data["paginateUsers"])
 },
 getUser: () => {
   return this.fetchGraphQL(`{ getUser { ${this.getSelection("getUser")} } }`, data => data["getUser"])
 },
}
}
