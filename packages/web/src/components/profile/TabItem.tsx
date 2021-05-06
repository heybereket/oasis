import { MouseEventHandler } from 'react';

interface NavItemProps {
  name: string;
  active: boolean;
  icon?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const TabItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  return (
    <div
      className={`mr-4 px-5 rounded-lg py-2 font-bold text-lg flex ${
        props.active && 'bg-gray-700'
      }`}
      onClick={props.onClick}
    >
      <img
        src={`/static/${props.icon ? props.icon : props.name}.svg`}
        className="w-6 mr-2"
      ></img>
      {props.name}
    </div>
  );
};
