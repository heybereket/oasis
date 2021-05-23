import React, { useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { RightArrow } from '@oasis-sh/ui';
import {
  Navbar,
  Sidebar,
  FriendActivity,
  Button,
  TopicBadge,
  Post,
  Modal,
  FollowUser,
} from '@oasis-sh/ui';
import {
  PaginatePostsDocument,
  PaginatePostsQueryVariables,
  useLikeDislikePostMutation,
  usePaginatePostsQuery,
} from '@oasis-sh/client-gql';
import StyledMarkdown from 'src/markdown/StyledMarkdown';
import { Login, Logout } from '@lib/login';
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

  const [likeDislikePost] = useLikeDislikePostMutation();

  if (!posts) {
    return null;
  }

  return (
    <>
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={Login}
        logout={Logout}
      />
      <div className="flex flex-col items-center w-full">
        <Modal
          open={open}
          closeHandler={() => {
            setOpen(false);
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
          <div className="hidden lg:flex flex-col flex-1 sticky top-28 h-px">
            <div className="w-full flex flex-col py-6 px-8 bg-gray-800 rounded-2xl">
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
                        <p className="font-bold text-xl">
                          {user?.name}
                        </p>
                        <p className="font-bold text-light -mt-1">
                          @{user?.username}
                        </p>
                      </div>
                    </a>
                  </Link>
                  <p className="mt-3">
                    {user?.bio}
                  </p>
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
          <div className="flex flex-col flex-1 w-full space-y-12 pb-12 mt-[33px]">
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
              //<div key={index}>{JSON.stringify(post)}</div>
            ))}
          </div>
          <div className="hidden lg:flex flex-col flex-1 sticky top-28 h-px">
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
