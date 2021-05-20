import React from 'react';

interface IAvatarGroupProps {
  avatarIcons: string[];
}

const AvatarGroup: React.FC<IAvatarGroupProps> = ({ avatarIcons }) => {
  return (
    <div className="flex -space-x-1 overflow-hidden">
      {avatarIcons.map((icon) => (
        <img
          key={icon}
          className="inline-block h-6 w-6 rounded-full"
          src={icon}
          alt=""
        />
      ))}
      {/* <img
        className="inline-block h-6 w-6 rounded-full"
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block h-6 w-6 rounded-full"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
        alt=""
      />
      <img
        className="inline-block h-6 w-6 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      /> */}
    </div>
  );
};

export default AvatarGroup;
