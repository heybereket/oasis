import { Login, Logout } from '@lib/auth';
import { BellIcon } from '@components/SVG';
import React, { useState } from 'react';
import { Button } from './Button';
import { NavItem } from './NavItem';
import { useGetCurrentUser } from '@lib/getCurrentUser';

export const Navbar: React.FC = () => {
  const [isUserDropdownActive, setUserDropdownActive] = useState(false);
  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <nav className="hidden md:flex items-center justify-between px-8 py-4 bg-gray-800">
        <div className="flex justify-items-start items-center space-x-5">
          <a href="/">
            <img
              src="/static/oasis-logo.png"
              alt="Oasis Logo"
              className="w-28 lg:mr-12"
            />
          </a>

          <NavItem name="Home" href="#" mobile={false} />
          <NavItem name="Topics" href="#" mobile={false} />
          <NavItem name="Friends" href="#" mobile={false} />
          <NavItem name="Saved" href="#" mobile={false} />
        </div>
        <div className="flex justify-items-start items-center space-x-8 ml-4">
          <div className="flex items-center relative">
            <img src="/static/magnifying-glass.svg" className="absolute ml-3" />
            <input
              placeholder="Search"
              className="rounded-lg bg-gray-700 h-10 text-sm pl-11 text-gray-300 w-40 lg:w-80"
            />
          </div>
          <BellIcon />

          {!currentUserLoading ? (
            /* Only show user segment or login button if user is loaded! */
            user ? (
              <div
                className="flex justify-items-start items-center space-x-5"
                onClick={() => {
                      setUserDropdownActive(!isUserDropdownActive);
                  }}>
                <img
                  src={user.avatar ?? undefined}
                  alt={user.name ?? undefined}
                  className="w-12 h-12 rounded-full"
                />

                <img
                  src="/static/Down-Arrow.svg"
                />
              </div>
            ) : (
              <Button
                size="sm"
                className="my-1"
                onClick={async () => {
                  await Login();
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

      {/* User dropdown menu */}
        <div
          className={`flex rounded-b-lg bg-gray-700 px-6 py-4 max-w-md absolute right-0 mr-6 ${
            isUserDropdownActive ? 'animate-fade-in-down' : 'hidden'
          }`}
        >
        <div className="flex flex-col justify-start items-start text-base text-gray-300">
          <NavItem
            name="Logout"
            onClick={async () => {
              await Logout();
              setUserDropdownActive(false);
            }}
            mobile={false}
          />
        </div>
      </div>

      {/*mobile navbar*/}
      <nav className="max-w-full mx-auto px-8 py-4 md:hidden">
        <div className="flex items-center justify-between">
          <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-28" />
          <div className="flex items-center space-x-6 md:space-x-10 text-lg text-gray-300">
            <img src="/static/Search.svg" />
            <BellIcon />

            {user ? (
              <img
                src={user?.avatar ?? undefined}
                alt={user?.name ?? undefined}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <Button
                size="sm"
                onClick={async () => {
                  await Login();
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
