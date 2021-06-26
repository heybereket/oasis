export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = {
  __typename?: 'Answer';
  author: User;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  downvoters: PaginatedUserFromAnswer_DownvotedAnswersResponse;
  downvotes: Scalars['Float'];
  id: Scalars['ID'];
  isDownvoted: Scalars['Boolean'];
  isUpvoted: Scalars['Boolean'];
  lastEdited?: Maybe<Scalars['String']>;
  question: Question;
  upvoters: PaginatedUserFromAnswer_UpvotedAnswersResponse;
  upvotes: Scalars['Float'];
};


export type AnswerDownvotersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type AnswerUpvotersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
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
  downvoters: PaginatedUserFromComment_DownvotedCommentsResponse;
  downvotes: Scalars['Float'];
  id: Scalars['ID'];
  isDownvoted: Scalars['Boolean'];
  isUpvoted: Scalars['Boolean'];
  lastEdited?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  question?: Maybe<Question>;
  upvoters: PaginatedUserFromComment_UpvotedCommentsResponse;
  upvotes: Scalars['Float'];
};


export type CommentDownvotersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type CommentUpvotersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};

export type CreateBotInput = {
  name: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePostInput = {
  imageName?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  topics: Array<Scalars['String']>;
};

export type CreateQuestionInput = {
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

export type EditAnswerInput = {
  content: Scalars['String'];
};

export type EditCommentInput = {
  content: Scalars['String'];
};

export type EditPostInput = {
  message?: Maybe<Scalars['String']>;
  topics?: Maybe<Array<Scalars['String']>>;
};

export type EditQuestionInput = {
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
  __typename?: 'Mutation';
  banUser: Scalars['Boolean'];
  createAnswer: Scalars['Boolean'];
  createBot: Scalars['String'];
  createComment: Scalars['Boolean'];
  createPost: Scalars['Boolean'];
  createQuestion: Scalars['Boolean'];
  createResort: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  deleteQuestion: Scalars['Boolean'];
  editAnswer: Scalars['Boolean'];
  editComment: Scalars['Boolean'];
  editPost: Scalars['Boolean'];
  editQuestion: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  giveBadge: Scalars['Boolean'];
  joinResort?: Maybe<Scalars['Boolean']>;
  makeAdmin: Scalars['Boolean'];
  makeBadge: Scalars['Boolean'];
  makeReport: Scalars['Boolean'];
  markAsResolved: Scalars['Boolean'];
  markNotificationAsRead: Scalars['Boolean'];
  refreshBotToken: Scalars['String'];
  updateProfile: Scalars['Boolean'];
  upvoteDownvote: Scalars['Boolean'];
  upvoteDownvoteAnswer: Scalars['Boolean'];
  upvoteDownvoteComment: Scalars['Boolean'];
};


export type MutationBanUserArgs = {
  UserId: Scalars['String'];
  endDate: Scalars['String'];
};


export type MutationCreateAnswerArgs = {
  data: NewAnswerInput;
  questionId: Scalars['String'];
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


export type MutationCreateQuestionArgs = {
  data: CreateQuestionInput;
};


export type MutationCreateResortArgs = {
  data: CreateResortInput;
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['String'];
};


export type MutationEditAnswerArgs = {
  answerId: Scalars['String'];
  data: EditAnswerInput;
};


export type MutationEditCommentArgs = {
  commentId: Scalars['String'];
  data: EditCommentInput;
};


export type MutationEditPostArgs = {
  data: EditPostInput;
  postId: Scalars['String'];
};


export type MutationEditQuestionArgs = {
  data: EditQuestionInput;
  questionId: Scalars['String'];
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


export type MutationUpvoteDownvoteArgs = {
  downvote: Scalars['Boolean'];
  postId: Scalars['String'];
  upvote: Scalars['Boolean'];
};


export type MutationUpvoteDownvoteAnswerArgs = {
  answerId: Scalars['String'];
  downvote: Scalars['Boolean'];
  upvote: Scalars['Boolean'];
};


export type MutationUpvoteDownvoteCommentArgs = {
  commentId: Scalars['String'];
  downvote: Scalars['Boolean'];
  upvote: Scalars['Boolean'];
};

export type NewAnswerInput = {
  content: Scalars['String'];
};

export type NewCommentInput = {
  content: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  performer: User;
  read: Scalars['Boolean'];
  type: NotificationType;
  user: User;
};

export const enum NotificationType {
  Comment = 'Comment',
  Follow = 'Follow',
  ReplyComment = 'ReplyComment',
  UpvoteComment = 'UpvoteComment',
  UpvotePost = 'UpvotePost'
};

export type PaginatedAnswerFromQuestion_AuthorResponse = {
  __typename?: 'PaginatedAnswerFromQuestion_authorResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Answer>;
  total: Scalars['Float'];
};

export type PaginatedAnswerFromQuestion_QuestionResponse = {
  __typename?: 'PaginatedAnswerFromQuestion_questionResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Answer>;
  total: Scalars['Float'];
};

export type PaginatedAnswerFromUser_AuthorResponse = {
  __typename?: 'PaginatedAnswerFromUser_authorResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Answer>;
  total: Scalars['Float'];
};

export type PaginatedAnswerFromUser_DownvotersResponse = {
  __typename?: 'PaginatedAnswerFromUser_downvotersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Answer>;
  total: Scalars['Float'];
};

export type PaginatedAnswerFromUser_UpvotersResponse = {
  __typename?: 'PaginatedAnswerFromUser_upvotersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Answer>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromPost_PostResponse = {
  __typename?: 'PaginatedCommentFromPost_postResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromQuestion_QuestionResponse = {
  __typename?: 'PaginatedCommentFromQuestion_questionResponse';
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

export type PaginatedCommentFromUser_DownvotersResponse = {
  __typename?: 'PaginatedCommentFromUser_downvotersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Comment>;
  total: Scalars['Float'];
};

export type PaginatedCommentFromUser_UpvotersResponse = {
  __typename?: 'PaginatedCommentFromUser_upvotersResponse';
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

export type PaginatedPostFromUser_DownvotersResponse = {
  __typename?: 'PaginatedPostFromUser_downvotersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedPostFromUser_UpvotersResponse = {
  __typename?: 'PaginatedPostFromUser_upvotersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Post>;
  total: Scalars['Float'];
};

export type PaginatedQuestionFromUser_DownvotersResponse = {
  __typename?: 'PaginatedQuestionFromUser_downvotersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Question>;
  total: Scalars['Float'];
};

export type PaginatedQuestionFromUser_UpvotersResponse = {
  __typename?: 'PaginatedQuestionFromUser_upvotersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<Question>;
  total: Scalars['Float'];
};

export type PaginatedUserFromAnswer_DownvotedAnswersResponse = {
  __typename?: 'PaginatedUserFromAnswer_downvotedAnswersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromAnswer_UpvotedAnswersResponse = {
  __typename?: 'PaginatedUserFromAnswer_upvotedAnswersResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromComment_DownvotedCommentsResponse = {
  __typename?: 'PaginatedUserFromComment_downvotedCommentsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromComment_UpvotedCommentsResponse = {
  __typename?: 'PaginatedUserFromComment_upvotedCommentsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromPost_DownvotedPostsResponse = {
  __typename?: 'PaginatedUserFromPost_downvotedPostsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromPost_UpvotedPostsResponse = {
  __typename?: 'PaginatedUserFromPost_upvotedPostsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromQuestion_DownvotedQuestionsResponse = {
  __typename?: 'PaginatedUserFromQuestion_downvotedQuestionsResponse';
  hasMore: Scalars['Boolean'];
  items: Array<User>;
  total: Scalars['Float'];
};

export type PaginatedUserFromQuestion_UpvotedQuestionsResponse = {
  __typename?: 'PaginatedUserFromQuestion_upvotedQuestionsResponse';
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
  downvoters: PaginatedUserFromPost_DownvotedPostsResponse;
  downvotes: Scalars['Float'];
  id: Scalars['ID'];
  imageName?: Maybe<Scalars['String']>;
  isDownvoted: Scalars['Boolean'];
  isUpvoted: Scalars['Boolean'];
  lastEdited?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  resort?: Maybe<Resort>;
  topics: Array<Scalars['String']>;
  upvoters: PaginatedUserFromPost_UpvotedPostsResponse;
  upvotes: Scalars['Float'];
};


export type PostCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type PostDownvotersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type PostUpvotersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  feedSortPosts: Array<Post>;
  getAnswer: Answer;
  getAvailableUsername: Scalars['String'];
  getBadge: Badge;
  getComment: Comment;
  getNotifications?: Maybe<Array<Notification>>;
  getPost: Post;
  getQuestion: Question;
  getQueue: Array<Report>;
  getResort: Resort;
  getResortByName?: Maybe<Resort>;
  getUser: User;
  getUserByName?: Maybe<User>;
  paginateAnswers: Array<Answer>;
  paginateBadges: Array<Badge>;
  paginateComments: Array<Comment>;
  paginatePosts: Array<Post>;
  paginateQuestions: Array<Question>;
  paginateResorts: Array<Resort>;
  paginateUsers: Array<User>;
  search: Array<SearchResult>;
};


export type QueryFeedSortPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};


export type QueryGetAnswerArgs = {
  id: Scalars['String'];
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


export type QueryGetQuestionArgs = {
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


export type QueryPaginateAnswersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QueryPaginateBadgesArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QueryPaginateCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QueryPaginatePostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QueryPaginateQuestionsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QueryPaginateResortsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QueryPaginateUsersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QuerySearchArgs = {
  limit: Scalars['Float'];
  searchQuery: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  answers: PaginatedAnswerFromQuestion_QuestionResponse;
  author: User;
  comments: PaginatedCommentFromQuestion_QuestionResponse;
  createdAt: Scalars['String'];
  downvoters: PaginatedUserFromQuestion_DownvotedQuestionsResponse;
  id: Scalars['ID'];
  isDownvoted: Scalars['Boolean'];
  isUpvoted: Scalars['Boolean'];
  lastEdited?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  questions: PaginatedAnswerFromQuestion_AuthorResponse;
  resort?: Maybe<Resort>;
  topics: Array<Scalars['String']>;
  upvoters: PaginatedUserFromQuestion_UpvotedQuestionsResponse;
};


export type QuestionAnswersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QuestionCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QuestionDownvotersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QuestionQuestionsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type QuestionUpvotersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};

export type Report = {
  __typename?: 'Report';
  answer?: Maybe<Answer>;
  comment?: Maybe<Comment>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  information?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  question?: Maybe<Question>;
  reporter: User;
  resolved: Scalars['Boolean'];
  resort?: Maybe<Resort>;
  type: ReportType;
  user?: Maybe<User>;
};

export const enum ReportType {
  InappropriateContent = 'InappropriateContent'
};

export type ReportedEntityInput = {
  commentId?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
  resortId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
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
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type ResortPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};

export const enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  SuperAdmin = 'SuperAdmin'
};

export type SearchResult = Post | Resort | User;

export type UpdateProfileInput = {
  avatar?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  answers: PaginatedAnswerFromUser_AuthorResponse;
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
  downvotedAnswers: PaginatedAnswerFromUser_DownvotersResponse;
  downvotedComments: PaginatedCommentFromUser_DownvotersResponse;
  downvotedPosts: PaginatedPostFromUser_DownvotersResponse;
  downvotedQuestions: PaginatedQuestionFromUser_DownvotersResponse;
  followers: PaginatedUserFromUser_FollowingResponse;
  following: PaginatedUserFromUser_FollowersResponse;
  github?: Maybe<Scalars['String']>;
  google?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isBot?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  ownedResorts?: Maybe<Array<Resort>>;
  posts: PaginatedPostFromUser_AuthorResponse;
  roles: Array<Role>;
  twitter?: Maybe<Scalars['String']>;
  upvotedAnswers: PaginatedAnswerFromUser_UpvotersResponse;
  upvotedComments: PaginatedCommentFromUser_UpvotersResponse;
  upvotedPosts: PaginatedPostFromUser_UpvotersResponse;
  upvotedQuestions: PaginatedQuestionFromUser_UpvotersResponse;
  url?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
};


export type UserAnswersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserBotsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserDownvotedAnswersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserDownvotedCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserDownvotedPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserDownvotedQuestionsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserFollowersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserFollowingArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserUpvotedAnswersArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserUpvotedCommentsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserUpvotedPostsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};


export type UserUpvotedQuestionsArgs = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
  sortCol?: Maybe<Scalars['String']>;
  sortType?: Maybe<Scalars['String']>;
};
