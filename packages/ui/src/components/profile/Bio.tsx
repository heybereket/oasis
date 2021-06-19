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
      <div
        className="mt-8 bg-gray-800 rounded-xl py-6 px-6 max-w-full w-[100vw]"
      >
<<<<<<< HEAD
        <TabMeta
          title={`About ${name}`}
          description={
           bio !== null ? markdown(bio ?? '') : `@${username} does not have a bio set.`
          }
        />

=======
        <h4 className="font-extrabold">About {name}</h4>
        {bio !== null ? (
          <div className="text-gray-300 font-bold">
            {markdown(bio ?? '')}
            {/* <StyledMarkdown text={bio ?? ''} isBio={true} /> */}
          </div>
        ) : (
          <h5 className="text-gray-300 font-bold">
            @{username} currently does not have a bio set.
          </h5>
        )}
>>>>>>> 7fce666a92af237b071febcfa189221276be7198
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
