import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { Post } from '@components/post/Post';
import { TopicBadge } from '@components/profile/TopicBadge';
import { Button } from '@components/common/Button';
import { FollowUser } from '@components/home/FollowUser';
import { SidebarItem } from '@components/home/SidebarItem';
import {
  PaginatePostsDocument,
  PaginatePostsQueryVariables,
  usePaginatePostsQuery,
} from '@oasis/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { Modal } from '@components/common/Modal';

interface IndexPageProps {
  initialApolloState: any;
  vars: PaginatePostsQueryVariables;
}

const HomePage: React.FC<IndexPageProps> = ({ vars }) => {
  const { data } = usePaginatePostsQuery({
    variables: vars,
  });
  const posts = data?.paginatePosts;

  const [open, setOpen] = React.useState(false);

  if (!posts) return null;

  const result = posts.reduce((acc: any, letter, ndx) => {
    acc[ndx % 2] = acc[ndx % 2] || [];
    acc[ndx % 2].push(letter);
    return acc;
  }, []);

  const [firstHalf, secondHalf] = result;

  return (
    <>
      <Navbar />
      <Modal open={open} closeHandler={() => setOpen(false)}>
        <p>This is a test of modals</p>
      </Modal>
      <div className="w-full flex justify-center items-center">
        <div className="px-6 mt-14 grid grid-cols-1 md:grid-cols-three gap-16">
          <div className="flex justify-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-9">
              <div className="w-full space-y-12 pb-12">
                {firstHalf.map((post: any, index: number) => (
                  <Post post={post} key={index} />
                ))}
              </div>
              <div className="w-full space-y-12 pb-12">
                {posts.length > 1 &&
                  secondHalf.map((post: any, index: number) => (
                    <Post post={post} key={index} />
                  ))}
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-center">
                <h2>Something on your mind?</h2>
                <Button
                  color="primary"
                  className="mt-6 mb-7 max-w-[200px] w-full"
                >
                  Make a Post
                </Button>
                <div className="flex">
                  Your most popular posts are about
                  <p className="font-bold">&nbsp;TypeScript&nbsp;</p> and
                  <p className="font-bold">&nbsp;Oasis</p>.
                </div>
              </div>
              <SidebarItem title="Trending on Oasis">
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
              </SidebarItem>
              <SidebarItem title="Find New People">
                <div className="mt-6 space-y-3">
                  <FollowUser name="Bereket" username="heybereket" />
                  <FollowUser name="Alex" username="alexover1" />
                  <FollowUser name="Sam" username="samjakob" />
                </div>
              </SidebarItem>
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
