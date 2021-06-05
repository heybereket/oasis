import React from 'react';
import { Navbar, Post } from '@oasis-sh/ui';
import StyledMarkdown from '@parser/markdown/StyledMarkdown';
import { GetServerSideProps } from 'next';
import {
  GetCurrentUserDocument,
  GetPostDocument,
  GetPostQueryVariables,
  Post as TPost,
  useGetPostQuery,
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

  return (
    <>
      {/* <SEO
        title={data?.name ? data?.name : data?.username}
        metaDesc={`@${data?.username} — ${data?.bio ?? ''}`}
        metaImg={data?.avatar}
      /> */}
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
