import React from 'react';
import { CustomLink } from '../../../providers/CustomLink';

type Props = {
  avatar: string | undefined | null;
  username: string | undefined | null;
  name: string | undefined | null;
};

export const LargeUserCard: React.FC<Props> = ({ avatar, name, username }) => {
  return (
    <div className="flex">
      <CustomLink href={`/user/${username}`}>
        <img
          src={avatar ?? ''}
          style={{ pointerEvents: 'none' }}
          className="rounded-full w-50 h-40"
        ></img>
      </CustomLink>
      <div className="ml-8 flex flex-col justify-center">
        {name ? (
          <>
            <h1 className="leading-none">{name}</h1>
            <h4 className="text-gray-400 font-bold">@{username}</h4>
          </>
        ) : (
          <h1>@{username}</h1>
        )}
      </div>
    </div>
  );
};
