import React from 'react';

type Props = {
  size: 'small' | 'large';
  followers: number | undefined | null;
  following: number | undefined | null;
  posts: number | undefined | null;
};

export const FollowersInfo: React.FC<Props> = ({
  size,
  followers,
  following,
  posts,
}) => {
  return (
    <div
      className={
        size === 'large'
          ? 'mt-8 flex bg-gray-800 rounded-2xl py-4 justify-center gap-8 space-x-2'
          : 'mt-6 flex justify-center gap-8 md:hidden space-x-2'
      }
    >
      <div className="flex flex-col text-center leading-4">
        <span className="text-2xl font-black">{followers}</span>
        <span className="font-extrabold text-sm">Followers</span>
      </div>
      <div className="flex flex-col text-center leading-4">
        <span className="text-2xl font-black">{posts}</span>
        <span className="font-extrabold text-sm">Posts</span>
      </div>
      <div className="flex flex-col text-center leading-4">
        <span className="text-2xl font-black">{following}</span>
        <span className="font-extrabold text-sm">Following</span>
      </div>
    </div>
  );
};
