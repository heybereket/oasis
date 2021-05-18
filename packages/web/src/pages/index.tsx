import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { Post } from '@components/post/Post';
import { TopicBadge } from '@components/profile/TopicBadge';
import { Button } from '@components/common/Button';
import { FollowUser } from '@components/home/FollowUser';
import { SidebarItem } from '@components/home/SidebarItem';

const testData = [
  {
    content:
      'The quick brown fox jumped over the lazy sleeping dog. This post is very long. There is a lot of content. Oh no, it might break onto the next line!',
    name: 'Alex',
    username: 'alexover1',
  },
  {
    content:
      'The quick brown fox jumped over the lazy sleeping dog. This post is very long. There is a lot of content. Oh no, it might break onto the next line!',
    name: 'Alex',
    username: 'alexover1',
  },
  {
    content:
      'The quick brown fox jumped over the lazy sleeping dog. This post is very long. There is a lot of content. Oh no, it might break onto the next line!',
    name: 'Alex',
    username: 'alexover1',
  },
  {
    content: 'To the mooooon! 🚀',
    name: 'f1sh',
    username: 'F1shNotFound',
  },
  {
    content: 'Code example',
    code: '```js\n function cat = () => { return "meow" }\n```',
    name: 'Bereket',
    username: 'heybereket',
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <div className="px-6 mt-14 grid grid-cols-1 md:grid-cols-three gap-16">
          <section className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-9 gap-y-12">
              {testData &&
                testData.map((post, index) => <Post post={post} key={index} />)}
            </div>
          </section>
          <section className="hidden md:flex flex-col items-center">
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
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
