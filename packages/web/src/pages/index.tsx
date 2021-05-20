import React from 'react';
import Link from 'next/link';
import { Navbar } from '@components/navbar/Navbar';
import { Post } from '@components/post/Post';
import { TopicBadge } from '@components/profile/TopicBadge';
import { Button } from '@components/common/Button';
import { FollowUser } from '@components/home/FollowUser';
import { Sidebar } from '@components/home/Sidebar';
import { FriendActivity } from '@components/home/FriendActivity';
import {
  PaginatePostsDocument,
  PaginatePostsQueryVariables,
  usePaginatePostsQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';

interface IndexPageProps {
  initialApolloState: any;
  vars: PaginatePostsQueryVariables;
}

const HomePage: React.FC<IndexPageProps> = ({ vars }) => {
  const { data } = usePaginatePostsQuery({
    variables: vars,
  });

  const { user, currentUserLoading } = useGetCurrentUser();
  const posts = data?.paginatePosts;

  if (!posts) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full">
        <div className="relative px-6 mt-14 grid grid-cols-1 lg:grid-cols-three gap-16">
          <div className="hidden lg:flex flex-col flex-1 sticky top-14 h-screen">
            <div className="w-full flex flex-col py-6 px-8 bg-gray-800 rounded-2xl">
              {currentUserLoading || (
                <>
                  <div className="flex items-center space-x-4">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-14 h-14 rounded-full"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-600" />
                    )}
                    <div>
                      <p className="font-bold text-xl">
                        {user ? user.name : 'Alex'}
                      </p>
                      <p className="font-bold text-light -mt-1">
                        {user ? '@' + user.username : '@alexover1'}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3">
                    {user
                      ? user.bio
                      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum'}
                  </p>
                  <Link href={user ? `/user/${user.username}` : '/user/alex'}>
                    <>
                      <p className="mt-2 font-bold text-lg text-primary">
                        u/{user ? user.username : 'alexover1'}
                      </p>
                    </>
                  </Link>
                </>
              )}
            </div>
            <Sidebar title="Friends Activity">
              <div className="mt-6 flex flex-col space-y-4">
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
          <div className="flex flex-col flex-1 w-full space-y-12 pb-12">
            {[...posts].reverse().map((post: any, index: number) => (
              <Post post={post} key={index} />
            ))}
          </div>
          <div className="hidden lg:flex flex-col flex-1 sticky top-14 h-screen">
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-center">
                <h3>Something on your mind?</h3>
                <Button color="primary" className="mt-6 mb-7 max-w-200 w-full">
                  Make a Post
                </Button>
                <div className="flex">
                  Your most popular posts are about
                  <p className="font-bold">&nbsp;TypeScript&nbsp;</p> and
                  <p className="font-bold">&nbsp;Oasis</p>.
                </div>
              </div>
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
              <Sidebar title="Find New People">
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
