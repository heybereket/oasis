import { MouseEventHandler } from 'react';

interface DropdownItemProps {
  name: string;
  href?: string;
  onClick?: MouseEventHandler;
}

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  return (
    <div
      className="flex justify-between hover:opacity-80 cursor-pointer px-2"
      onClick={props.onClick ? props.onClick : undefined}
    >
      <img className="mr-3 w-5" src={`/static/${props.name}.svg`} />
      <a
        href={props.href ? props.href : '#'}
        className="font-extrabold text-white"
      >
        {props.name}
      </a>
    </div>
  );
};
