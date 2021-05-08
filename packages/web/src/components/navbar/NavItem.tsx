import { MouseEventHandler } from 'react';

interface NavItemProps {
  name: string;
  href?: string;
  onClick?: MouseEventHandler;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const Icon = props.icon;
  return (
    <div
      className="flex items-center justify-between hover:opacity-80 cursor-pointer px-2 space-x-3"
      onClick={props.onClick ? props.onClick : undefined}
    >
      <Icon />
      <a
        href={props.href ? props.href : '#'}
        className="hidden lg:block font-extrabold text-white text-lg"
      >
        {props.name}
      </a>
    </div>
  );
};
