export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Badge = {
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imagePath: Scalars['String'];
  level: Scalars['Float'];
  name: Scalars['String'];
};

export type Comment = {
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  dislikers: PaginatedUserFromComment_DislikedCommentsResponse;
  dislikes: Scalars['Float'];
  id: Scalars['ID'];
  isDisliked: Scalars['Boolean'];
  isLiked: Scalars['Boolean'];
  lastEdited?: Maybe<Scalars['String']>;
  likers: PaginatedUserFromComment_LikedCommentsResponse;
  likes: Scalars['Float'];
  post: Post;
};

export type CommentDislikersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type CommentLikersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type CreateBotInput = {
  name: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePostInput = {
  message: Scalars['String'];
  topics: Array<Scalars['String']>;
};

export type CreateResortInput = {
  banner: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  logo: Scalars['String'];
  name: Scalars['String'];
};

export type EditCommentInput = {
  content: Scalars['String'];
};

export type EditPostInput = {
  message?: Maybe<Scalars['String']>;
  topics?: Maybe<Array<Scalars['String']>>;
};

export type MakeBadgeInput = {
  description: Scalars['String'];
  imagePath: Scalars['String'];
  level: Scalars['Float'];
  name: Scalars['String'];
};

export type MakeReportInput = {
  information?: Maybe<Scalars['String']>;
  type: ReportType;
};

export type Mutation = {
  banUser: Scalars['Boolean'];
  createBot: Scalars['String'];
  createComment: Scalars['Boolean'];
  createPost: Scalars['Boolean'];
  createResort: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editComment: Scalars['Boolean'];
  editPost: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  giveBadge: Scalars['Boolean'];
  joinResort?: Maybe<Scalars['Boolean']>;
  likeDislike: Scalars['Boolean'];
  likeDislikeComment: Scalars['Boolean'];
  makeAdmin: Scalars['Boolean'];
  makeBadge: Scalars['Boolean'];
  makeReport: Scalars['Boolean'];
  markAsResolved: Scalars['Boolean'];
  markNotificationAsRead: Scalars['Boolean'];
  refreshBotToken: Scalars['String'];
  updateProfile: Scalars['Boolean'];
};

export type MutationBanUserArgs = {
  UserId: Scalars['String'];
  endDate: Scalars['String'];
};

export type MutationCreateBotArgs = {
  data: CreateBotInput;
};

export type MutationCreateCommentArgs = {
  data: NewCommentInput;
  postId: Scalars['String'];
};

export type MutationCreatePostArgs = {
  data: CreatePostInput;
};

export type MutationCreateResortArgs = {
  data: CreateResortInput;
};

export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};

export type MutationEditCommentArgs = {
  commentId: Scalars['String'];
  data: EditCommentInput;
};

export type MutationEditPostArgs = {
  data: EditPostInput;
  postId: Scalars['String'];
};

export type MutationFollowUserArgs = {
  userId: Scalars['String'];
};

export type MutationGiveBadgeArgs = {
  badgeName: Scalars['String'];
  username: Scalars['String'];
};

export type MutationJoinResortArgs = {
  resortId: Scalars['String'];
};

export type MutationLikeDislikeArgs = {
  dislike: Scalars['Boolean'];
  like: Scalars['Boolean'];
  postId: Scalars['String'];
};

export type MutationLikeDislikeCommentArgs = {
  commentId: Scalars['String'];
  dislike: Scalars['Boolean'];
  like: Scalars['Boolean'];
};

export type MutationMakeAdminArgs = {
  roles: Array<Role>;
  user: Scalars['String'];
};

export type MutationMakeBadgeArgs = {
  data: MakeBadgeInput;
};

export type MutationMakeReportArgs = {
  data: MakeReportInput;
  reporteeData: ReportedEntityInput;
};

export type MutationMarkAsResolvedArgs = {
  reportId: Scalars['String'];
  resolved: Scalars['Boolean'];
};

export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['String'];
};

export type MutationRefreshBotTokenArgs = {
  botId: Scalars['String'];
};

export type MutationUpdateProfileArgs = {
  data: UpdateProfileInput;
};

export type NewCommentInput = {
  content: Scalars['String'];
};

export type Notification = {
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  performer?: Maybe<User>;
  read: Scalars['Boolean'];
  type: NotificationType;
  user: User;
};

export const enum NotificationType {
  Follow = 'Follow',
  Like = 'Like',
  Reply = 'Reply',
}

export type PaginatedCommentFromPost_PostResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromUser_AuthorResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromUser_DislikersResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromUser_LikersResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedPostFromResort_ResortResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedPostFromUser_AuthorResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedPostFromUser_DislikersResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedPostFromUser_LikersResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedUserFromComment_DislikedCommentsResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromComment_LikedCommentsResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromPost_DislikedPostsResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromPost_LikedPostsResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromResort_JoinedResortsResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromUser_BotOwnerResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromUser_FollowersResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromUser_FollowingResponse = {
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type Post = {
  author: User;
  comments: PaginatedCommentFromPost_PostResponse;
  createdAt: Scalars['String'];
  dislikers: PaginatedUserFromPost_DislikedPostsResponse;
  dislikes: Scalars['Float'];
  id: Scalars['ID'];
  isDisliked: Scalars['Boolean'];
  isLiked: Scalars['Boolean'];
  lastEdited?: Maybe<Scalars['String']>;
  likers: PaginatedUserFromPost_LikedPostsResponse;
  likes: Scalars['Float'];
  message: Scalars['String'];
  resort?: Maybe<Resort>;
  topics: Array<Scalars['String']>;
};

export type PostCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type PostDislikersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type PostLikersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type Query = {
  currentUser?: Maybe<User>;
  feedSortPosts: Array<Post>;
  getAvailableUsername: Scalars['String'];
  getBadge: Badge;
  getComment: Comment;
  getNotifications?: Maybe<Array<Notification>>;
  getPost: Post;
  getQueue: Array<Report>;
  getResort: Resort;
  getResortByName?: Maybe<Resort>;
  getUser: User;
  getUserByName?: Maybe<User>;
  paginateBadges: Array<Badge>;
  paginateComments: Array<Comment>;
  paginatePosts: Array<Post>;
  paginateResorts: Array<Resort>;
  paginateUsers: Array<User>;
  search: Array<SearchResult>;
};

export type QueryFeedSortPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type QueryGetAvailableUsernameArgs = {
  username: Scalars['String'];
};

export type QueryGetBadgeArgs = {
  id: Scalars['String'];
};

export type QueryGetCommentArgs = {
  id: Scalars['String'];
};

export type QueryGetPostArgs = {
  id: Scalars['String'];
};

export type QueryGetResortArgs = {
  id: Scalars['String'];
};

export type QueryGetResortByNameArgs = {
  name: Scalars['String'];
};

export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type QueryGetUserByNameArgs = {
  username: Scalars['String'];
};

export type QueryPaginateBadgesArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type QueryPaginateCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type QueryPaginatePostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type QueryPaginateResortsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type QueryPaginateUsersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type QuerySearchArgs = {
  limit: Scalars['Float'];
  searchQuery: Scalars['String'];
};

export type Report = {
  comment?: Maybe<Comment>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  information?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  reporter: User;
  resolved: Scalars['Boolean'];
  resort?: Maybe<Resort>;
  type: ReportType;
  user?: Maybe<User>;
};

export const enum ReportType {
  InappropriateContent = 'InappropriateContent',
}

export type ReportedEntityInput = {
  commentId?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
  resortId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type Resort = {
  banner: Scalars['String'];
  category: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['String'];
  isJoined: Scalars['Boolean'];
  logo: Scalars['String'];
  members: PaginatedUserFromResort_JoinedResortsResponse;
  name: Scalars['String'];
  owner: User;
  posts: PaginatedPostFromResort_ResortResponse;
};

export type ResortMembersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type ResortPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export const enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  SuperAdmin = 'SuperAdmin',
}

export type SearchResult = Post | Resort | User;

export type UpdateProfileInput = {
  avatar?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  avatar: Scalars['String'];
  badges?: Maybe<Array<Badge>>;
  banExiration?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  botOwner?: Maybe<User>;
  bots: PaginatedUserFromUser_BotOwnerResponse;
  comments: PaginatedCommentFromUser_AuthorResponse;
  createdAt: Scalars['String'];
  discord?: Maybe<Scalars['String']>;
  dislikedComments: PaginatedCommentFromUser_DislikersResponse;
  dislikedPosts: PaginatedPostFromUser_DislikersResponse;
  followers: PaginatedUserFromUser_FollowingResponse;
  following: PaginatedUserFromUser_FollowersResponse;
  github?: Maybe<Scalars['String']>;
  google?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isBot?: Maybe<Scalars['Boolean']>;
  likedComments: PaginatedCommentFromUser_LikersResponse;
  likedPosts: PaginatedPostFromUser_LikersResponse;
  name?: Maybe<Scalars['String']>;
  ownedResorts?: Maybe<Array<Resort>>;
  posts: PaginatedPostFromUser_AuthorResponse;
  roles: Array<Role>;
  twitter?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};

export type UserBotsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type UserCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type UserDislikedCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type UserDislikedPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type UserFollowersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type UserFollowingArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type UserLikedCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type UserLikedPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type UserPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};
