import { MouseEventHandler } from 'react';

interface NavItemProps {
  name: string;
  mobile: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  return !props.mobile ? (
    <div className="flex justify-between">
      <img className="mr-3" src={`/static/${props.name}.svg`} />
      <a
        href={props.href}
        className="hidden md:block font-extrabold text-white hover:text-gray-200"
      >
        {props.name}
      </a>
    </div>
  ) : (
    <a
      href={props.href ? props.href : '#'}
      onClick={props.onClick}
      className="hover:text-gray-200"
    >
      {props.name}
    </a>
  );
};
