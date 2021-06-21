import React from 'react';
import { RightArrow } from '../../icons';
import { CustomLink } from '../../providers/CustomLink';
import { useTranslations } from '../../locales/LocalesProvider';

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
  const useT = useTranslations();
  return (
    <>
      {currentUserLoading || (
        <div>
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
          <div className="mt-3">
            {user?.bio !== null ? (
              <StyledMarkdown text={user?.bio ?? ''} isBio={true} />
            ) : (
              <p>Your bio has not been set.</p>
            )}
          </div>
          <CustomLink
            className="flex items-center space-x-0.5 mt-2"
            href={`/u/${user?.username}`}
          >
            <div className="flex flex-row font-bold text-lg text-primary">
              <p>{useT((l) => l.profileCard.view)}</p>
              <RightArrow />
            </div>
          </CustomLink>
        </div>
      )}
    </>
  );
};
