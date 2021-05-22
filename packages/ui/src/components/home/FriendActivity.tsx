import React from 'react';

interface Props {
  name: string;
  activity: Array<string>;
  avatarUrl?: string;
}

export const FriendActivity: React.FC<Props> = ({
  name,
  activity,
  avatarUrl,
}) => {
  return (
    <div className="flex items-center space-x-4">
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="w-11 h-11 rounded-full" />
      ) : (
        <div className="bg-gray-600 w-11 h-11 rounded-full" />
      )}
      <div>
        <p className="font-bold text-lg">{name}</p>
        <div className="text-light -mt-1 flex space-x-1">
          {activity &&
            activity.map((item: string, index: number) =>
              index % 2 === 0 ? (
                <p key={index}>{item}</p>
              ) : (
                <p className="font-bold" key={index}>
                  {item}
                </p>
              )
            )}
        </div>
      </div>
    </div>
  );
};
