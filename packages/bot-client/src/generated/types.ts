import PaginationResponseType from "../pagination-response";


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
export interface Badge {
  id: string;
}

export interface Repo {
  id: string;
  date_added: string;
  owner: User;
}

export interface Comment {
  id: string;
  likes: number;
  dislikes: number;
  post: Post;
  author: User;
}

export interface Resort {
  posts: PaginationResponseType<Post>;
  owner: User;
  members: PaginationResponseType<User>;
}

export interface Post {
  id: string;
  topics: string[];
  author: User;
  likers: PaginationResponseType<User>;
  dislikers: PaginationResponseType<User>;
  comments: PaginationResponseType<User>;
  resort?: Resort;
}

export interface Notification {
  id: string;
  type: NotificationType;
  user: User;
  performer: User;
}

export interface User {
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

type EntityKey = "badges" | "comments" | "posts" | "repos" | "resorts" | "users"

interface EntityKeyMap {
  badges?: Badge;
  repos?: Repo;
  comments?: Comment;
  resorts?: Resort;
  posts?: Post;
  notifications?: Notification;
  users?: User;
}

export type Selections = { [P in EntityKey]?: (keyof EntityKeyMap[P])[] };