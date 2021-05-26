import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import {
  Navbar,
  Sidebar,
  RightArrow,
  FriendActivity,
  TopicBadge,
  Post,
  FollowUser,
  CreatePostInput,
  UserSection,
  PostsSection, SidebarSection, FriendActivitySection
} from '@oasis-sh/ui';
import {
  PaginatePostsDocument,
  PaginatePostsQueryVariables,
  useLikeDislikePostMutation,
  usePaginatePostsQuery,
  useMakePostMutation,
} from '@oasis-sh/client-gql';
import StyledMarkdown from 'src/markdown/StyledMarkdown';
import { login, logout } from '@lib/login';
import { SEO } from '@utils/SEO';

interface IndexPageProps {
  initialApolloState: any;
  vars: PaginatePostsQueryVariables;
}

const HomePage: React.FC<IndexPageProps> = ({ vars }) => {
  const { data } = usePaginatePostsQuery({
    variables: vars,
  });

  const [createPost] = useMakePostMutation();

  const { user, currentUserLoading } = useGetCurrentUser();
  const posts = data?.paginatePosts;

  const [likeDislikePost] = useLikeDislikePostMutation();

  if (!posts) {
    return null;
  }

  return (
    <>
      <SEO title="Feed" />
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <div className="flex flex-col items-center w-full">
        <div className="z-10 relative px-6 grid grid-cols-1 lg:grid-cols-three gap-16">
          <div className="hidden lg:flex flex-col flex-1 sticky top-28 h-px">
            <div className="flex-shrink-0 w-full flex flex-col py-6 px-8 bg-gray-800 rounded-2xl">
              <UserSection currentUserLoading={currentUserLoading} user={user}></UserSection>
            </div>
            <FriendActivitySection></FriendActivitySection>
          </div>
          <div className="flex flex-col flex-1 w-full space-y-12 pb-12 mt-[33px]">
            <PostsSection user={user} posts={posts} createPost={createPost} likeDislikePost={likeDislikePost} ></PostsSection>
          </div>
          <div className="hidden lg:flex flex-col flex-1 sticky top-28 h-px">
            <div className="w-full flex flex-col items-center">

              <SidebarSection></SidebarSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IndexPageProps> = async ({
  req,
}) => {
  const vars: PaginatePostsQueryVariables = {
    postsLimit: 25,
    postsOffset: 0,
  };
  return {
    props: {
      initialApolloState: await ssrRequest(req, [
        {
          document: PaginatePostsDocument,
          variables: vars,
        },
      ]),
      vars,
    },
  };
};

export default HomePage;
