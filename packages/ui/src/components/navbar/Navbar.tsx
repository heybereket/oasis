import { NavItem } from '../navbar/NavItem';
import { DropdownItem } from '../navbar/DropdownItem';
import { Button } from '../common/Button';
import {
  Bell,
  Friends,
  Home,
  Search,
  Saved,
  Topics,
  Profile as ProfileIcon,
  Logout as LogoutIcon,
} from "../../icons";
import React, { useRef, useState } from "react";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";
import { User } from "@oasis-sh/client-gql";

interface INavbarProps {
  user?: User;
  currentUserLoading: boolean;
  login: (provider: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const Navbar: React.FC<INavbarProps> = ({
  currentUserLoading,
  user,
  login,
  logout,
}) => {
  const [isDropdownActive, setDropdownActive] = useState(false);

  const node = useRef(null);
  useOnClickOutside(node, () => setDropdownActive(false));

  enum activeTabType {
    TEST = 'TEST',
    HOME = 'HOME',
    TOPICS = 'TOPICS',
    FRIENDS = 'FRIENDS',
    SAVED = 'SAVED'
  }

  const [activeTab, setActiveTab] = useState(activeTabType.HOME);

  const getIsActive = (type: activeTabType) => {
    return activeTab === type ? "active" : "";
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gray-900 flex items-center justify-between px-4 sm-50:px-6 md:px-8 py-4">
        <div className="flex justify-items-start items-center">
          <div className="mr-3">
            <a href="/" className="block md:hidden">
              <img src="/static/Logo.svg" alt="Oasis Logo" className="w-9" />
            </a>
            <a href="/" className="hidden md:block">
              <img
                src="/static/OasisLogo.svg"
                alt="Oasis Logo"
                className="w-28 mr-8 pb-1"
              />
            </a>
          </div>

          <div className="hidden md:flex space-x-3 h-full absolute top-0 md:left-48 ">
            <NavItem name="Home" href="#" icon={Home}
                className={getIsActive(activeTabType.HOME)}
                onClick={() => setActiveTab(activeTabType.HOME)}
            />
            <NavItem name="Topics" href="#" icon={Topics}
                className={getIsActive(activeTabType.TOPICS)}
                onClick={() => setActiveTab(activeTabType.TOPICS)}
            />
            {user && (
              <>
                <NavItem name="Friends" href="#" icon={Friends}
                    className={getIsActive(activeTabType.FRIENDS)}
                    onClick={() => setActiveTab(activeTabType.FRIENDS)}
                />
                <NavItem name="Saved" href="#" icon={Saved}
                    className={getIsActive(activeTabType.SAVED)}
                    onClick={() => setActiveTab(activeTabType.SAVED)}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex justify-items-start items-center space-x-8 ml-4">
          <div className="hidden md-50:flex items-center relative">
            <Search className="absolute ml-3" />

            <input
              placeholder="Search for People, Posts, etc..."
              className="rounded-lg bg-gray-700 h-10 text-sm font-bold pl-11 text-gray-500 w-80 focus:outline-none overflow-ellipsis"
            />
          </div>
          <Bell className="hidden sm-50:block" />
          {/* Improved the logic here  */}
          {currentUserLoading || !user ? (
            <Button
              size="sm"
              className="my-1"
              onClick={async () => {
                await login("github");
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
              />
              <div className="flex">
                {/* fixed the rendering logic here */}
                {isDropdownActive && (
                  <div
                    className={`flex absolute flex-col rounded-lg bg-gray-700 px-4 py-3 max-w-md z-50 right-0 mr-7  ${
                      isDropdownActive
                        ? "animate-fade-in-down"
                        : "animate-fade-out-up animate-fill-forwards"
                    }`}
                    ref={node}
                  >
                    <div className="flex flex-col justify-start items-start text-base text-gray-300">
                      <a href={`/user/${user?.username}`}>
                        <DropdownItem
                          name="Profile"
                          icon={ProfileIcon}
                        />
                      </a>
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
    </>
  );
};
