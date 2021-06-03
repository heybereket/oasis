"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.useGetUsersPostsLazyQuery = exports.useGetUsersPostsQuery = exports.GetUsersPostsDocument = exports.useFollowUserMutation = exports.FollowUserDocument = exports.useDeleteAccountMutation = exports.DeleteAccountDocument = exports.useUpdateProfileMutation = exports.UpdateProfileDocument = exports.useGetMyUserIdLazyQuery = exports.useGetMyUserIdQuery = exports.GetMyUserIdDocument = exports.useGetUserByNameLazyQuery = exports.useGetUserByNameQuery = exports.GetUserByNameDocument = exports.useGetCurrentUserLazyQuery = exports.useGetCurrentUserQuery = exports.GetCurrentUserDocument = exports.useJoinResortMutation = exports.JoinResortDocument = exports.useGetResortByNameWithMembersLazyQuery = exports.useGetResortByNameWithMembersQuery = exports.GetResortByNameWithMembersDocument = exports.useFeedSortPostsLazyQuery = exports.useFeedSortPostsQuery = exports.FeedSortPostsDocument = exports.useMakePostMutation = exports.MakePostDocument = exports.useLikeDislikePostMutation = exports.LikeDislikePostDocument = exports.usePaginatePostsLazyQuery = exports.usePaginatePostsQuery = exports.PaginatePostsDocument = exports.useGetPostLazyQuery = exports.useGetPostQuery = exports.GetPostDocument = exports.useDeletePostMutation = exports.DeletePostDocument = exports.useMakeCommentMutation = exports.MakeCommentDocument = exports.useLikeDislikeCommentMutation = exports.LikeDislikeCommentDocument = exports.useGetUsersCommentsLazyQuery = exports.useGetUsersCommentsQuery = exports.GetUsersCommentsDocument = exports.useGetPostCommentsLazyQuery = exports.useGetPostCommentsQuery = exports.GetPostCommentsDocument = exports.Role = exports.NotificationType = void 0;
exports.GetUsersLikedPosts = exports.GetUsersPosts = exports.FollowUser = exports.DeleteAccount = exports.UpdateProfile = exports.GetMyUserId = exports.GetUserByName = exports.GetCurrentUser = exports.JoinResort = exports.GetResortByNameWithMembers = exports.FeedSortPosts = exports.MakePost = exports.LikeDislikePost = exports.PaginatePosts = exports.GetPost = exports.DeletePost = exports.MakeComment = exports.LikeDislikeComment = exports.GetUsersComments = exports.GetPostComments = exports.useGetUsersLikedPostsLazyQuery = exports.useGetUsersLikedPostsQuery = exports.GetUsersLikedPostsDocument = void 0;
var Apollo = __importStar(require("@apollo/client"));
var defaultOptions = {};
var NotificationType;
(function (NotificationType) {
    NotificationType["Follow"] = "Follow";
    NotificationType["Like"] = "Like";
    NotificationType["Reply"] = "Reply";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["Moderator"] = "Moderator";
    Role["SuperAdmin"] = "SuperAdmin";
})(Role = exports.Role || (exports.Role = {}));
exports.GetPostCommentsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPostComments" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getPost" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }] } }] } }] } }] } }] };
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
function useGetPostCommentsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetPostCommentsDocument, options);
}
exports.useGetPostCommentsQuery = useGetPostCommentsQuery;
function useGetPostCommentsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetPostCommentsDocument, options);
}
exports.useGetPostCommentsLazyQuery = useGetPostCommentsLazyQuery;
exports.GetUsersCommentsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getUsersComments" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "userOnlyComments" }, "name": { "kind": "Name", "value": "getUserByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasMore" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] };
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
function useGetUsersCommentsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetUsersCommentsDocument, options);
}
exports.useGetUsersCommentsQuery = useGetUsersCommentsQuery;
function useGetUsersCommentsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetUsersCommentsDocument, options);
}
exports.useGetUsersCommentsLazyQuery = useGetUsersCommentsLazyQuery;
exports.LikeDislikeCommentDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "LikeDislikeComment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "like" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "dislike" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "likeDislikeComment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "like" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "like" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "dislike" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "dislike" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "commentId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentId" } } }] }] } }] };
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
function useLikeDislikeCommentMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LikeDislikeCommentDocument, options);
}
exports.useLikeDislikeCommentMutation = useLikeDislikeCommentMutation;
exports.MakeCommentDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MakeComment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createComment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }] } }, { "kind": "Argument", "name": { "kind": "Name", "value": "postId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } } }] }] } }] };
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
function useMakeCommentMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MakeCommentDocument, options);
}
exports.useMakeCommentMutation = useMakeCommentMutation;
exports.DeletePostDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeletePost" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deletePost" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "postId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } } }] }] } }] };
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
function useDeletePostMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeletePostDocument, options);
}
exports.useDeletePostMutation = useDeletePostMutation;
exports.GetPostDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getPost" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getPost" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "badges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "imagePath" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resort" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }] } }] } }] };
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
function useGetPostQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetPostDocument, options);
}
exports.useGetPostQuery = useGetPostQuery;
function useGetPostLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetPostDocument, options);
}
exports.useGetPostLazyQuery = useGetPostLazyQuery;
exports.PaginatePostsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "PaginatePosts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "paginatePosts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "badges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "imagePath" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resort" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }] } }] } }] };
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
function usePaginatePostsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.PaginatePostsDocument, options);
}
exports.usePaginatePostsQuery = usePaginatePostsQuery;
function usePaginatePostsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.PaginatePostsDocument, options);
}
exports.usePaginatePostsLazyQuery = usePaginatePostsLazyQuery;
exports.LikeDislikePostDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "LikeDislikePost" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "like" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "dislike" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "likeDislike" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "like" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "like" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "dislike" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "dislike" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "postId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } } }] }] } }] };
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
function useLikeDislikePostMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LikeDislikePostDocument, options);
}
exports.useLikeDislikePostMutation = useLikeDislikePostMutation;
exports.MakePostDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MakePost" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "message" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "topics" } }, "type": { "kind": "NonNullType", "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createPost" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "message" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "message" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "topics" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "topics" } } }] } }] }] } }] };
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
function useMakePostMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MakePostDocument, options);
}
exports.useMakePostMutation = useMakePostMutation;
exports.FeedSortPostsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "FeedSortPosts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "feedSortPosts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "badges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "imagePath" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resort" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }] } }] } }] };
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
function useFeedSortPostsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.FeedSortPostsDocument, options);
}
exports.useFeedSortPostsQuery = useFeedSortPostsQuery;
function useFeedSortPostsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.FeedSortPostsDocument, options);
}
exports.useFeedSortPostsLazyQuery = useFeedSortPostsLazyQuery;
exports.GetResortByNameWithMembersDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetResortByNameWithMembers" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "membersOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "membersLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getResortByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "banner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" } }, { "kind": "Field", "name": { "kind": "Name", "value": "category" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isJoined" } }, { "kind": "Field", "name": { "kind": "Name", "value": "members" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "membersOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "membersLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasMore" } }] } }] } }] } }] };
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
function useGetResortByNameWithMembersQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetResortByNameWithMembersDocument, options);
}
exports.useGetResortByNameWithMembersQuery = useGetResortByNameWithMembersQuery;
function useGetResortByNameWithMembersLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetResortByNameWithMembersDocument, options);
}
exports.useGetResortByNameWithMembersLazyQuery = useGetResortByNameWithMembersLazyQuery;
exports.JoinResortDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "JoinResort" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "resortId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "joinResort" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "resortId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "resortId" } } }] }] } }] };
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
function useJoinResortMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.JoinResortDocument, options);
}
exports.useJoinResortMutation = useJoinResortMutation;
exports.GetCurrentUserDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getCurrentUser" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "currentUser" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "banner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "github" } }, { "kind": "Field", "name": { "kind": "Name", "value": "twitter" } }, { "kind": "Field", "name": { "kind": "Name", "value": "discord" } }, { "kind": "Field", "name": { "kind": "Name", "value": "google" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bio" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "verified" } }, { "kind": "Field", "name": { "kind": "Name", "value": "roles" } }] } }] } }] };
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
function useGetCurrentUserQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetCurrentUserDocument, options);
}
exports.useGetCurrentUserQuery = useGetCurrentUserQuery;
function useGetCurrentUserLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetCurrentUserDocument, options);
}
exports.useGetCurrentUserLazyQuery = useGetCurrentUserLazyQuery;
exports.GetUserByNameDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getUserByName" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getUserByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "banner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "github" } }, { "kind": "Field", "name": { "kind": "Name", "value": "twitter" } }, { "kind": "Field", "name": { "kind": "Name", "value": "discord" } }, { "kind": "Field", "name": { "kind": "Name", "value": "google" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bio" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "verified" } }, { "kind": "Field", "name": { "kind": "Name", "value": "badges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "imagePath" } }, { "kind": "Field", "name": { "kind": "Name", "value": "level" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "followers" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "following" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "posts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] };
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
function useGetUserByNameQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetUserByNameDocument, options);
}
exports.useGetUserByNameQuery = useGetUserByNameQuery;
function useGetUserByNameLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetUserByNameDocument, options);
}
exports.useGetUserByNameLazyQuery = useGetUserByNameLazyQuery;
exports.GetMyUserIdDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getMyUserId" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "currentUser" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] };
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
function useGetMyUserIdQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetMyUserIdDocument, options);
}
exports.useGetMyUserIdQuery = useGetMyUserIdQuery;
function useGetMyUserIdLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetMyUserIdDocument, options);
}
exports.useGetMyUserIdLazyQuery = useGetMyUserIdLazyQuery;
exports.UpdateProfileDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "updateProfile" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateProfileInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateProfile" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }] }] } }] };
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
function useUpdateProfileMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.UpdateProfileDocument, options);
}
exports.useUpdateProfileMutation = useUpdateProfileMutation;
exports.DeleteAccountDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "deleteAccount" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteAccount" } }] } }] };
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
function useDeleteAccountMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteAccountDocument, options);
}
exports.useDeleteAccountMutation = useDeleteAccountMutation;
exports.FollowUserDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "FollowUser" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "userId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "followUser" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "userId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "userId" } } }] }] } }] };
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
function useFollowUserMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.FollowUserDocument, options);
}
exports.useFollowUserMutation = useFollowUserMutation;
exports.GetUsersPostsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getUsersPosts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "userOnlyPosts" }, "name": { "kind": "Name", "value": "getUserByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "posts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasMore" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] };
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
function useGetUsersPostsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetUsersPostsDocument, options);
}
exports.useGetUsersPostsQuery = useGetUsersPostsQuery;
function useGetUsersPostsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetUsersPostsDocument, options);
}
exports.useGetUsersPostsLazyQuery = useGetUsersPostsLazyQuery;
exports.GetUsersLikedPostsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getUsersLikedPosts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getUserByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "likedPosts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasMore" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] };
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
function useGetUsersLikedPostsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetUsersLikedPostsDocument, options);
}
exports.useGetUsersLikedPostsQuery = useGetUsersLikedPostsQuery;
function useGetUsersLikedPostsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetUsersLikedPostsDocument, options);
}
exports.useGetUsersLikedPostsLazyQuery = useGetUsersLikedPostsLazyQuery;
exports.GetPostComments = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPostComments" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getPost" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }] } }] } }] } }] } }] };
exports.GetUsersComments = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getUsersComments" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "userOnlyComments" }, "name": { "kind": "Name", "value": "getUserByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentsLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "content" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasMore" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] };
exports.LikeDislikeComment = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "LikeDislikeComment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "like" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "dislike" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "commentId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "likeDislikeComment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "like" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "like" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "dislike" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "dislike" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "commentId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "commentId" } } }] }] } }] };
exports.MakeComment = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MakeComment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createComment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "content" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "content" } } }] } }, { "kind": "Argument", "name": { "kind": "Name", "value": "postId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } } }] }] } }] };
exports.DeletePost = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeletePost" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deletePost" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "postId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } } }] }] } }] };
exports.GetPost = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getPost" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getPost" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "badges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "imagePath" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resort" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }] } }] } }] };
exports.PaginatePosts = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "PaginatePosts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "paginatePosts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "badges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "imagePath" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resort" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }] } }] } }] };
exports.LikeDislikePost = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "LikeDislikePost" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "like" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "dislike" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "likeDislike" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "like" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "like" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "dislike" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "dislike" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "postId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postId" } } }] }] } }] };
exports.MakePost = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MakePost" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "message" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "topics" } }, "type": { "kind": "NonNullType", "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createPost" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "message" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "message" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "topics" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "topics" } } }] } }] }] } }] };
exports.FeedSortPosts = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "FeedSortPosts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "feedSortPosts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "badges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "imagePath" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resort" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }] } }] } }] };
exports.GetResortByNameWithMembers = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetResortByNameWithMembers" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "membersOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "membersLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getResortByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "banner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "logo" } }, { "kind": "Field", "name": { "kind": "Name", "value": "category" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isJoined" } }, { "kind": "Field", "name": { "kind": "Name", "value": "members" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "membersOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "membersLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasMore" } }] } }] } }] } }] };
exports.JoinResort = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "JoinResort" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "resortId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "joinResort" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "resortId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "resortId" } } }] }] } }] };
exports.GetCurrentUser = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getCurrentUser" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "currentUser" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "banner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "github" } }, { "kind": "Field", "name": { "kind": "Name", "value": "twitter" } }, { "kind": "Field", "name": { "kind": "Name", "value": "discord" } }, { "kind": "Field", "name": { "kind": "Name", "value": "google" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bio" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "verified" } }, { "kind": "Field", "name": { "kind": "Name", "value": "roles" } }] } }] } }] };
exports.GetUserByName = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getUserByName" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getUserByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "banner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "github" } }, { "kind": "Field", "name": { "kind": "Name", "value": "twitter" } }, { "kind": "Field", "name": { "kind": "Name", "value": "discord" } }, { "kind": "Field", "name": { "kind": "Name", "value": "google" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bio" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "verified" } }, { "kind": "Field", "name": { "kind": "Name", "value": "badges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "imagePath" } }, { "kind": "Field", "name": { "kind": "Name", "value": "level" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "followers" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "following" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "posts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] };
exports.GetMyUserId = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getMyUserId" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "currentUser" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] };
exports.UpdateProfile = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "updateProfile" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateProfileInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateProfile" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }] }] } }] };
exports.DeleteAccount = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "deleteAccount" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteAccount" } }] } }] };
exports.FollowUser = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "FollowUser" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "userId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "followUser" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "userId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "userId" } } }] }] } }] };
exports.GetUsersPosts = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getUsersPosts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "userOnlyPosts" }, "name": { "kind": "Name", "value": "getUserByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "posts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasMore" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] };
exports.GetUsersLikedPosts = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getUsersLikedPosts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "getUserByName" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "username" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "username" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "likedPosts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsOffset" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "postsLimit" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "items" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "message" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastEdited" } }, { "kind": "Field", "name": { "kind": "Name", "value": "topics" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "avatar" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "isLiked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isDisliked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "likes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "dislikes" } }, { "kind": "Field", "name": { "kind": "Name", "value": "comments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "limit" }, "value": { "kind": "IntValue", "value": "0" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "offset" }, "value": { "kind": "IntValue", "value": "0" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasMore" } }, { "kind": "Field", "name": { "kind": "Name", "value": "total" } }] } }] } }] } }] };
