import StyledMarkdown from '@components/markdown/StyledMarkdown';
import React from 'react';

type Props = {
  bio: string | undefined | null;
  name: string | undefined | null;
  username: string | undefined | null;
  badges: any[] | undefined | null;
  marginTop: '4' | '8';
};

export const Bio: React.FC<Props> = ({
  bio,
  name,
  username,
  badges,
  marginTop,
}) => {
  return (
    <>
      <div className={`mt-${marginTop} bg-gray-800 rounded-xl py-6 px-6`}>
        <h4 className="font-extrabold">About {name}</h4>
        {bio !== null ? (
          <div className="text-gray-300 font-bold">
            <StyledMarkdown text={bio ?? ''} />
          </div>
        ) : (
          <h5 className="text-gray-300 font-bold">
            Hmm, it seems like @{username} does not have a bio set.
          </h5>
        )}
        <div className="flex">
          {badges?.map((badge) => (
            <img
              key={badge.id}
              title={badge.description}
              src={`/static/badges/${badge.imagePath}`}
              className="bg-[#306EEA] px-1 py-1 mx-2 my-3 rounded-full flex items-center justify-center"
            />
          ))}
        </div>
      </div>
    </>
  );
};
