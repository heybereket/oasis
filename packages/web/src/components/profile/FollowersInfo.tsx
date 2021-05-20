import React from 'react';

type Props = {
  size: 'small' | 'large';
};

export const FollowersInfo: React.FC<Props> = ({ size }) => {
  return (
    <div
      className={
        size === 'large'
          ? 'mt-8 flex bg-gray-800 rounded-2xl py-4 justify-center gap-8'
          : 'mt-6 flex justify-center gap-12 md:hidden'
      }
    >
      <div className="flex flex-col text-center leading-4">
        <span className="text-2xl font-black">666</span>
        <span className="font-extrabold text-sm">Followers</span>
      </div>
      <div className="flex flex-col text-center leading-4">
        <span className="text-2xl font-black">69</span>
        <span className="font-extrabold text-sm">Posts</span>
      </div>
      <div className="flex flex-col text-center leading-4">
        <span className="text-2xl font-black">420</span>
        <span className="font-extrabold text-sm">Following</span>
      </div>
    </div>
  );
};
