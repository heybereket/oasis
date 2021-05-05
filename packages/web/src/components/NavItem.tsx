import { MouseEventHandler } from 'react';

interface NavItemProps {
  name: string;
  mobile: boolean;
  href?: string;
  onClick?: MouseEventHandler;
}

export const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  return !props.mobile ? (
    <div
      className="flex justify-between hover:opacity-80 cursor-pointer px-2"
      onClick={props.onClick ? props.onClick : undefined}
    >
      <img className="mr-3" src={`/static/${props.name}.svg`} />
      <a
        href={props.href ? props.href : '#'}
        className="hidden md:block font-extrabold text-white text-lg"
      >
        {props.name}
      </a>
    </div>
  ) : (
    <a href={props.href ? props.href : '#'} onClick={props.onClick}>
      {props.name}
    </a>
  );
};
