import React, { MouseEventHandler } from 'react';

interface DropdownItemProps {
  name: string;
  href?: string;
  onClick?: MouseEventHandler;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const Icon = props.icon;

  return (
    <div
      className="flex justify-between hover:opacity-80 cursor-pointer px-2 space-x-3"
      onClick={props.onClick}
    >
      <Icon />
      <p className="font-medium text-white">{props.name}</p>
    </div>
  );
};
