interface NavItemProps {
  href: string;
  name: string;
}

export const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  return (
    <div className="flex justify-between">
      <img className="mr-3" src={`/static/${props.name}.svg`} />
      <a
        href={props.href}
        className="hidden md:block font-extrabold text-white hover:text-gray-200"
      >
        {props.name}
      </a>
    </div>
  );
};
