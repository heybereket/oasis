import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { Post } from '@components/post/Post';
import { TopicBadge } from '@components/profile/TopicBadge';
import { Button } from '@components/common/Button';

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-14">
        <div className="col-span-2 flex justify-center">
          <section className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Post name="Alex" username="alex" votes={500} />
              <Post name="Bereket" username="bereket" votes={999} />
              <Post name="Henry" username="henry" votes={230} />
              <Post name="F1sh" username="f1sh" votes={95} />
            </div>
          </section>
        </div>

        <section className="hidden md:flex flex-col items-center">
          <div className="max-w-[420px] flex flex-col items-center">
            <article className="flex flex-col items-center">
              <h2>Something on your mind?</h2>
              <Button color="primary" className="my-4 max-w-[200px] w-full">
                Make a Post
              </Button>
              <div className="flex">
                Your most popular posts are about
                <p className="font-bold">&nbsp;TypeScript&nbsp;</p> and
                <p className="font-bold">&nbsp;Oasis</p>.
              </div>
            </article>
            <article className="mt-10 w-full flex flex-col items-center bg-gray-800 rounded-2xl py-4 px-6">
              <h3 className="font-extrabold">Trending on Oasis</h3>
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
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
