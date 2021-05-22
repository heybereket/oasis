import {
  Bell,
  Friends,
  Home,
  Search,
  Saved,
  Topics,
  Profile as ProfileIcon,
  Logout as LogoutIcon,
} from "../../index";
import React, { useRef, useState } from "react";
import { Button } from "../../index";
import { NavItem } from "../../index";
import { DropdownItem } from "../../index";
import { useRouter } from "next/router";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";
import { User } from "@oasis-sh/client-gql";

interface INavbarProps {
  user?: User;
  currentUserLoading: boolean;
}

export const Navbar: React.FC<INavbarProps> = ({
  currentUserLoading,
  user,
}) => {
  const [isDropdownActive, setDropdownActive] = useState(false);
  const router = useRouter();

  const node = useRef(null);
  useOnClickOutside(node, () => setDropdownActive(false));

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
                src="/static/OasisLogo.png"
                alt="Oasis Logo"
                className="w-28 mr-8 pb-1"
              />
            </a>
          </div>

          <div className="hidden md:flex space-x-3">
            <NavItem name="Home" to="/" icon={Home} />
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
            <Search className="absolute ml-3" />

            <input
              placeholder="Search"
              className="rounded-lg bg-gray-700 h-10 text-sm pl-11 text-gray-300 w-80 focus:outline-none"
            />
          </div>
          <Bell className="hidden sm-50:block" />
          {/* Improved the logic here  */}
          {currentUserLoading || !user ? (
            <Button
              size="sm"
              className="my-1"
              onClick={async () => {
                // TODO: Login
                //await Login("github");
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
                {/*fixed the rendering logic here */}
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
                      <DropdownItem
                        name="Profile"
                        icon={ProfileIcon}
                        onClick={() => {
                          router.push("/user/" + user?.username);
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start text-base text-gray-300 mt-3">
                      <DropdownItem
                        name="Logout"
                        icon={LogoutIcon}
                        onClick={async () => {
                          // TODO: Add logout
                          // await Logout();
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
