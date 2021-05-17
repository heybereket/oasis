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
            <Post />
            <Post />
            <Post />
          </div>
        </div>
        <div className="hidden md:flex flex-col items-center">
          <h2>Something on your mind?</h2>
          <button className="font-bold w-full md:w-1/3 bg-primary px-8 py-2 rounded-lg">
            Make a Post
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
