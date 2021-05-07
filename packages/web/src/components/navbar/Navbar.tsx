import { GitHubLogin, Logout } from 'src/modules/auth';
import {
  Bell,
  DownArrow,
  Friends,
  Home,
  MagnifyingGlass,
  Saved,
  Search,
  Topics,
  Logout as LogoutIcon,
} from '@components/icons';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../common/Button';
import { NavItem } from './NavItem';
import { DropdownItem } from '../common/DropdownItem';
import { useGetCurrentUser } from 'src/modules/user/getCurrentUser';

export const Navbar: React.FC = () => {
  const [isDropdownActive, setDropdownActive] = useState(false);
  const { user, currentUserLoading } = useGetCurrentUser();

  const node = useRef() as React.MutableRefObject<HTMLInputElement>;
  const handleClick = (e: MouseEvent) => {
    if (node?.current?.contains(e.target as Node)) return;
    // outside click
    setDropdownActive(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm-50:px-6 md:px-8 py-4">
        <div className="flex justify-items-start items-center">
          <div className="mr-3">
            <a href="/" className="block md:hidden">
              <img src="/static/Logo.svg" alt="Oasis Logo" className="w-9" />
            </a>
            <a href="/" className="hidden md:block">
              <img
                src="/static/OasisLogo.png"
                alt="Oasis Logo"
                className="w-28"
              />
            </a>
          </div>

          <div className="hidden md:flex space-x-3">
            <NavItem name="Home" href="#" icon={Home} />
            <NavItem name="Topics" href="#" icon={Topics} />
            {user && (
              <>
                <NavItem name="Friends" href="#" icon={Friends} />
                <NavItem name="Saved" href="#" icon={Saved} />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-items-start items-center space-x-8 ml-4">
          <div className="hidden md-50:flex items-center relative">
            <MagnifyingGlass className="absolute ml-3" />

            <input
              placeholder="Search"
              className="rounded-lg bg-gray-700 h-10 text-sm pl-11 text-gray-300 w-80"
            />
          </div>
          <Search className="ml-3 md-50:hidden" />
          <Bell className="hidden sm-50:block" />

          {!currentUserLoading ? (
            /* Only show user segment or login button if user is loaded! */
            user ? (
              <div
                className="flex justify-items-start items-center space-x-5"
                onClick={() => {
                  setDropdownActive(!isDropdownActive);
                }}
                ref={node}
              >
                <img
                  src={user.avatar ?? undefined}
                  alt={user.name ?? undefined}
                  className="w-12 h-12 rounded-full"
                />
                <DownArrow className="hidden md-50:block" />
              </div>
            ) : (
              <Button
                size="sm"
                className="my-1"
                onClick={async () => {
                  await GitHubLogin();
                }}
              >
                Login
              </Button>
            )
          ) : (
            <div className="w-20 mr-2 h-12"></div>
          )}
        </div>
      </nav>
      <div
        className={`flex rounded-lg bg-gray-700 px-4 py-3 max-w-md absolute right-0 mr-7 ${
          isDropdownActive
            ? 'animate-fade-in-down'
            : 'animate-fade-out-up animate-fill-forwards'
        }`}
        ref={node}
      >
        <div className="flex flex-col justify-start items-start text-base text-gray-300">
          <DropdownItem
            name="Logout"
            icon={LogoutIcon}
            onClick={async () => {
              await Logout();
              setDropdownActive(false);
            }}
          />
        </div>
      </div>
    </>
  );
};
