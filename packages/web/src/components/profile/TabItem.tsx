import React, { MouseEventHandler } from 'react';

interface NavItemProps {
  name: string;
  active: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const TabItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  return (
    <div
      className={`cursor-pointer px-5 rounded-lg py-2 font-bold text-lg flex ${
        props.active && 'bg-gray-700'
      }`}
      onClick={props.onClick}
    >
      <props.icon className="w-6 md:mr-2" />
      <div className="hidden md:block">{props.name}</div>
    </div>
  );
};
