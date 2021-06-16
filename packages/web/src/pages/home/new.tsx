import React from 'react';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import StyledMarkdown from '@parser/markdown/StyledMarkdown';
import { login, logout } from '@lib/auth/login';
import { SEO } from '@shared/SEO';
import {
  Navbar,
  FollowUserSection,
  FriendActivitySection,
  NewPostsSection,
  ProfileSection,
  TrendingSection,
  HomeTopBar,
} from '@oasis-sh/ui';
import {
  useLikeDislikePostMutation,
  useMakePostMutation,
  GetCurrentUserDocument,
  useDeletePostMutation,
  useFeedSortPostsQuery,
  FeedSortPostsQueryVariables,
  FeedSortPostsDocument,
  useReportEntityMutation,
} from '@oasis-sh/react-gql';
import Link from 'next/link';

interface IndexPageProps {
  initialApolloState: any;
  vars: FeedSortPostsQueryVariables;
}

const HomePage: React.FC<IndexPageProps> = ({ vars }) => {
  const postsQuery = useFeedSortPostsQuery({
    variables: vars,
  });

  const [createPost] = useMakePostMutation({
    onError: (e) => {
      console.log(e.message);
    },
    onCompleted: () => {
      window.location.reload();
    },
  });

  const { user, currentUserLoading } = useGetCurrentUser();
  const posts = postsQuery.data?.feedSortPosts;

  const [likeDislikePost] = useLikeDislikePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [reportPost] = useReportEntityMutation();

  return (
    <>
      <SEO
        title="Feed - Oasis"
        description="The social platform for developers"
      />
      <div className="flex flex-col items-center w-full bg-gray-light">
        <div className="grid w-full grid-cols-1 2xl:grid-cols-three-new">
          {/* Left Column */}
          <div className="hidden 2xl:flex flex-col flex-1 h-full bg-gray-dark">
            <div className="sticky top-0 p-5">
              <Link href="/">
                <img
                  src="/static/OasisLogo.svg"
                  alt="Oasis Logo"
                  className="w-28 pb-5"
                />
              </Link>
              <div>
                <div>
                  <p className="text-gray-text text-xl font-bold">FEED</p>
                </div>
                <div>
                  <p className="text-gray-text text-xl font-bold">POSTS</p>
                </div>
                <div>
                  <p className="text-gray-text text-xl font-bold">
                    YOUR RESORTS
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Center Column */}
          <div className="flex flex-col flex-1 space-y-12 pb-12 w-full h-full">
            <HomeTopBar
              user={user}
              currentUserLoading={currentUserLoading}
              login={login}
              logout={logout}
            />
            <div className="px-6">
              <NewPostsSection
                amountPerFetch={vars.postsLimit}
                StyledMarkdown={StyledMarkdown}
                user={user}
                posts={posts ?? []}
                createPost={createPost}
                likeDislikePost={likeDislikePost}
                deleteMutation={deletePost}
                fetch={async (limit, offset) => {
                  const newData = (
                    await postsQuery.fetchMore({
                      variables: {
                        postsLimit: limit,
                        postsOffset: offset,
                      },
                    })
                  ).data.feedSortPosts;
                  return newData;
                }}
                reportPost={reportPost}
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="hidden 2xl:flex flex-col flex-1 sticky top-0 h-full bg-gray-dark">
            <div className="w-full flex flex-col items-center sticky top-0 p-5 pt-16">
              {user ? (
                <ProfileSection
                  user={user}
                  currentUserLoading={currentUserLoading}
                  StyledMarkdown={StyledMarkdown}
                />
              ) : (
                'Login to view your profile card.'
              )}
              <FollowUserSection />
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
  const vars: FeedSortPostsQueryVariables = {
    postsLimit: 20,
    postsOffset: 0,
  };
  return {
    props: {
      initialApolloState: await ssrRequest(req, [
        {
          document: FeedSortPostsDocument,
          variables: vars,
        },
        {
          document: GetCurrentUserDocument,
        },
      ]),
      vars,
    },
  };
};

export default HomePage;
