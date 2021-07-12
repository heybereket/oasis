import React from 'react';
import { Button } from '../shared/Button';

interface Props {
  name: string;
  username: string;
}

export const FollowUser: React.FC<Props> = ({ name, username }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex-none bg-gray-600 rounded-full w-11 h-11" />
        <div>
          <p className="text-lg font-bold">{name}</p>
          <p className="-mt-1 font-bold text-light">@{username}</p>
        </div>
      </div>
      <Button color="primary" className="px-10">
        Follow
      </Button>
    </div>
  );
};
