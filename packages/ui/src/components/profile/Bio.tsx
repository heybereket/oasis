import TabData from './TabData';
import React from 'react';

type Props = {
  bio: string | undefined | null;
  name: string | undefined | null;
  username: string | undefined | null;
  badges: any[] | undefined | null;
  marginTop: '4' | '8';
  markdown: (text: string) => JSX.Element;
};

export const Bio: React.FC<Props> = ({
  bio,
  name,
  username,
  badges,
  marginTop,
  markdown,
}) => {
  return (
    <>
      <div
        className={`mt-${marginTop} bg-gray-800 rounded-xl py-6 px-6 max-w-full w-[100vw]`}
      >
        <TabData
          title={`About ${name}`}
          content={bio !== null ? markdown(bio ?? '') : `@${username} currently does not have a bio.`}
        />

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
