import React from 'react';
import { CustomLink } from '../../providers/CustomLink';

interface NavItemProps {
  name: string;
  href?: string;
  to?: string;
  onClick: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string;
}

export const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const Icon = props.icon;
  const onClick = props.onClick;
  const onClickRedirect = (_: any) => {
    onClick();
  };

  return (
    <div
      className={`flex items-center justify-between hover:opacity-80 cursor-pointer px-2 space-x-3 ${props.className} p-4`}
      onClick={onClickRedirect}
    >
      <Icon />
      <CustomLink
        href={props.href}
        className="hidden lg:block font-extrabold text-white text-lg"
      >
        {props.name}
      </CustomLink>
    </div>
  );
};
