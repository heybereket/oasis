import React from 'react';
import TabMeta from './TabMeta';

type Props = {
  bio: string | undefined | null;
  name: string | undefined | null;
  username: string | undefined | null;
  badges: any[] | undefined | null;
  markdown: (text: string) => JSX.Element;
};

export const Bio: React.FC<Props> = ({
  bio,
  name,
  username,
  badges,
  markdown,
}) => {
  return (
    <div className="mt-8 bg-gray-800 rounded-xl py-6 px-6 max-w-full w-[100vw]">
      <TabMeta
        title={`About ${name}`}
        description={
          bio !== null
            ? markdown(bio ?? '')
            : `@${username} does not have a bio set.`
        }
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
  );
};
