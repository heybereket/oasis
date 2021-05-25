import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import {
  Navbar,
  Sidebar,
  FriendActivity,
  TopicBadge,
  Post,
  FollowUser,
  CreatePostInput,
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
              {currentUserLoading || (
                <>
                  <Link href={`/user/${user?.username}`}>
                    <a className="flex items-center space-x-4">
                      <img
                        src={user?.avatar}
                        alt=""
                        className="w-14 h-14 rounded-full"
                      />
                      <div>
                        <p className="font-bold text-xl">{user?.name}</p>
                        <p className="font-bold text-light -mt-1">
                          @{user?.username}
                        </p>
                      </div>
                    </a>
                  </Link>
                  <p className="mt-3">{user?.bio}</p>
                </>
              )}
            </div>
            <Sidebar title="Friends Activity" className="mt-10">
              <div className="flex-shrink-0 mt-6 flex flex-col space-y-4">
                <FriendActivity
                  name="Sam Jakob"
                  activity={['Playing', 'Visual Studio Code']}
                />
                <FriendActivity
                  name="Angshu31"
                  activity={['Listening to', 'Spotify']}
                />
                <FriendActivity
                  name="bereket"
                  activity={['Browsing', 'the Feed']}
                />
                <FriendActivity
                  name="Henry"
                  activity={['Idle for', '10 minutes']}
                />
              </div>
            </Sidebar>
          </div>
          <div className="flex flex-col flex-1 w-full space-y-12 pb-12 mt-[33px]">
            {user && (
              <CreatePostInput
                avatarUrl={user.avatar}
                onSubmit={(value: string) =>
                  createPost({ variables: { message: value, topics: [] } })
                }
              />
            )}
            {[...posts].reverse().map((post: any, index: number) => (
              <Post
                post={post}
                key={index}
                markdown={(text) => {
                  return <StyledMarkdown text={text} isPost={true} />;
                }}
                likePost={() => {
                  likeDislikePost({
                    variables: {
                      postId: post.id,
                      dislike: false,
                      like: true,
                    },
                  });
                }}
                dislikePost={() => {
                  likeDislikePost({
                    variables: {
                      postId: post.id,
                      dislike: true,
                      like: false,
                    },
                  });
                }}
              />
            ))}
          </div>
          <div className="hidden lg:flex flex-col flex-1 sticky top-28 h-px">
            <div className="w-full flex flex-col items-center">
              <Sidebar title="Trending on Oasis">
                <div className="mt-6">
                  <TopicBadge content="JavaScript" />
                  <TopicBadge content="Python" />
                  <TopicBadge content="Node.js" />
                  <TopicBadge content="Artificial Intelligence" />
                  <TopicBadge content="TypeScript" />
                  <TopicBadge content="Memes" />
                  <TopicBadge content="Programming" />
                  <TopicBadge content="Code" />
                  <TopicBadge content="CatsWhoCode" />
                </div>
              </Sidebar>
              <Sidebar title="Find New People" className="mt-10">
                <div className="mt-6 space-y-3">
                  <FollowUser name="Bereket" username="heybereket" />
                  <FollowUser name="Alex" username="alexover1" />
                  <FollowUser name="Sam" username="samjakob" />
                </div>
              </Sidebar>
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
