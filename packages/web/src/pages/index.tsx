import React from 'react';
import { Navbar } from '@components/navbar/Navbar';
import { Post } from '@components/post/Post';

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-14">
        <div className="col-span-2 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Post
              name="Alex"
              username="alex"
              votes={500}
            />
            <Post
              name="Bereket"
              username="bereket"
              votes={999}
            />
            <Post
              name="Henry"
              username="henry"
              votes={230}
            />
            <Post
              name="F1sh"
              username="f1sh"
              votes={95}
            />
          </div>
        </div>
        <div className="hidden md:flex flex-col items-center">
          <div className="flex flex-col items-center space-y-10">
            <div className="flex flex-col items-center space-y-6">
              <h2>Something on your mind?</h2>
              <button className="max-w-[200px] w-full py-2.5 bg-primary rounded-lg font-bold">
                Make a Post
              </button>
              <p>Your most popular posts are about TypeScript and Oasis.</p>
            </div>
            <div className="w-full flex flex-col bg-gray-800 rounded-2xl py-4 px-6">
              <h4 className="font-extrabold">Trending on Oasis</h4>
              <div className="mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
