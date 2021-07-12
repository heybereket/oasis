import { DropdownItem } from '../navbar/DropdownItem';
import { Button } from '../shared/Button';
import {
  Bell,
  Search,
  Profile as ProfileIcon,
  Logout as LogoutIcon,
} from '../../icons';
import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { User } from '@oasis-sh/react-gql';
import { redirect } from '../../utils/redirect';
import { CustomLink } from '../../providers/CustomLink';

interface INavbarProps {
  user?: User | undefined;
  currentUserLoading: boolean;
  login: (provider: string) => Promise<void>;
  logout: () => Promise<void>;
  defaultSearchText?: string;
}

export const HomeTopBar: React.FC<INavbarProps> = ({
  currentUserLoading,
  user,
  login,
  logout,
  defaultSearchText,
}) => {
  const [isDropdownActive, setDropdownActive] = useState(false);
  const [searchText, setSearchText] = useState(defaultSearchText ?? '');

  const node = useRef(null);
  useOnClickOutside(node, () => setDropdownActive(false));

  return (
    <>
      <nav className="w-full sticky top-0 bg-gray-light flex items-center justify-between px-4 sm-50:px-6 md:px-8 py-4">
        <div></div>
        <div className="flex justify-items-start items-center space-x-8 ml-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              redirect('/search?q=' + searchText.replace(/ /g, '+'));
            }}
          >
            <div className="hidden md-50:flex items-center relative">
              <Search className="absolute ml-3" />

              <input
                placeholder="Search for People, Posts, etc..."
                className="rounded-lg bg-gray-2dark h-10 text-sm font-bold pl-11 text-gray-400 w-80 focus:outline-none overflow-ellipsis"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </form>
          {user && (
            <CustomLink href="/notifications">
              <Bell className="hidden sm-50:block cursor-pointer" />
            </CustomLink>
          )}
          {/* Improved the logic here  */}
          {currentUserLoading || !user ? (
            <Button
              size="sm"
              className="my-1"
              onClick={async () => {
                await login('github');
              }}
            >
              Login
            </Button>
          ) : (
            <div
              className="flex justify-items-start flex-col items-center space-x-5"
              ref={node}
            >
              <img
                src={user.avatar ?? undefined}
                alt={`@${user.username}` ?? undefined}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => {
                  setDropdownActive((current) => !current);
                }}
                id="navbar-user-avatar"
              />
              <div className="flex">
                {isDropdownActive && (
                  <div className="flex absolute flex-col rounded-lg bg-gray-700 px-4 py-3 max-w-md z-50 right-0 mr-7">
                    <div className="flex flex-col justify-start items-start text-base text-gray-300">
                      <CustomLink href={`/u/${user?.username}`}>
                        <DropdownItem name="Profile" icon={ProfileIcon} />
                      </CustomLink>
                    </div>
                    <div className="flex flex-col justify-start items-start text-base text-gray-300 mt-3">
                      <DropdownItem
                        name="Logout"
                        icon={LogoutIcon}
                        onClick={async () => {
                          await logout();
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="h-0.5 bg-gray-dark w-full !mt-0" />{' '}
      {/* !mt-0 is used to overide the space tag on the parent */}
    </>
  );
};
