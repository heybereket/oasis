import React from 'react';
import { RightArrow } from '@oasis-sh/ui';
type Props = {
  user: any;
  currentUserLoading: boolean;
  StyledMarkdown: any;
};

export const ProfileSection: React.FC<Props> = ({
  user,
  currentUserLoading,
  StyledMarkdown,
}) => {
  return (
    <>
      {currentUserLoading || (
        <>
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-14 h-14 rounded-full"
            />
            <div>
              <p className="font-bold text-xl">{user?.name}</p>
              <p className="font-bold text-light -mt-1">@{user?.username}</p>
            </div>
          </div>
          <p className="mt-3">
            {user?.bio !== null ? (
              <StyledMarkdown text={user?.bio ?? ''} isBio={true} />
            ) : (
              'Your bio has not been set.'
            )}
          </p>
          <a href={`/user/${user?.username}`}>
            <a className="flex items-center space-x-0.5 mt-2">
              <p className="font-bold text-lg text-primary">View Profile</p>
              <RightArrow className="text-primary" />
            </a>
          </a>
        </>
      )}
    </>
  );
};
