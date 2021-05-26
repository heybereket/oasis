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
          loading="lazy"
          alt="avatar"
        />
      ))}
    </div>
  );
};

export default AvatarGroup;
