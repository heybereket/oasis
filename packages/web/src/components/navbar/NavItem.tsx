import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';

interface NavItemProps {
  name: string;
  href?: string;
  to?: string;
  onClick?: MouseEventHandler;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const Icon = props.icon;
  let href = props.href;
  let onClick = props.onClick;

  if (props.to !== undefined && props.to !== null) {
    const router = useRouter();

    onClick = (event: any) => {
      event.preventDefault();
      (router as any).push(props.to);
    };
    href = props.to;
  }

  return (
    <div
      className="flex items-center justify-between hover:opacity-80 cursor-pointer px-2 space-x-3"
      onClick={onClick ? onClick : undefined}
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
