import React from 'react';
import { Navbar, Post } from '@oasis-sh/ui';
import StyledMarkdown from '@parser/markdown/StyledMarkdown';
import { GetServerSideProps } from 'next';
import {
  GetCurrentUserDocument,
  GetPostDocument,
  GetPostQueryVariables,
  Post as TPost,
  useDeletePostMutation,
  useGetPostQuery,
  useLikeDislikePostMutation,
  useReportEntityMutation,
} from '@oasis-sh/react-gql';
import { ssrRequest } from '@lib/common/ssrRequest';
import { SEO } from '@shared/SEO';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';

type Props = {
  vars: GetPostQueryVariables;
};

export const PostPage: React.FC<Props> = ({ vars }) => {
  const { user, currentUserLoading } = useGetCurrentUser();
  const postData = useGetPostQuery({ variables: vars }).data?.getPost;
  const [deletePost] = useDeletePostMutation();
  const [likeDislikePost] = useLikeDislikePostMutation();
  const [reportPost] = useReportEntityMutation();

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
          dislikePost={() =>
            likeDislikePost({
              variables: {
                dislike: true,
                like: false,
                postId: postData?.id ?? '',
              },
            })
          }
          likePost={() =>
            likeDislikePost({
              variables: {
                dislike: false,
                like: true,
                postId: postData?.id ?? '',
              },
            })
          }
          reportPost={reportPost}
        />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  req,
}) => {
  const vars: GetPostQueryVariables = {
    id: query.postId as string,
  };
  return {
    props: {
      vars,
      initialApolloState: await ssrRequest(req, [
        {
          document: GetPostDocument,
          variables: vars,
        },
        {
          document: GetCurrentUserDocument,
        },
      ]),
    },
  };
};

export default PostPage;
