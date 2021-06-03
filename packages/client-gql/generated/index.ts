import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Badge = {
  __typename?: 'Badge';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  imagePath: Scalars['String'];
  level: Scalars['Float'];
  name: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
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

export type Mutation = {
  __typename?: 'Mutation';
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
  markNotificationAsRead: Scalars['Boolean'];
  refreshBotToken: Scalars['String'];
  updateProfile: Scalars['Boolean'];
};


export type MutationCreateBotArgs = {
  data: CreateBotInput;
};


export type MutationCreateCommentArgs = {
  data: NewCommentInput;
  postId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  data: NewPostInput;
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

export type NewPostInput = {
  message: Scalars['String'];
  topics: Array<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  performer?: Maybe<User>;
  read: Scalars['Boolean'];
  type: NotificationType;
  user: User;
};

export enum NotificationType {
  Follow = 'Follow',
  Like = 'Like',
  Reply = 'Reply'
}

export type PaginatedCommentFromPost_PostResponse = {
  __typename?: 'PaginatedCommentFromPost_postResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromUser_AuthorResponse = {
  __typename?: 'PaginatedCommentFromUser_authorResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromUser_DislikersResponse = {
  __typename?: 'PaginatedCommentFromUser_dislikersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromUser_LikersResponse = {
  __typename?: 'PaginatedCommentFromUser_likersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedPostFromResort_ResortResponse = {
  __typename?: 'PaginatedPostFromResort_resortResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedPostFromUser_AuthorResponse = {
  __typename?: 'PaginatedPostFromUser_authorResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedPostFromUser_DislikersResponse = {
  __typename?: 'PaginatedPostFromUser_dislikersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedPostFromUser_LikersResponse = {
  __typename?: 'PaginatedPostFromUser_likersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedUserFromComment_DislikedCommentsResponse = {
  __typename?: 'PaginatedUserFromComment_dislikedCommentsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromComment_LikedCommentsResponse = {
  __typename?: 'PaginatedUserFromComment_likedCommentsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromPost_DislikedPostsResponse = {
  __typename?: 'PaginatedUserFromPost_dislikedPostsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromPost_LikedPostsResponse = {
  __typename?: 'PaginatedUserFromPost_likedPostsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromResort_JoinedResortsResponse = {
  __typename?: 'PaginatedUserFromResort_joinedResortsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromUser_BotOwnerResponse = {
  __typename?: 'PaginatedUserFromUser_botOwnerResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromUser_FollowersResponse = {
  __typename?: 'PaginatedUserFromUser_followersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromUser_FollowingResponse = {
  __typename?: 'PaginatedUserFromUser_followingResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
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
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  feedSortPosts: Array<Post>;
  getAvailableUsername: Scalars['String'];
  getBadge: Badge;
  getComment: Comment;
  getNotifications?: Maybe<Array<Notification>>;
  getPost: Post;
  getRepo: Repo;
  getResort: Resort;
  getResortByName?: Maybe<Resort>;
  getUser: User;
  getUserByName?: Maybe<User>;
  paginateBadges: Array<Badge>;
  paginateComments: Array<Comment>;
  paginatePosts: Array<Post>;
  paginateRepos: Array<Repo>;
  paginateResorts: Array<Resort>;
  paginateUsers: Array<User>;
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


export type QueryGetRepoArgs = {
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


export type QueryPaginateReposArgs = {
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

export type Repo = {
  __typename?: 'Repo';
  active: Scalars['Boolean'];
  /** Time when the repo was added (the number of milliseconds passed since Unix epoch 1970-01-01T00:00:00Z) */
  date_added: Scalars['String'];
  desc: Scalars['String'];
  full_name: Scalars['String'];
  github_owner: Scalars['String'];
  id: Scalars['ID'];
  issues: Scalars['Float'];
  language: Scalars['String'];
  name: Scalars['String'];
  owner: User;
  stars: Scalars['Float'];
  url: Scalars['String'];
};

export type Resort = {
  __typename?: 'Resort';
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

export enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  SuperAdmin = 'SuperAdmin'
}

export type UpdateProfileInput = {
  avatar?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  badges?: Maybe<Array<Badge>>;
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
  repos?: Maybe<Array<Repo>>;
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

export type GetPostCommentsQueryVariables = Exact<{
  postId: Scalars['String'];
  commentsOffset: Scalars['Float'];
  commentsLimit: Scalars['Float'];
}>;


export type GetPostCommentsQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
    & { comments: (
      { __typename?: 'PaginatedCommentFromPost_postResponse' }
      & { items: Array<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'content' | 'likes' | 'dislikes' | 'createdAt' | 'lastEdited' | 'isLiked' | 'isDisliked'>
        & { author: (
          { __typename?: 'User' }
          & Pick<User, 'avatar' | 'username' | 'name'>
        ) }
      )> }
    ) }
  ) }
);

export type GetUsersCommentsQueryVariables = Exact<{
  username: Scalars['String'];
  commentsLimit: Scalars['Float'];
  commentsOffset: Scalars['Float'];
}>;


export type GetUsersCommentsQuery = (
  { __typename?: 'Query' }
  & { userOnlyComments?: Maybe<(
    { __typename?: 'User' }
    & { comments: (
      { __typename?: 'PaginatedCommentFromUser_authorResponse' }
      & Pick<PaginatedCommentFromUser_AuthorResponse, 'hasMore' | 'total'>
      & { items: Array<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'content' | 'createdAt' | 'lastEdited' | 'isLiked' | 'isDisliked' | 'likes' | 'dislikes'>
        & { author: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'avatar' | 'username' | 'name'>
        ) }
      )> }
    ) }
  )> }
);

export type LikeDislikeCommentMutationVariables = Exact<{
  like: Scalars['Boolean'];
  dislike: Scalars['Boolean'];
  commentId: Scalars['String'];
}>;


export type LikeDislikeCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likeDislikeComment'>
);

export type MakeCommentMutationVariables = Exact<{
  content: Scalars['String'];
  postId: Scalars['String'];
}>;


export type MakeCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createComment'>
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type GetPostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'createdAt' | 'dislikes' | 'id' | 'lastEdited' | 'likes' | 'message' | 'topics'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'avatar'>
      & { badges?: Maybe<Array<(
        { __typename?: 'Badge' }
        & Pick<Badge, 'description' | 'id' | 'imagePath'>
      )>> }
    ), resort?: Maybe<(
      { __typename?: 'Resort' }
      & Pick<Resort, 'id' | 'description' | 'logo' | 'name'>
    )> }
  ) }
);

export type PaginatePostsQueryVariables = Exact<{
  postsLimit: Scalars['Float'];
  postsOffset: Scalars['Float'];
}>;


export type PaginatePostsQuery = (
  { __typename?: 'Query' }
  & { paginatePosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'createdAt' | 'dislikes' | 'id' | 'lastEdited' | 'likes' | 'message' | 'topics' | 'isLiked' | 'isDisliked'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'username' | 'avatar'>
      & { badges?: Maybe<Array<(
        { __typename?: 'Badge' }
        & Pick<Badge, 'description' | 'id' | 'imagePath'>
      )>> }
    ), resort?: Maybe<(
      { __typename?: 'Resort' }
      & Pick<Resort, 'id' | 'description' | 'logo' | 'name'>
    )>, comments: (
      { __typename?: 'PaginatedCommentFromPost_postResponse' }
      & Pick<PaginatedCommentFromPost_PostResponse, 'total'>
    ) }
  )> }
);

export type LikeDislikePostMutationVariables = Exact<{
  like: Scalars['Boolean'];
  dislike: Scalars['Boolean'];
  postId: Scalars['String'];
}>;


export type LikeDislikePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likeDislike'>
);

export type MakePostMutationVariables = Exact<{
  message: Scalars['String'];
  topics: Array<Scalars['String']> | Scalars['String'];
}>;


export type MakePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPost'>
);

export type FeedSortPostsQueryVariables = Exact<{
  postsLimit: Scalars['Float'];
  postsOffset: Scalars['Float'];
}>;


export type FeedSortPostsQuery = (
  { __typename?: 'Query' }
  & { feedSortPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'createdAt' | 'dislikes' | 'id' | 'lastEdited' | 'likes' | 'message' | 'topics' | 'isLiked' | 'isDisliked'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'username' | 'avatar'>
      & { badges?: Maybe<Array<(
        { __typename?: 'Badge' }
        & Pick<Badge, 'description' | 'id' | 'imagePath'>
      )>> }
    ), resort?: Maybe<(
      { __typename?: 'Resort' }
      & Pick<Resort, 'id' | 'description' | 'logo' | 'name'>
    )>, comments: (
      { __typename?: 'PaginatedCommentFromPost_postResponse' }
      & Pick<PaginatedCommentFromPost_PostResponse, 'total'>
    ) }
  )> }
);

export type GetResortByNameWithMembersQueryVariables = Exact<{
  name: Scalars['String'];
  membersOffset: Scalars['Float'];
  membersLimit: Scalars['Float'];
}>;


export type GetResortByNameWithMembersQuery = (
  { __typename?: 'Query' }
  & { getResortByName?: Maybe<(
    { __typename?: 'Resort' }
    & Pick<Resort, 'id' | 'name' | 'description' | 'banner' | 'logo' | 'category' | 'isJoined'>
    & { members: (
      { __typename?: 'PaginatedUserFromResort_joinedResortsResponse' }
      & Pick<PaginatedUserFromResort_JoinedResortsResponse, 'total' | 'hasMore'>
      & { items: Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'avatar'>
      )> }
    ) }
  )> }
);

export type JoinResortMutationVariables = Exact<{
  resortId: Scalars['String'];
}>;


export type JoinResortMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinResort'>
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'banner' | 'avatar' | 'createdAt' | 'github' | 'twitter' | 'discord' | 'google' | 'bio' | 'username' | 'name' | 'verified' | 'roles'>
  )> }
);

export type GetUserByNameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserByNameQuery = (
  { __typename?: 'Query' }
  & { getUserByName?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'banner' | 'avatar' | 'createdAt' | 'github' | 'twitter' | 'discord' | 'google' | 'bio' | 'username' | 'name' | 'verified'>
    & { badges?: Maybe<Array<(
      { __typename?: 'Badge' }
      & Pick<Badge, 'name' | 'id' | 'imagePath' | 'level' | 'description'>
    )>>, followers: (
      { __typename?: 'PaginatedUserFromUser_followingResponse' }
      & Pick<PaginatedUserFromUser_FollowingResponse, 'total'>
    ), following: (
      { __typename?: 'PaginatedUserFromUser_followersResponse' }
      & Pick<PaginatedUserFromUser_FollowersResponse, 'total'>
    ), posts: (
      { __typename?: 'PaginatedPostFromUser_authorResponse' }
      & Pick<PaginatedPostFromUser_AuthorResponse, 'total'>
    ) }
  )> }
);

export type GetMyUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyUserIdQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateProfileInput;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateProfile'>
);

export type DeleteAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccount'>
);

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followUser'>
);

export type GetUsersPostsQueryVariables = Exact<{
  username: Scalars['String'];
  postsLimit: Scalars['Float'];
  postsOffset: Scalars['Float'];
}>;


export type GetUsersPostsQuery = (
  { __typename?: 'Query' }
  & { userOnlyPosts?: Maybe<(
    { __typename?: 'User' }
    & { posts: (
      { __typename?: 'PaginatedPostFromUser_authorResponse' }
      & Pick<PaginatedPostFromUser_AuthorResponse, 'hasMore' | 'total'>
      & { items: Array<(
        { __typename?: 'Post' }
        & Pick<Post, 'id' | 'message' | 'createdAt' | 'lastEdited' | 'topics' | 'isLiked' | 'isDisliked' | 'likes' | 'dislikes'>
        & { author: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'avatar' | 'username' | 'name'>
        ), comments: (
          { __typename?: 'PaginatedCommentFromPost_postResponse' }
          & Pick<PaginatedCommentFromPost_PostResponse, 'total'>
        ) }
      )> }
    ) }
  )> }
);

export type GetUsersLikedPostsQueryVariables = Exact<{
  username: Scalars['String'];
  postsLimit: Scalars['Float'];
  postsOffset: Scalars['Float'];
}>;


export type GetUsersLikedPostsQuery = (
  { __typename?: 'Query' }
  & { getUserByName?: Maybe<(
    { __typename?: 'User' }
    & { likedPosts: (
      { __typename?: 'PaginatedPostFromUser_likersResponse' }
      & Pick<PaginatedPostFromUser_LikersResponse, 'hasMore' | 'total'>
      & { items: Array<(
        { __typename?: 'Post' }
        & Pick<Post, 'id' | 'message' | 'createdAt' | 'lastEdited' | 'topics' | 'isLiked' | 'isDisliked' | 'likes' | 'dislikes'>
        & { author: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'avatar' | 'username' | 'name'>
        ), comments: (
          { __typename?: 'PaginatedCommentFromPost_postResponse' }
          & Pick<PaginatedCommentFromPost_PostResponse, 'total'>
        ) }
      )> }
    ) }
  )> }
);


export const GetPostCommentsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}}]}}]}}]}}]}}]};

/**
 * __useGetPostCommentsQuery__
 *
 * To run a query within a React component, call `useGetPostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      commentsOffset: // value for 'commentsOffset'
 *      commentsLimit: // value for 'commentsLimit'
 *   },
 * });
 */
export function useGetPostCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(GetPostCommentsDocument, options);
      }
export function useGetPostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostCommentsQuery, GetPostCommentsQueryVariables>(GetPostCommentsDocument, options);
        }
export type GetPostCommentsQueryHookResult = ReturnType<typeof useGetPostCommentsQuery>;
export type GetPostCommentsLazyQueryHookResult = ReturnType<typeof useGetPostCommentsLazyQuery>;
export type GetPostCommentsQueryResult = Apollo.QueryResult<GetPostCommentsQuery, GetPostCommentsQueryVariables>;
export const GetUsersCommentsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"userOnlyComments"},"name":{"kind":"Name","value":"getUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]};

/**
 * __useGetUsersCommentsQuery__
 *
 * To run a query within a React component, call `useGetUsersCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersCommentsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      commentsLimit: // value for 'commentsLimit'
 *      commentsOffset: // value for 'commentsOffset'
 *   },
 * });
 */
export function useGetUsersCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersCommentsQuery, GetUsersCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersCommentsQuery, GetUsersCommentsQueryVariables>(GetUsersCommentsDocument, options);
      }
export function useGetUsersCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersCommentsQuery, GetUsersCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersCommentsQuery, GetUsersCommentsQueryVariables>(GetUsersCommentsDocument, options);
        }
export type GetUsersCommentsQueryHookResult = ReturnType<typeof useGetUsersCommentsQuery>;
export type GetUsersCommentsLazyQueryHookResult = ReturnType<typeof useGetUsersCommentsLazyQuery>;
export type GetUsersCommentsQueryResult = Apollo.QueryResult<GetUsersCommentsQuery, GetUsersCommentsQueryVariables>;
export const LikeDislikeCommentDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeDislikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"like"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dislike"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeDislikeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"like"}}},{"kind":"Argument","name":{"kind":"Name","value":"dislike"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dislike"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]};
export type LikeDislikeCommentMutationFn = Apollo.MutationFunction<LikeDislikeCommentMutation, LikeDislikeCommentMutationVariables>;

/**
 * __useLikeDislikeCommentMutation__
 *
 * To run a mutation, you first call `useLikeDislikeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeDislikeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeDislikeCommentMutation, { data, loading, error }] = useLikeDislikeCommentMutation({
 *   variables: {
 *      like: // value for 'like'
 *      dislike: // value for 'dislike'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useLikeDislikeCommentMutation(baseOptions?: Apollo.MutationHookOptions<LikeDislikeCommentMutation, LikeDislikeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeDislikeCommentMutation, LikeDislikeCommentMutationVariables>(LikeDislikeCommentDocument, options);
      }
export type LikeDislikeCommentMutationHookResult = ReturnType<typeof useLikeDislikeCommentMutation>;
export type LikeDislikeCommentMutationResult = Apollo.MutationResult<LikeDislikeCommentMutation>;
export type LikeDislikeCommentMutationOptions = Apollo.BaseMutationOptions<LikeDislikeCommentMutation, LikeDislikeCommentMutationVariables>;
export const MakeCommentDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]};
export type MakeCommentMutationFn = Apollo.MutationFunction<MakeCommentMutation, MakeCommentMutationVariables>;

/**
 * __useMakeCommentMutation__
 *
 * To run a mutation, you first call `useMakeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeCommentMutation, { data, loading, error }] = useMakeCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useMakeCommentMutation(baseOptions?: Apollo.MutationHookOptions<MakeCommentMutation, MakeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeCommentMutation, MakeCommentMutationVariables>(MakeCommentDocument, options);
      }
export type MakeCommentMutationHookResult = ReturnType<typeof useMakeCommentMutation>;
export type MakeCommentMutationResult = Apollo.MutationResult<MakeCommentMutation>;
export type MakeCommentMutationOptions = Apollo.BaseMutationOptions<MakeCommentMutation, MakeCommentMutationVariables>;
export const DeletePostDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]};
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const GetPostDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"resort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"}}]}}]}}]};

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const PaginatePostsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatePosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatePosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"resort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}}]}}]}}]};

/**
 * __usePaginatePostsQuery__
 *
 * To run a query within a React component, call `usePaginatePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaginatePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaginatePostsQuery({
 *   variables: {
 *      postsLimit: // value for 'postsLimit'
 *      postsOffset: // value for 'postsOffset'
 *   },
 * });
 */
export function usePaginatePostsQuery(baseOptions: Apollo.QueryHookOptions<PaginatePostsQuery, PaginatePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaginatePostsQuery, PaginatePostsQueryVariables>(PaginatePostsDocument, options);
      }
export function usePaginatePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatePostsQuery, PaginatePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaginatePostsQuery, PaginatePostsQueryVariables>(PaginatePostsDocument, options);
        }
export type PaginatePostsQueryHookResult = ReturnType<typeof usePaginatePostsQuery>;
export type PaginatePostsLazyQueryHookResult = ReturnType<typeof usePaginatePostsLazyQuery>;
export type PaginatePostsQueryResult = Apollo.QueryResult<PaginatePostsQuery, PaginatePostsQueryVariables>;
export const LikeDislikePostDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeDislikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"like"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dislike"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeDislike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"like"}}},{"kind":"Argument","name":{"kind":"Name","value":"dislike"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dislike"}}},{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]};
export type LikeDislikePostMutationFn = Apollo.MutationFunction<LikeDislikePostMutation, LikeDislikePostMutationVariables>;

/**
 * __useLikeDislikePostMutation__
 *
 * To run a mutation, you first call `useLikeDislikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeDislikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeDislikePostMutation, { data, loading, error }] = useLikeDislikePostMutation({
 *   variables: {
 *      like: // value for 'like'
 *      dislike: // value for 'dislike'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikeDislikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikeDislikePostMutation, LikeDislikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeDislikePostMutation, LikeDislikePostMutationVariables>(LikeDislikePostDocument, options);
      }
export type LikeDislikePostMutationHookResult = ReturnType<typeof useLikeDislikePostMutation>;
export type LikeDislikePostMutationResult = Apollo.MutationResult<LikeDislikePostMutation>;
export type LikeDislikePostMutationOptions = Apollo.BaseMutationOptions<LikeDislikePostMutation, LikeDislikePostMutationVariables>;
export const MakePostDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topics"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"topics"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topics"}}}]}}]}]}}]};
export type MakePostMutationFn = Apollo.MutationFunction<MakePostMutation, MakePostMutationVariables>;

/**
 * __useMakePostMutation__
 *
 * To run a mutation, you first call `useMakePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makePostMutation, { data, loading, error }] = useMakePostMutation({
 *   variables: {
 *      message: // value for 'message'
 *      topics: // value for 'topics'
 *   },
 * });
 */
export function useMakePostMutation(baseOptions?: Apollo.MutationHookOptions<MakePostMutation, MakePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakePostMutation, MakePostMutationVariables>(MakePostDocument, options);
      }
export type MakePostMutationHookResult = ReturnType<typeof useMakePostMutation>;
export type MakePostMutationResult = Apollo.MutationResult<MakePostMutation>;
export type MakePostMutationOptions = Apollo.BaseMutationOptions<MakePostMutation, MakePostMutationVariables>;
export const FeedSortPostsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FeedSortPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedSortPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"resort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}}]}}]}}]};

/**
 * __useFeedSortPostsQuery__
 *
 * To run a query within a React component, call `useFeedSortPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedSortPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedSortPostsQuery({
 *   variables: {
 *      postsLimit: // value for 'postsLimit'
 *      postsOffset: // value for 'postsOffset'
 *   },
 * });
 */
export function useFeedSortPostsQuery(baseOptions: Apollo.QueryHookOptions<FeedSortPostsQuery, FeedSortPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedSortPostsQuery, FeedSortPostsQueryVariables>(FeedSortPostsDocument, options);
      }
export function useFeedSortPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedSortPostsQuery, FeedSortPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedSortPostsQuery, FeedSortPostsQueryVariables>(FeedSortPostsDocument, options);
        }
export type FeedSortPostsQueryHookResult = ReturnType<typeof useFeedSortPostsQuery>;
export type FeedSortPostsLazyQueryHookResult = ReturnType<typeof useFeedSortPostsLazyQuery>;
export type FeedSortPostsQueryResult = Apollo.QueryResult<FeedSortPostsQuery, FeedSortPostsQueryVariables>;
export const GetResortByNameWithMembersDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResortByNameWithMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getResortByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isJoined"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]};

/**
 * __useGetResortByNameWithMembersQuery__
 *
 * To run a query within a React component, call `useGetResortByNameWithMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResortByNameWithMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResortByNameWithMembersQuery({
 *   variables: {
 *      name: // value for 'name'
 *      membersOffset: // value for 'membersOffset'
 *      membersLimit: // value for 'membersLimit'
 *   },
 * });
 */
export function useGetResortByNameWithMembersQuery(baseOptions: Apollo.QueryHookOptions<GetResortByNameWithMembersQuery, GetResortByNameWithMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResortByNameWithMembersQuery, GetResortByNameWithMembersQueryVariables>(GetResortByNameWithMembersDocument, options);
      }
export function useGetResortByNameWithMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResortByNameWithMembersQuery, GetResortByNameWithMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResortByNameWithMembersQuery, GetResortByNameWithMembersQueryVariables>(GetResortByNameWithMembersDocument, options);
        }
export type GetResortByNameWithMembersQueryHookResult = ReturnType<typeof useGetResortByNameWithMembersQuery>;
export type GetResortByNameWithMembersLazyQueryHookResult = ReturnType<typeof useGetResortByNameWithMembersLazyQuery>;
export type GetResortByNameWithMembersQueryResult = Apollo.QueryResult<GetResortByNameWithMembersQuery, GetResortByNameWithMembersQueryVariables>;
export const JoinResortDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinResort"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resortId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinResort"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resortId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resortId"}}}]}]}}]};
export type JoinResortMutationFn = Apollo.MutationFunction<JoinResortMutation, JoinResortMutationVariables>;

/**
 * __useJoinResortMutation__
 *
 * To run a mutation, you first call `useJoinResortMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinResortMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinResortMutation, { data, loading, error }] = useJoinResortMutation({
 *   variables: {
 *      resortId: // value for 'resortId'
 *   },
 * });
 */
export function useJoinResortMutation(baseOptions?: Apollo.MutationHookOptions<JoinResortMutation, JoinResortMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinResortMutation, JoinResortMutationVariables>(JoinResortDocument, options);
      }
export type JoinResortMutationHookResult = ReturnType<typeof useJoinResortMutation>;
export type JoinResortMutationResult = Apollo.MutationResult<JoinResortMutation>;
export type JoinResortMutationOptions = Apollo.BaseMutationOptions<JoinResortMutation, JoinResortMutationVariables>;
export const GetCurrentUserDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"google"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]};

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserByNameDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"google"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]};

/**
 * __useGetUserByNameQuery__
 *
 * To run a query within a React component, call `useGetUserByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByNameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserByNameQuery(baseOptions: Apollo.QueryHookOptions<GetUserByNameQuery, GetUserByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByNameQuery, GetUserByNameQueryVariables>(GetUserByNameDocument, options);
      }
export function useGetUserByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByNameQuery, GetUserByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByNameQuery, GetUserByNameQueryVariables>(GetUserByNameDocument, options);
        }
export type GetUserByNameQueryHookResult = ReturnType<typeof useGetUserByNameQuery>;
export type GetUserByNameLazyQueryHookResult = ReturnType<typeof useGetUserByNameLazyQuery>;
export type GetUserByNameQueryResult = Apollo.QueryResult<GetUserByNameQuery, GetUserByNameQueryVariables>;
export const GetMyUserIdDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]};

/**
 * __useGetMyUserIdQuery__
 *
 * To run a query within a React component, call `useGetMyUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetMyUserIdQuery, GetMyUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyUserIdQuery, GetMyUserIdQueryVariables>(GetMyUserIdDocument, options);
      }
export function useGetMyUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyUserIdQuery, GetMyUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyUserIdQuery, GetMyUserIdQueryVariables>(GetMyUserIdDocument, options);
        }
export type GetMyUserIdQueryHookResult = ReturnType<typeof useGetMyUserIdQuery>;
export type GetMyUserIdLazyQueryHookResult = ReturnType<typeof useGetMyUserIdLazyQuery>;
export type GetMyUserIdQueryResult = Apollo.QueryResult<GetMyUserIdQuery, GetMyUserIdQueryVariables>;
export const UpdateProfileDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]};
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const DeleteAccountDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"}}]}}]};
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const FollowUserDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]};
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const GetUsersPostsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"userOnlyPosts"},"name":{"kind":"Name","value":"getUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]};

/**
 * __useGetUsersPostsQuery__
 *
 * To run a query within a React component, call `useGetUsersPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersPostsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      postsLimit: // value for 'postsLimit'
 *      postsOffset: // value for 'postsOffset'
 *   },
 * });
 */
export function useGetUsersPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersPostsQuery, GetUsersPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersPostsQuery, GetUsersPostsQueryVariables>(GetUsersPostsDocument, options);
      }
export function useGetUsersPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersPostsQuery, GetUsersPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersPostsQuery, GetUsersPostsQueryVariables>(GetUsersPostsDocument, options);
        }
export type GetUsersPostsQueryHookResult = ReturnType<typeof useGetUsersPostsQuery>;
export type GetUsersPostsLazyQueryHookResult = ReturnType<typeof useGetUsersPostsLazyQuery>;
export type GetUsersPostsQueryResult = Apollo.QueryResult<GetUsersPostsQuery, GetUsersPostsQueryVariables>;
export const GetUsersLikedPostsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersLikedPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likedPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]};

/**
 * __useGetUsersLikedPostsQuery__
 *
 * To run a query within a React component, call `useGetUsersLikedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersLikedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersLikedPostsQuery({
 *   variables: {
 *      username: // value for 'username'
 *      postsLimit: // value for 'postsLimit'
 *      postsOffset: // value for 'postsOffset'
 *   },
 * });
 */
export function useGetUsersLikedPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersLikedPostsQuery, GetUsersLikedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersLikedPostsQuery, GetUsersLikedPostsQueryVariables>(GetUsersLikedPostsDocument, options);
      }
export function useGetUsersLikedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersLikedPostsQuery, GetUsersLikedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersLikedPostsQuery, GetUsersLikedPostsQueryVariables>(GetUsersLikedPostsDocument, options);
        }
export type GetUsersLikedPostsQueryHookResult = ReturnType<typeof useGetUsersLikedPostsQuery>;
export type GetUsersLikedPostsLazyQueryHookResult = ReturnType<typeof useGetUsersLikedPostsLazyQuery>;
export type GetUsersLikedPostsQueryResult = Apollo.QueryResult<GetUsersLikedPostsQuery, GetUsersLikedPostsQueryVariables>;

export const GetPostComments: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}}]}}]}}]}}]}}]};
export const GetUsersComments: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"userOnlyComments"},"name":{"kind":"Name","value":"getUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]};
export const LikeDislikeComment: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeDislikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"like"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dislike"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeDislikeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"like"}}},{"kind":"Argument","name":{"kind":"Name","value":"dislike"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dislike"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}]}]}}]};
export const MakeComment: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]};
export const DeletePost: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]};
export const GetPost: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"resort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"}}]}}]}}]};
export const PaginatePosts: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatePosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatePosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"resort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}}]}}]}}]};
export const LikeDislikePost: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeDislikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"like"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dislike"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeDislike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"like"}}},{"kind":"Argument","name":{"kind":"Name","value":"dislike"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dislike"}}},{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]};
export const MakePost: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topics"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"topics"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topics"}}}]}}]}]}}]};
export const FeedSortPosts: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FeedSortPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedSortPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"resort"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}}]}}]}}]};
export const GetResortByNameWithMembers: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetResortByNameWithMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"membersLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getResortByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isJoined"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"membersLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]}}]};
export const JoinResort: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JoinResort"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resortId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinResort"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resortId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resortId"}}}]}]}}]};
export const GetCurrentUser: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"google"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]};
export const GetUserByName: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"github"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"discord"}},{"kind":"Field","name":{"kind":"Name","value":"google"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"badges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"following"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]};
export const GetMyUserId: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]};
export const UpdateProfile: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]};
export const DeleteAccount: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAccount"}}]}}]};
export const FollowUser: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]};
export const GetUsersPosts: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"userOnlyPosts"},"name":{"kind":"Name","value":"getUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]};
export const GetUsersLikedPosts: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUsersLikedPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likedPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsOffset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postsLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastEdited"}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isDisliked"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"dislikes"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"IntValue","value":"0"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]};