import React from 'react';
import { Comments } from '@icons/posts/Comments';

export const Post: React.FC = () => {
  return (
    <div className="max-w-[550px] w-full min-h-[220px] bg-gray-700 p-4 rounded-2xl flex flex-col justify-between">
      <div>
        <header className="flex items-center space-x-4">
          <div className="bg-gray-600 rounded-full w-11 h-11" />
          <div>
            <p className="text-lg font-bold">Alex</p>
            <p className="-mt-1 text-gray-200 font-bold">@alexover1</p>
          </div>
        </header>
        <p className="my-4 text-lg break-words">
          The quick brown fox jumped over the lazy sleeping dog. This post is
          very long. There is a lot of content. Oh no, it might break onto the
          next line!
        </p>
      </div>
      <footer className="flex justify-between">
        <p className="text-sm font-bold">9:44PM • May 17th 2021</p>
        <div className="flex items-center">
          <p className="text-sm">12 replies&nbsp;</p>
          <Comments />
        </div>
      </footer>
    </div>
  );
};
