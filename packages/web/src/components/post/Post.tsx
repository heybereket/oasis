import React from 'react';
import { Comments, SmallUpArrow, SmallDownArrow } from '@icons/index';

export const Post: React.FC = () => {
  return (
    <div className="shadow-lg max-w-[550px] w-full min-h-[220px] bg-gray-800 px-5 pt-2 pb-4 rounded-2xl flex flex-col justify-between">
      <div>
        <header className="flex items-center space-x-4">
          <div className="flex-none bg-gray-600 rounded-full w-11 h-11" />
          <div className="flex items-center justify-between w-full">
            <div>
              <p className="text-lg font-bold">Alex</p>
              <p className="-mt-1 text-gray-200 font-bold">@alexover1</p>
            </div>
            <div className="flex flex-col items-center">
              <SmallUpArrow />
              <p className="font-bold bg-gray-700 px-2 rounded-full">23</p>
              <SmallDownArrow />
            </div>
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
        <div className="flex items-center space-x-2">
          <p className="text-sm">12 replies</p>
          <Comments />
        </div>
      </footer>
    </div>
  );
};
