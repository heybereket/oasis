import React from 'react';
import { Navbar, Post, CommentsTab } from '@oasis-sh/ui';
import { StyledMarkdown } from '@oasis-sh/parser';
import { GetServerSideProps } from 'next';
import {
  GetCurrentUserDocument,
  GetPostCommentsDocument,
  GetPostCommentsQueryVariables,
  GetPostDocument,
  GetPostQueryVariables,
  Post as TPost,
  Comment as TComment,
  useDeletePostMutation,
  useGetPostCommentsQuery,
  useGetPostQuery,
  useUpvoteDownvotePostMutation,
  useReportEntityMutation,
  useUpvoteDownvoteCommentMutation,
} from '@oasis-sh/react-gql';
import { ssrRequest } from '@lib/common/ssrRequest';
import { SEO } from '@shared/SEO';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';

type Props = {
  PostVars: GetPostQueryVariables;
  CommentVars: GetPostCommentsQueryVariables;
};

export const PostPage: React.FC<Props> = ({ PostVars, CommentVars }) => {
  const { user, currentUserLoading } = useGetCurrentUser();

  const postData = useGetPostQuery({ variables: PostVars }).data?.getPost;
  const comments = useGetPostCommentsQuery({ variables: CommentVars });
  const commentsData = comments.data?.getPost.comments.items;

  const [deletePost] = useDeletePostMutation();
  const [upvoteDownvotePost] = useUpvoteDownvotePostMutation();
  const [reportEntity] = useReportEntityMutation();
  const [upvoteDownvoteComment] = useUpvoteDownvoteCommentMutation();

  return (
    <>
      <SEO
        title={(postData?.author.name ?? '') + "'s Post"}
        metaDesc={postData?.message}
        metaImg={postData?.author.avatar}
      />
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <div className="flex flex-col justify-center max-w-580 m-auto">
        <Post
          markdown={(text) => <StyledMarkdown isPost={true} text={text} />}
          post={postData as TPost}
          currentUser={user}
          deletePost={(id) => deletePost({ variables: { postId: id } })}
          downvotePost={() =>
            upvoteDownvotePost({
              variables: {
                downvote: true,
                upvote: false,
                postId: postData?.id ?? '',
              },
            })
          }
          upvotePost={() =>
            upvoteDownvotePost({
              variables: {
                downvote: false,
                upvote: true,
                postId: postData?.id ?? '',
              },
            })
          }
          reportPost={reportEntity}
        />
        <div className="w-full pl-5 mt-6">
          <CommentsTab
            comments={(commentsData ?? []) as TComment[]}
            fetch={async (limit, offset) => {
              return (
                await comments.fetchMore({
                  variables: {
                    commentsLimit: limit,
                    commentsOffset: offset,
                  },
                })
              ).data.getPost.comments.items as TComment[];
            }}
            upvoteDownvoteComment={upvoteDownvoteComment}
            markdown={(text) => <StyledMarkdown text={text} isPost={true} />}
            currentUser={user}
            reportComment={reportEntity}
            bgColorOveride="bg-gray-800"
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  req,
}) => {
  const PostVars: GetPostQueryVariables = {
    id: query.id as string,
  };
  const CommentVars: GetPostCommentsQueryVariables = {
    commentsLimit: 10,
    commentsOffset: 0,
    postId: query.id as string,
  };
  return {
    props: {
      PostVars,
      CommentVars,
      initialApolloState: await ssrRequest(req, [
        {
          document: GetPostDocument,
          variables: PostVars,
        },
        {
          document: GetPostCommentsDocument,
          variables: CommentVars,
        },
        {
          document: GetCurrentUserDocument,
        },
      ]),
    },
  };
};

export default PostPage;
