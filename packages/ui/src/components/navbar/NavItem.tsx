import React from 'react';

interface NavItemProps {
  name: string;
  href?: string;
  to?: string;
  onClick: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string
}

export const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const Icon = props.icon;
  let href = props.href;
  const onClick = props.onClick;
  const onClickRedirect = (event: any) => {
      event.preventDefault();
      onClick();
  };
  const className = props.className

  if (props.to !== undefined && props.to !== null) {
    href = props.to;
  }

  return (
    <div
      className={`flex items-center justify-between hover:opacity-80 cursor-pointer px-2 space-x-3 ${className} p-4`}
      onClick={onClickRedirect}
    >
      <Icon />
      <a
        href={href ? href : '#'}
        className="hidden lg:block font-extrabold text-white text-lg"
      >
        {props.name}
      </a>
    </div>
  );
};
