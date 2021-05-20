import React, { useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { RightArrow } from '@icons/index';
import {
  Navbar,
  Sidebar,
  FriendActivity,
  Button,
  TopicBadge,
  Post,
  Modal,
  FollowUser,
} from '@components/index';
import {
  PaginatePostsDocument,
  PaginatePostsQueryVariables,
  usePaginatePostsQuery,
} from '@oasis-sh/client-gql';
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

  const [open, setOpen] = useState(false);

  if (!posts) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-full">
        <Modal
          open={open}
          closeHandler={() => {
            setOpen(!open);
          }}
        >
          <form className="grid grid-cols-3 gap-5 w-full">
            <div className="col-span-3 block">
              <h4>New post</h4>
            </div>
            <div className="flex w-full h-full col-span-2">
              <input
                placeholder="Title"
                className="col-span-2 w-full h-11 px-4 py-2 bg-gray-600 rounded-lg focus:outline-none"
              />
            </div>
            <div className="col-span-1 w-full"></div>
            <textarea
              placeholder="What's on your mind?"
              className="col-span-3 px-4 py-2 resize-none w-full h-24 bg-gray-600 rounded-lg focus:outline-none"
            />
            <div className="col-span-full">
              <Button color="primary">New post</Button>
            </div>
          </form>
        </Modal>
        <div className="z-10 relative px-6 grid grid-cols-1 lg:grid-cols-three gap-16">
          <div className="hidden lg:flex flex-col flex-1 sticky top-32 h-screen">
            <div className="w-full flex flex-col py-6 px-8 bg-gray-800 rounded-2xl">
              {currentUserLoading || (
                <>
                  <Link
                    href={user ? `/user/${user.username}` : `/user/alexover1`}
                  >
                    <a className="flex items-center space-x-4">
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
                    </a>
                  </Link>
                  <p className="mt-3">
                    {user
                      ? user.bio
                      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum'}
                  </p>
                  <Link
                    href={user ? `/user/${user.username}` : '/user/alexover1'}
                  >
                    <a className="flex items-center space-x-0.5 mt-2">
                      <p className="font-bold text-lg text-primary">
                        u/{user ? user.username : 'alexover1'}
                      </p>
                      <RightArrow className="text-primary" />
                    </a>
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
          <div className="mt-32 flex flex-col flex-1 w-full space-y-12 pb-12">
            {[...posts].reverse().map((post: any, index: number) => (
              <Post post={post} key={index} />
            ))}
          </div>
          <div className="hidden lg:flex flex-col flex-1 sticky top-32 h-screen">
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-center">
                <h3>Something on your mind?</h3>
                <Button
                  onClick={() => setOpen(!open)}
                  color="primary"
                  className="mt-6 mb-7 max-w-200 w-full"
                >
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
