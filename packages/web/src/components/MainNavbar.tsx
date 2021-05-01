import firebase from 'firebase';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from './Button';
import { NavItem } from './NavItem';

export const Navbar: React.FC = () => {
  const [isOn, toggleIsOn] = useState(false);
  const [user] = useAuthState(firebase.auth());
  const router = useRouter();

  return (
    <>
      <nav className="hidden sm:flex items-center justify-between p-8 bg-gray-800 ">
        <div className="flex justify-items-start items-center space-x-5">
          <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-28" />
          <NavItem name="Home" href="#" />
          <NavItem name="Topics" href="#" />
          <NavItem name="Friends" href="#" />
          <NavItem name="Saved" href="#" />
        </div>
        <div className="flex justify-items-start items-center space-x-6 ml-4">
          <div className="flex items-center relative">
            <img src="/static/magnifying-glass.svg" className="absolute ml-3" />
            <input
              placeholder="Search"
              className="rounded-lg bg-gray-700 h-10 text-sm pl-11 text-gray-300 w-40 lg:w-80"
            />
          </div>
          <img src="/static/Bell.svg" />
          {user && (
            <img
              src={user?.photoURL ?? undefined}
              alt={user?.displayName ?? undefined}
              className="w-12 h-12 rounded-full"
            />
          )}
          <img src="/static/Down-Arrow.svg" />
        </div>
      </nav>

      {/*mobile navbar*/}
      <nav className="max-w-full mx-auto p-8 sm:hidden">
        <div className="flex items-center justify-between">
          <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-28" />
          <ul className="flex items-center space-x-6 md:space-x-10 text-lg text-gray-300">
            <li>
              <img src="/static/mobile-magnifying-glass.svg" />
            </li>
            <li>
              <svg
                width="26"
                height="28"
                viewBox="0 0 26 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0183 24.791C14.805 25.1588 14.4988 25.464 14.1304 25.6762C13.7621 25.8883 13.3444 26 12.9193 26C12.4942 26 12.0766 25.8883 11.7082 25.6762C11.3399 25.464 11.0337 25.1588 10.8204 24.791M20.1989 9.01869C20.1989 7.08803 19.4319 5.23645 18.0667 3.87127C16.7016 2.50609 14.85 1.73914 12.9193 1.73914C10.9887 1.73914 9.13709 2.50609 7.77191 3.87127C6.40673 5.23645 5.63978 7.08803 5.63978 9.01869C5.63978 17.5115 2 19.938 2 19.938H23.8387C23.8387 19.938 20.1989 17.5115 20.1989 9.01869Z"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li>
              {user && (
                <img
                  onClick={() => {
                    toggleIsOn(!isOn);
                  }}
                  src={user?.photoURL ?? undefined}
                  alt={user?.displayName ?? undefined}
                  className="w-9 h-9 rounded-full mr-8"
                />
              )}
            </li>
          </ul>
          {/* <Button
            onClick={() => {
              toggleIsOn(!isOn);
            }}
            className="w-10 h-10 flex items-center justify-center text-xl"
            color="gray"
          >
            ☰
          </Button> */}
        </div>

        <div
          className={
            isOn
              ? 'max-w-md flex rounded-lg justify-end animate-fade-in-down bg-gray-700 float-right px-6 py-2'
              : 'opacity-0 flex rounded-lg animate-fade-out-up bg-gray-700 max-w-md float-right px-6 py-2 justify-end'
          }
        >
          <ul className="flex items-center space-x-6 md:space-x-10 text-base text-gray-300">
            <li>
              <a href="#" className="hover:text-gray-200">
                Feed
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Followers
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  firebase.auth().signOut();
                  router.push('/');
                }}
                href="#"
                className="hover:text-gray-200"
              >
                Logout
              </a>
            </li>
            <li>
              <Button size="sm">Post</Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
