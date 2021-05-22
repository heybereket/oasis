import React from 'react';

type Props = {
  avatar: string | undefined | null;
  username: string | undefined | null;
  name: string | undefined | null;
};

export const SmallUserCard: React.FC<Props> = ({ avatar, name, username }) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <img
        src={avatar ?? ''}
        className="rounded-full w-32 h-32 md:w-36 md:h-36"
      ></img>
      <div className="mt-4 md:mt-6 text-center md:ml-6">
        {name ? (
          <>
            <h2 className="leading-none md:text-5xl">{name}</h2>
            <h5 className="text-gray-400 font-bold mt-1 md:text-xl">
              @{username}
            </h5>
          </>
        ) : (
          <h1>@{username}</h1>
        )}
      </div>
    </div>
  );
};
