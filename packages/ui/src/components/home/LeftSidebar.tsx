import React from 'react';

interface ItemProps {
  name: string;
  icon: any;
  active: boolean;
}

interface TitleProps {
  name: string;
}

export const LeftSidebarItem: React.FC<ItemProps> = ({
  name,
  icon,
  active,
}) => {
  return (
    <div
      className={`flex items-center mt-2 px-4 py-3 w-full rounded-xl ${
        !active ? 'bg-gray-bg' : 'bg-[#2F343F]'
      } p-4`}
    >
      {icon}
      <span className="text-lg capitalize font-bold ml-3 text-[#D3D5DA]">
        {name}
      </span>
    </div>
  );
};

export const LeftSidebarTitle: React.FC<TitleProps> = ({ name }) => {
  return (
    <p className="text-gray-text text-sm font-bold uppercase mb-2">{name}</p>
  );
};
