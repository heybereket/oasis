import { DocumentNode } from 'graphql';
import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Badge = {
    __typename?: 'Badge';
    createdAt: Scalars['String'];
    description: Scalars['String'];
    id: Scalars['ID'];
    imagePath: Scalars['String'];
    level: Scalars['Float'];
    name: Scalars['String'];
};
export declare type Comment = {
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
export declare type CommentDislikersArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type CommentLikersArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type CreateBotInput = {
    name: Scalars['String'];
    username: Scalars['String'];
};
export declare type CreateResortInput = {
    banner: Scalars['String'];
    category: Scalars['String'];
    description: Scalars['String'];
    logo: Scalars['String'];
    name: Scalars['String'];
};
export declare type EditCommentInput = {
    content: Scalars['String'];
};
export declare type EditPostInput = {
    message?: Maybe<Scalars['String']>;
    topics?: Maybe<Array<Scalars['String']>>;
};
export declare type MakeBadgeInput = {
    description: Scalars['String'];
    imagePath: Scalars['String'];
    level: Scalars['Float'];
    name: Scalars['String'];
};
export declare type Mutation = {
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
export declare type MutationCreateBotArgs = {
    data: CreateBotInput;
};
export declare type MutationCreateCommentArgs = {
    data: NewCommentInput;
    postId: Scalars['String'];
};
export declare type MutationCreatePostArgs = {
    data: NewPostInput;
};
export declare type MutationCreateResortArgs = {
    data: CreateResortInput;
};
export declare type MutationDeletePostArgs = {
    postId: Scalars['String'];
};
export declare type MutationEditCommentArgs = {
    commentId: Scalars['String'];
    data: EditCommentInput;
};
export declare type MutationEditPostArgs = {
    data: EditPostInput;
    postId: Scalars['String'];
};
export declare type MutationFollowUserArgs = {
    userId: Scalars['String'];
};
export declare type MutationGiveBadgeArgs = {
    badgeName: Scalars['String'];
    username: Scalars['String'];
};
export declare type MutationJoinResortArgs = {
    resortId: Scalars['String'];
};
export declare type MutationLikeDislikeArgs = {
    dislike: Scalars['Boolean'];
    like: Scalars['Boolean'];
    postId: Scalars['String'];
};
export declare type MutationLikeDislikeCommentArgs = {
    commentId: Scalars['String'];
    dislike: Scalars['Boolean'];
    like: Scalars['Boolean'];
};
export declare type MutationMakeAdminArgs = {
    roles: Array<Role>;
    user: Scalars['String'];
};
export declare type MutationMakeBadgeArgs = {
    data: MakeBadgeInput;
};
export declare type MutationMarkNotificationAsReadArgs = {
    notificationId: Scalars['String'];
};
export declare type MutationRefreshBotTokenArgs = {
    botId: Scalars['String'];
};
export declare type MutationUpdateProfileArgs = {
    data: UpdateProfileInput;
};
export declare type NewCommentInput = {
    content: Scalars['String'];
};
export declare type NewPostInput = {
    message: Scalars['String'];
    topics: Array<Scalars['String']>;
};
export declare type Notification = {
    __typename?: 'Notification';
    createdAt: Scalars['String'];
    id: Scalars['ID'];
    performer?: Maybe<User>;
    read: Scalars['Boolean'];
    type: NotificationType;
    user: User;
};
export declare enum NotificationType {
    Follow = "Follow",
    Like = "Like",
    Reply = "Reply"
}
export declare type PaginatedCommentFromPost_PostResponse = {
    __typename?: 'PaginatedCommentFromPost_postResponse';
    hasMore: Scalars['Boolean'];
    items: Array<Comment>;
    total: Scalars['Float'];
};
export declare type PaginatedCommentFromUser_AuthorResponse = {
    __typename?: 'PaginatedCommentFromUser_authorResponse';
    hasMore: Scalars['Boolean'];
    items: Array<Comment>;
    total: Scalars['Float'];
};
export declare type PaginatedCommentFromUser_DislikersResponse = {
    __typename?: 'PaginatedCommentFromUser_dislikersResponse';
    hasMore: Scalars['Boolean'];
    items: Array<Comment>;
    total: Scalars['Float'];
};
export declare type PaginatedCommentFromUser_LikersResponse = {
    __typename?: 'PaginatedCommentFromUser_likersResponse';
    hasMore: Scalars['Boolean'];
    items: Array<Comment>;
    total: Scalars['Float'];
};
export declare type PaginatedPostFromResort_ResortResponse = {
    __typename?: 'PaginatedPostFromResort_resortResponse';
    hasMore: Scalars['Boolean'];
    items: Array<Post>;
    total: Scalars['Float'];
};
export declare type PaginatedPostFromUser_AuthorResponse = {
    __typename?: 'PaginatedPostFromUser_authorResponse';
    hasMore: Scalars['Boolean'];
    items: Array<Post>;
    total: Scalars['Float'];
};
export declare type PaginatedPostFromUser_DislikersResponse = {
    __typename?: 'PaginatedPostFromUser_dislikersResponse';
    hasMore: Scalars['Boolean'];
    items: Array<Post>;
    total: Scalars['Float'];
};
export declare type PaginatedPostFromUser_LikersResponse = {
    __typename?: 'PaginatedPostFromUser_likersResponse';
    hasMore: Scalars['Boolean'];
    items: Array<Post>;
    total: Scalars['Float'];
};
export declare type PaginatedUserFromComment_DislikedCommentsResponse = {
    __typename?: 'PaginatedUserFromComment_dislikedCommentsResponse';
    hasMore: Scalars['Boolean'];
    items: Array<User>;
    total: Scalars['Float'];
};
export declare type PaginatedUserFromComment_LikedCommentsResponse = {
    __typename?: 'PaginatedUserFromComment_likedCommentsResponse';
    hasMore: Scalars['Boolean'];
    items: Array<User>;
    total: Scalars['Float'];
};
export declare type PaginatedUserFromPost_DislikedPostsResponse = {
    __typename?: 'PaginatedUserFromPost_dislikedPostsResponse';
    hasMore: Scalars['Boolean'];
    items: Array<User>;
    total: Scalars['Float'];
};
export declare type PaginatedUserFromPost_LikedPostsResponse = {
    __typename?: 'PaginatedUserFromPost_likedPostsResponse';
    hasMore: Scalars['Boolean'];
    items: Array<User>;
    total: Scalars['Float'];
};
export declare type PaginatedUserFromResort_JoinedResortsResponse = {
    __typename?: 'PaginatedUserFromResort_joinedResortsResponse';
    hasMore: Scalars['Boolean'];
    items: Array<User>;
    total: Scalars['Float'];
};
export declare type PaginatedUserFromUser_BotOwnerResponse = {
    __typename?: 'PaginatedUserFromUser_botOwnerResponse';
    hasMore: Scalars['Boolean'];
    items: Array<User>;
    total: Scalars['Float'];
};
export declare type PaginatedUserFromUser_FollowersResponse = {
    __typename?: 'PaginatedUserFromUser_followersResponse';
    hasMore: Scalars['Boolean'];
    items: Array<User>;
    total: Scalars['Float'];
};
export declare type PaginatedUserFromUser_FollowingResponse = {
    __typename?: 'PaginatedUserFromUser_followingResponse';
    hasMore: Scalars['Boolean'];
    items: Array<User>;
    total: Scalars['Float'];
};
export declare type Post = {
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
export declare type PostCommentsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type PostDislikersArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type PostLikersArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type Query = {
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
export declare type QueryFeedSortPostsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type QueryGetAvailableUsernameArgs = {
    username: Scalars['String'];
};
export declare type QueryGetBadgeArgs = {
    id: Scalars['String'];
};
export declare type QueryGetCommentArgs = {
    id: Scalars['String'];
};
export declare type QueryGetPostArgs = {
    id: Scalars['String'];
};
export declare type QueryGetRepoArgs = {
    id: Scalars['String'];
};
export declare type QueryGetResortArgs = {
    id: Scalars['String'];
};
export declare type QueryGetResortByNameArgs = {
    name: Scalars['String'];
};
export declare type QueryGetUserArgs = {
    id: Scalars['String'];
};
export declare type QueryGetUserByNameArgs = {
    username: Scalars['String'];
};
export declare type QueryPaginateBadgesArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type QueryPaginateCommentsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type QueryPaginatePostsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type QueryPaginateReposArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type QueryPaginateResortsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type QueryPaginateUsersArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type Repo = {
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
export declare type Resort = {
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
export declare type ResortMembersArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type ResortPostsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare enum Role {
    Admin = "Admin",
    Moderator = "Moderator",
    SuperAdmin = "SuperAdmin"
}
export declare type UpdateProfileInput = {
    avatar?: Maybe<Scalars['String']>;
    banner?: Maybe<Scalars['String']>;
    bio?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    username?: Maybe<Scalars['String']>;
};
export declare type User = {
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
export declare type UserBotsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type UserCommentsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type UserDislikedCommentsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type UserDislikedPostsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type UserFollowersArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type UserFollowingArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type UserLikedCommentsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type UserLikedPostsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type UserPostsArgs = {
    limit: Scalars['Float'];
    offset: Scalars['Float'];
};
export declare type GetPostCommentsQueryVariables = Exact<{
    postId: Scalars['String'];
    commentsOffset: Scalars['Float'];
    commentsLimit: Scalars['Float'];
}>;
export declare type GetPostCommentsQuery = ({
    __typename?: 'Query';
} & {
    getPost: ({
        __typename?: 'Post';
    } & Pick<Post, 'id'> & {
        comments: ({
            __typename?: 'PaginatedCommentFromPost_postResponse';
        } & {
            items: Array<({
                __typename?: 'Comment';
            } & Pick<Comment, 'id' | 'content' | 'likes' | 'dislikes' | 'createdAt' | 'lastEdited' | 'isLiked' | 'isDisliked'> & {
                author: ({
                    __typename?: 'User';
                } & Pick<User, 'avatar' | 'username' | 'name'>);
            })>;
        });
    });
});
export declare type GetUsersCommentsQueryVariables = Exact<{
    username: Scalars['String'];
    commentsLimit: Scalars['Float'];
    commentsOffset: Scalars['Float'];
}>;
export declare type GetUsersCommentsQuery = ({
    __typename?: 'Query';
} & {
    userOnlyComments?: Maybe<({
        __typename?: 'User';
    } & {
        comments: ({
            __typename?: 'PaginatedCommentFromUser_authorResponse';
        } & Pick<PaginatedCommentFromUser_AuthorResponse, 'hasMore' | 'total'> & {
            items: Array<({
                __typename?: 'Comment';
            } & Pick<Comment, 'id' | 'content' | 'createdAt' | 'lastEdited' | 'isLiked' | 'isDisliked' | 'likes' | 'dislikes'> & {
                author: ({
                    __typename?: 'User';
                } & Pick<User, 'id' | 'avatar' | 'username' | 'name'>);
            })>;
        });
    })>;
});
export declare type LikeDislikeCommentMutationVariables = Exact<{
    like: Scalars['Boolean'];
    dislike: Scalars['Boolean'];
    commentId: Scalars['String'];
}>;
export declare type LikeDislikeCommentMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'likeDislikeComment'>);
export declare type MakeCommentMutationVariables = Exact<{
    content: Scalars['String'];
    postId: Scalars['String'];
}>;
export declare type MakeCommentMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'createComment'>);
export declare type DeletePostMutationVariables = Exact<{
    postId: Scalars['String'];
}>;
export declare type DeletePostMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deletePost'>);
export declare type GetPostQueryVariables = Exact<{
    id: Scalars['String'];
}>;
export declare type GetPostQuery = ({
    __typename?: 'Query';
} & {
    getPost: ({
        __typename?: 'Post';
    } & Pick<Post, 'createdAt' | 'dislikes' | 'id' | 'lastEdited' | 'likes' | 'message' | 'topics'> & {
        author: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'name' | 'avatar'> & {
            badges?: Maybe<Array<({
                __typename?: 'Badge';
            } & Pick<Badge, 'description' | 'id' | 'imagePath'>)>>;
        });
        resort?: Maybe<({
            __typename?: 'Resort';
        } & Pick<Resort, 'id' | 'description' | 'logo' | 'name'>)>;
    });
});
export declare type PaginatePostsQueryVariables = Exact<{
    postsLimit: Scalars['Float'];
    postsOffset: Scalars['Float'];
}>;
export declare type PaginatePostsQuery = ({
    __typename?: 'Query';
} & {
    paginatePosts: Array<({
        __typename?: 'Post';
    } & Pick<Post, 'createdAt' | 'dislikes' | 'id' | 'lastEdited' | 'likes' | 'message' | 'topics' | 'isLiked' | 'isDisliked'> & {
        author: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'name' | 'username' | 'avatar'> & {
            badges?: Maybe<Array<({
                __typename?: 'Badge';
            } & Pick<Badge, 'description' | 'id' | 'imagePath'>)>>;
        });
        resort?: Maybe<({
            __typename?: 'Resort';
        } & Pick<Resort, 'id' | 'description' | 'logo' | 'name'>)>;
        comments: ({
            __typename?: 'PaginatedCommentFromPost_postResponse';
        } & Pick<PaginatedCommentFromPost_PostResponse, 'total'>);
    })>;
});
export declare type LikeDislikePostMutationVariables = Exact<{
    like: Scalars['Boolean'];
    dislike: Scalars['Boolean'];
    postId: Scalars['String'];
}>;
export declare type LikeDislikePostMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'likeDislike'>);
export declare type MakePostMutationVariables = Exact<{
    message: Scalars['String'];
    topics: Array<Scalars['String']> | Scalars['String'];
}>;
export declare type MakePostMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'createPost'>);
export declare type FeedSortPostsQueryVariables = Exact<{
    postsLimit: Scalars['Float'];
    postsOffset: Scalars['Float'];
}>;
export declare type FeedSortPostsQuery = ({
    __typename?: 'Query';
} & {
    feedSortPosts: Array<({
        __typename?: 'Post';
    } & Pick<Post, 'createdAt' | 'dislikes' | 'id' | 'lastEdited' | 'likes' | 'message' | 'topics' | 'isLiked' | 'isDisliked'> & {
        author: ({
            __typename?: 'User';
        } & Pick<User, 'id' | 'name' | 'username' | 'avatar'> & {
            badges?: Maybe<Array<({
                __typename?: 'Badge';
            } & Pick<Badge, 'description' | 'id' | 'imagePath'>)>>;
        });
        resort?: Maybe<({
            __typename?: 'Resort';
        } & Pick<Resort, 'id' | 'description' | 'logo' | 'name'>)>;
        comments: ({
            __typename?: 'PaginatedCommentFromPost_postResponse';
        } & Pick<PaginatedCommentFromPost_PostResponse, 'total'>);
    })>;
});
export declare type GetResortByNameWithMembersQueryVariables = Exact<{
    name: Scalars['String'];
    membersOffset: Scalars['Float'];
    membersLimit: Scalars['Float'];
}>;
export declare type GetResortByNameWithMembersQuery = ({
    __typename?: 'Query';
} & {
    getResortByName?: Maybe<({
        __typename?: 'Resort';
    } & Pick<Resort, 'id' | 'name' | 'description' | 'banner' | 'logo' | 'category' | 'isJoined'> & {
        members: ({
            __typename?: 'PaginatedUserFromResort_joinedResortsResponse';
        } & Pick<PaginatedUserFromResort_JoinedResortsResponse, 'total' | 'hasMore'> & {
            items: Array<({
                __typename?: 'User';
            } & Pick<User, 'id' | 'name' | 'avatar'>)>;
        });
    })>;
});
export declare type JoinResortMutationVariables = Exact<{
    resortId: Scalars['String'];
}>;
export declare type JoinResortMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'joinResort'>);
export declare type GetCurrentUserQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetCurrentUserQuery = ({
    __typename?: 'Query';
} & {
    currentUser?: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id' | 'banner' | 'avatar' | 'createdAt' | 'github' | 'twitter' | 'discord' | 'google' | 'bio' | 'username' | 'name' | 'verified' | 'roles'>)>;
});
export declare type GetUserByNameQueryVariables = Exact<{
    username: Scalars['String'];
}>;
export declare type GetUserByNameQuery = ({
    __typename?: 'Query';
} & {
    getUserByName?: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id' | 'banner' | 'avatar' | 'createdAt' | 'github' | 'twitter' | 'discord' | 'google' | 'bio' | 'username' | 'name' | 'verified'> & {
        badges?: Maybe<Array<({
            __typename?: 'Badge';
        } & Pick<Badge, 'name' | 'id' | 'imagePath' | 'level' | 'description'>)>>;
        followers: ({
            __typename?: 'PaginatedUserFromUser_followingResponse';
        } & Pick<PaginatedUserFromUser_FollowingResponse, 'total'>);
        following: ({
            __typename?: 'PaginatedUserFromUser_followersResponse';
        } & Pick<PaginatedUserFromUser_FollowersResponse, 'total'>);
        posts: ({
            __typename?: 'PaginatedPostFromUser_authorResponse';
        } & Pick<PaginatedPostFromUser_AuthorResponse, 'total'>);
    })>;
});
export declare type GetMyUserIdQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetMyUserIdQuery = ({
    __typename?: 'Query';
} & {
    currentUser?: Maybe<({
        __typename?: 'User';
    } & Pick<User, 'id'>)>;
});
export declare type UpdateProfileMutationVariables = Exact<{
    data: UpdateProfileInput;
}>;
export declare type UpdateProfileMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'updateProfile'>);
export declare type DeleteAccountMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type DeleteAccountMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'deleteAccount'>);
export declare type FollowUserMutationVariables = Exact<{
    userId: Scalars['String'];
}>;
export declare type FollowUserMutation = ({
    __typename?: 'Mutation';
} & Pick<Mutation, 'followUser'>);
export declare type GetUsersPostsQueryVariables = Exact<{
    username: Scalars['String'];
    postsLimit: Scalars['Float'];
    postsOffset: Scalars['Float'];
}>;
export declare type GetUsersPostsQuery = ({
    __typename?: 'Query';
} & {
    userOnlyPosts?: Maybe<({
        __typename?: 'User';
    } & {
        posts: ({
            __typename?: 'PaginatedPostFromUser_authorResponse';
        } & Pick<PaginatedPostFromUser_AuthorResponse, 'hasMore' | 'total'> & {
            items: Array<({
                __typename?: 'Post';
            } & Pick<Post, 'id' | 'message' | 'createdAt' | 'lastEdited' | 'topics' | 'isLiked' | 'isDisliked' | 'likes' | 'dislikes'> & {
                author: ({
                    __typename?: 'User';
                } & Pick<User, 'id' | 'avatar' | 'username' | 'name'>);
                comments: ({
                    __typename?: 'PaginatedCommentFromPost_postResponse';
                } & Pick<PaginatedCommentFromPost_PostResponse, 'total'>);
            })>;
        });
    })>;
});
export declare type GetUsersLikedPostsQueryVariables = Exact<{
    username: Scalars['String'];
    postsLimit: Scalars['Float'];
    postsOffset: Scalars['Float'];
}>;
export declare type GetUsersLikedPostsQuery = ({
    __typename?: 'Query';
} & {
    getUserByName?: Maybe<({
        __typename?: 'User';
    } & {
        likedPosts: ({
            __typename?: 'PaginatedPostFromUser_likersResponse';
        } & Pick<PaginatedPostFromUser_LikersResponse, 'hasMore' | 'total'> & {
            items: Array<({
                __typename?: 'Post';
            } & Pick<Post, 'id' | 'message' | 'createdAt' | 'lastEdited' | 'topics' | 'isLiked' | 'isDisliked' | 'likes' | 'dislikes'> & {
                author: ({
                    __typename?: 'User';
                } & Pick<User, 'id' | 'avatar' | 'username' | 'name'>);
                comments: ({
                    __typename?: 'PaginatedCommentFromPost_postResponse';
                } & Pick<PaginatedCommentFromPost_PostResponse, 'total'>);
            })>;
        });
    })>;
});
export declare const GetPostCommentsDocument: DocumentNode;
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
export declare function useGetPostCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables>): Apollo.QueryResult<GetPostCommentsQuery, Exact<{
    postId: string;
    commentsOffset: number;
    commentsLimit: number;
}>>;
export declare function useGetPostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostCommentsQuery, GetPostCommentsQueryVariables>): Apollo.QueryTuple<GetPostCommentsQuery, Exact<{
    postId: string;
    commentsOffset: number;
    commentsLimit: number;
}>>;
export declare type GetPostCommentsQueryHookResult = ReturnType<typeof useGetPostCommentsQuery>;
export declare type GetPostCommentsLazyQueryHookResult = ReturnType<typeof useGetPostCommentsLazyQuery>;
export declare type GetPostCommentsQueryResult = Apollo.QueryResult<GetPostCommentsQuery, GetPostCommentsQueryVariables>;
export declare const GetUsersCommentsDocument: DocumentNode;
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
export declare function useGetUsersCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersCommentsQuery, GetUsersCommentsQueryVariables>): Apollo.QueryResult<GetUsersCommentsQuery, Exact<{
    username: string;
    commentsLimit: number;
    commentsOffset: number;
}>>;
export declare function useGetUsersCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersCommentsQuery, GetUsersCommentsQueryVariables>): Apollo.QueryTuple<GetUsersCommentsQuery, Exact<{
    username: string;
    commentsLimit: number;
    commentsOffset: number;
}>>;
export declare type GetUsersCommentsQueryHookResult = ReturnType<typeof useGetUsersCommentsQuery>;
export declare type GetUsersCommentsLazyQueryHookResult = ReturnType<typeof useGetUsersCommentsLazyQuery>;
export declare type GetUsersCommentsQueryResult = Apollo.QueryResult<GetUsersCommentsQuery, GetUsersCommentsQueryVariables>;
export declare const LikeDislikeCommentDocument: DocumentNode;
export declare type LikeDislikeCommentMutationFn = Apollo.MutationFunction<LikeDislikeCommentMutation, LikeDislikeCommentMutationVariables>;
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
export declare function useLikeDislikeCommentMutation(baseOptions?: Apollo.MutationHookOptions<LikeDislikeCommentMutation, LikeDislikeCommentMutationVariables>): Apollo.MutationTuple<LikeDislikeCommentMutation, Exact<{
    like: boolean;
    dislike: boolean;
    commentId: string;
}>>;
export declare type LikeDislikeCommentMutationHookResult = ReturnType<typeof useLikeDislikeCommentMutation>;
export declare type LikeDislikeCommentMutationResult = Apollo.MutationResult<LikeDislikeCommentMutation>;
export declare type LikeDislikeCommentMutationOptions = Apollo.BaseMutationOptions<LikeDislikeCommentMutation, LikeDislikeCommentMutationVariables>;
export declare const MakeCommentDocument: DocumentNode;
export declare type MakeCommentMutationFn = Apollo.MutationFunction<MakeCommentMutation, MakeCommentMutationVariables>;
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
export declare function useMakeCommentMutation(baseOptions?: Apollo.MutationHookOptions<MakeCommentMutation, MakeCommentMutationVariables>): Apollo.MutationTuple<MakeCommentMutation, Exact<{
    content: string;
    postId: string;
}>>;
export declare type MakeCommentMutationHookResult = ReturnType<typeof useMakeCommentMutation>;
export declare type MakeCommentMutationResult = Apollo.MutationResult<MakeCommentMutation>;
export declare type MakeCommentMutationOptions = Apollo.BaseMutationOptions<MakeCommentMutation, MakeCommentMutationVariables>;
export declare const DeletePostDocument: DocumentNode;
export declare type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;
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
export declare function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>): Apollo.MutationTuple<DeletePostMutation, Exact<{
    postId: string;
}>>;
export declare type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export declare type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export declare type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export declare const GetPostDocument: DocumentNode;
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
export declare function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>): Apollo.QueryResult<GetPostQuery, Exact<{
    id: string;
}>>;
export declare function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>): Apollo.QueryTuple<GetPostQuery, Exact<{
    id: string;
}>>;
export declare type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export declare type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export declare type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export declare const PaginatePostsDocument: DocumentNode;
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
export declare function usePaginatePostsQuery(baseOptions: Apollo.QueryHookOptions<PaginatePostsQuery, PaginatePostsQueryVariables>): Apollo.QueryResult<PaginatePostsQuery, Exact<{
    postsLimit: number;
    postsOffset: number;
}>>;
export declare function usePaginatePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaginatePostsQuery, PaginatePostsQueryVariables>): Apollo.QueryTuple<PaginatePostsQuery, Exact<{
    postsLimit: number;
    postsOffset: number;
}>>;
export declare type PaginatePostsQueryHookResult = ReturnType<typeof usePaginatePostsQuery>;
export declare type PaginatePostsLazyQueryHookResult = ReturnType<typeof usePaginatePostsLazyQuery>;
export declare type PaginatePostsQueryResult = Apollo.QueryResult<PaginatePostsQuery, PaginatePostsQueryVariables>;
export declare const LikeDislikePostDocument: DocumentNode;
export declare type LikeDislikePostMutationFn = Apollo.MutationFunction<LikeDislikePostMutation, LikeDislikePostMutationVariables>;
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
export declare function useLikeDislikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikeDislikePostMutation, LikeDislikePostMutationVariables>): Apollo.MutationTuple<LikeDislikePostMutation, Exact<{
    like: boolean;
    dislike: boolean;
    postId: string;
}>>;
export declare type LikeDislikePostMutationHookResult = ReturnType<typeof useLikeDislikePostMutation>;
export declare type LikeDislikePostMutationResult = Apollo.MutationResult<LikeDislikePostMutation>;
export declare type LikeDislikePostMutationOptions = Apollo.BaseMutationOptions<LikeDislikePostMutation, LikeDislikePostMutationVariables>;
export declare const MakePostDocument: DocumentNode;
export declare type MakePostMutationFn = Apollo.MutationFunction<MakePostMutation, MakePostMutationVariables>;
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
export declare function useMakePostMutation(baseOptions?: Apollo.MutationHookOptions<MakePostMutation, MakePostMutationVariables>): Apollo.MutationTuple<MakePostMutation, Exact<{
    message: string;
    topics: string | string[];
}>>;
export declare type MakePostMutationHookResult = ReturnType<typeof useMakePostMutation>;
export declare type MakePostMutationResult = Apollo.MutationResult<MakePostMutation>;
export declare type MakePostMutationOptions = Apollo.BaseMutationOptions<MakePostMutation, MakePostMutationVariables>;
export declare const FeedSortPostsDocument: DocumentNode;
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
export declare function useFeedSortPostsQuery(baseOptions: Apollo.QueryHookOptions<FeedSortPostsQuery, FeedSortPostsQueryVariables>): Apollo.QueryResult<FeedSortPostsQuery, Exact<{
    postsLimit: number;
    postsOffset: number;
}>>;
export declare function useFeedSortPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedSortPostsQuery, FeedSortPostsQueryVariables>): Apollo.QueryTuple<FeedSortPostsQuery, Exact<{
    postsLimit: number;
    postsOffset: number;
}>>;
export declare type FeedSortPostsQueryHookResult = ReturnType<typeof useFeedSortPostsQuery>;
export declare type FeedSortPostsLazyQueryHookResult = ReturnType<typeof useFeedSortPostsLazyQuery>;
export declare type FeedSortPostsQueryResult = Apollo.QueryResult<FeedSortPostsQuery, FeedSortPostsQueryVariables>;
export declare const GetResortByNameWithMembersDocument: DocumentNode;
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
export declare function useGetResortByNameWithMembersQuery(baseOptions: Apollo.QueryHookOptions<GetResortByNameWithMembersQuery, GetResortByNameWithMembersQueryVariables>): Apollo.QueryResult<GetResortByNameWithMembersQuery, Exact<{
    name: string;
    membersOffset: number;
    membersLimit: number;
}>>;
export declare function useGetResortByNameWithMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResortByNameWithMembersQuery, GetResortByNameWithMembersQueryVariables>): Apollo.QueryTuple<GetResortByNameWithMembersQuery, Exact<{
    name: string;
    membersOffset: number;
    membersLimit: number;
}>>;
export declare type GetResortByNameWithMembersQueryHookResult = ReturnType<typeof useGetResortByNameWithMembersQuery>;
export declare type GetResortByNameWithMembersLazyQueryHookResult = ReturnType<typeof useGetResortByNameWithMembersLazyQuery>;
export declare type GetResortByNameWithMembersQueryResult = Apollo.QueryResult<GetResortByNameWithMembersQuery, GetResortByNameWithMembersQueryVariables>;
export declare const JoinResortDocument: DocumentNode;
export declare type JoinResortMutationFn = Apollo.MutationFunction<JoinResortMutation, JoinResortMutationVariables>;
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
export declare function useJoinResortMutation(baseOptions?: Apollo.MutationHookOptions<JoinResortMutation, JoinResortMutationVariables>): Apollo.MutationTuple<JoinResortMutation, Exact<{
    resortId: string;
}>>;
export declare type JoinResortMutationHookResult = ReturnType<typeof useJoinResortMutation>;
export declare type JoinResortMutationResult = Apollo.MutationResult<JoinResortMutation>;
export declare type JoinResortMutationOptions = Apollo.BaseMutationOptions<JoinResortMutation, JoinResortMutationVariables>;
export declare const GetCurrentUserDocument: DocumentNode;
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
export declare function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>): Apollo.QueryResult<GetCurrentUserQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>): Apollo.QueryTuple<GetCurrentUserQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export declare type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export declare type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export declare const GetUserByNameDocument: DocumentNode;
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
export declare function useGetUserByNameQuery(baseOptions: Apollo.QueryHookOptions<GetUserByNameQuery, GetUserByNameQueryVariables>): Apollo.QueryResult<GetUserByNameQuery, Exact<{
    username: string;
}>>;
export declare function useGetUserByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByNameQuery, GetUserByNameQueryVariables>): Apollo.QueryTuple<GetUserByNameQuery, Exact<{
    username: string;
}>>;
export declare type GetUserByNameQueryHookResult = ReturnType<typeof useGetUserByNameQuery>;
export declare type GetUserByNameLazyQueryHookResult = ReturnType<typeof useGetUserByNameLazyQuery>;
export declare type GetUserByNameQueryResult = Apollo.QueryResult<GetUserByNameQuery, GetUserByNameQueryVariables>;
export declare const GetMyUserIdDocument: DocumentNode;
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
export declare function useGetMyUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetMyUserIdQuery, GetMyUserIdQueryVariables>): Apollo.QueryResult<GetMyUserIdQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetMyUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyUserIdQuery, GetMyUserIdQueryVariables>): Apollo.QueryTuple<GetMyUserIdQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetMyUserIdQueryHookResult = ReturnType<typeof useGetMyUserIdQuery>;
export declare type GetMyUserIdLazyQueryHookResult = ReturnType<typeof useGetMyUserIdLazyQuery>;
export declare type GetMyUserIdQueryResult = Apollo.QueryResult<GetMyUserIdQuery, GetMyUserIdQueryVariables>;
export declare const UpdateProfileDocument: DocumentNode;
export declare type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;
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
export declare function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>): Apollo.MutationTuple<UpdateProfileMutation, Exact<{
    data: UpdateProfileInput;
}>>;
export declare type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export declare type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export declare type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export declare const DeleteAccountDocument: DocumentNode;
export declare type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;
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
export declare function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>): Apollo.MutationTuple<DeleteAccountMutation, Exact<{
    [key: string]: never;
}>>;
export declare type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export declare type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export declare type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export declare const FollowUserDocument: DocumentNode;
export declare type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;
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
export declare function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>): Apollo.MutationTuple<FollowUserMutation, Exact<{
    userId: string;
}>>;
export declare type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export declare type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export declare type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export declare const GetUsersPostsDocument: DocumentNode;
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
export declare function useGetUsersPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersPostsQuery, GetUsersPostsQueryVariables>): Apollo.QueryResult<GetUsersPostsQuery, Exact<{
    username: string;
    postsLimit: number;
    postsOffset: number;
}>>;
export declare function useGetUsersPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersPostsQuery, GetUsersPostsQueryVariables>): Apollo.QueryTuple<GetUsersPostsQuery, Exact<{
    username: string;
    postsLimit: number;
    postsOffset: number;
}>>;
export declare type GetUsersPostsQueryHookResult = ReturnType<typeof useGetUsersPostsQuery>;
export declare type GetUsersPostsLazyQueryHookResult = ReturnType<typeof useGetUsersPostsLazyQuery>;
export declare type GetUsersPostsQueryResult = Apollo.QueryResult<GetUsersPostsQuery, GetUsersPostsQueryVariables>;
export declare const GetUsersLikedPostsDocument: DocumentNode;
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
export declare function useGetUsersLikedPostsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersLikedPostsQuery, GetUsersLikedPostsQueryVariables>): Apollo.QueryResult<GetUsersLikedPostsQuery, Exact<{
    username: string;
    postsLimit: number;
    postsOffset: number;
}>>;
export declare function useGetUsersLikedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersLikedPostsQuery, GetUsersLikedPostsQueryVariables>): Apollo.QueryTuple<GetUsersLikedPostsQuery, Exact<{
    username: string;
    postsLimit: number;
    postsOffset: number;
}>>;
export declare type GetUsersLikedPostsQueryHookResult = ReturnType<typeof useGetUsersLikedPostsQuery>;
export declare type GetUsersLikedPostsLazyQueryHookResult = ReturnType<typeof useGetUsersLikedPostsLazyQuery>;
export declare type GetUsersLikedPostsQueryResult = Apollo.QueryResult<GetUsersLikedPostsQuery, GetUsersLikedPostsQueryVariables>;
export declare const GetPostComments: DocumentNode;
export declare const GetUsersComments: DocumentNode;
export declare const LikeDislikeComment: DocumentNode;
export declare const MakeComment: DocumentNode;
export declare const DeletePost: DocumentNode;
export declare const GetPost: DocumentNode;
export declare const PaginatePosts: DocumentNode;
export declare const LikeDislikePost: DocumentNode;
export declare const MakePost: DocumentNode;
export declare const FeedSortPosts: DocumentNode;
export declare const GetResortByNameWithMembers: DocumentNode;
export declare const JoinResort: DocumentNode;
export declare const GetCurrentUser: DocumentNode;
export declare const GetUserByName: DocumentNode;
export declare const GetMyUserId: DocumentNode;
export declare const UpdateProfile: DocumentNode;
export declare const DeleteAccount: DocumentNode;
export declare const FollowUser: DocumentNode;
export declare const GetUsersPosts: DocumentNode;
export declare const GetUsersLikedPosts: DocumentNode;
