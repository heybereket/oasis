import React from 'react';

interface ProfilePostProps {
  avatar_url: string;
  name: string;
  atTag: string;
  //So these are strings instead of numbers as when we get to the thousands, we will abbreviate them to 1.2k for example.
  //hence, i dont want numbers to get involved
  quotes: string;
  likes: string;
  replies: string;
  message: string;
}

export const ProfilePost: React.FC<ProfilePostProps> = ({
  avatar_url,
  name,
  atTag,
  quotes,
  likes,
  replies,
  message,
}: ProfilePostProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={avatar_url}
          alt={name}
        />
        <div>
          <p className="font-bold ">{name}</p>
          <p className="text-gray-300">{'@' + atTag}</p>
        </div>
      </div>
      <div className="flex mb-2.5 text-gray-300">
        <p>{quotes} Quotes</p>
        {/*cool separator effect that looks like |*/}
        <div className="w-4 mr-4 border-r border-gray-500 rotate-90" />
        <p>{likes} likes</p>
        {/*cool separator effect that looks like |*/}
        <div className="w-4 mr-4 border-r border-gray-500 rotate-90" />
        <p>{replies} replies</p>
      </div>
      <p>{message}</p>
    </div>
  );
};
