import React from 'react';

interface ProfilePostProps {
  avatarUrl: string;
  name: string;
  atTag: string;
  quotes: string;
  likes: string;
  replies: string;
  message: string;
}

export const ProfilePost: React.FC<ProfilePostProps> = ({
  avatarUrl,
  name,
  atTag,
  quotes,
  likes,
  replies,
  message,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={avatarUrl}
          alt="avatar"
        />
        <div>
          <p className="font-bold ">{name}</p>
          <p className="text-gray-300">@{atTag}</p>
        </div>
      </div>
      <div className="flex mb-4 text-gray-300 divide-x divide-gray-500">
        <p className="pr-4 leading-none">{quotes} Quotes</p>
        <p className="px-4 leading-none">{likes} likes</p>
        <p className="pl-4 leading-none">{replies} replies</p>
      </div>
      <p className="text-gray-200">{message}</p>
    </div>
  );
};
