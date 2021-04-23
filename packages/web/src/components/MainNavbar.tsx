import firebase from 'firebase';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isOn, toggleIsOn] = useState(false);
  const [user] = useAuthState(firebase.auth());
  const router = useRouter();

  return (
    <>
      <nav className="hidden max-w-5xl mx-auto sm:flex items-center justify-between py-8">
        <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-32" />
        <ul className="flex items-center space-x-6 md:space-x-10 text-lg text-gray-300">
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
          <li>
            {user && (
              <img
                src={user?.photoURL ?? undefined}
                alt={user?.displayName ?? undefined}
                className="w-12 h-12 rounded-full"
              />
            )}
          </li>
        </ul>
      </nav>

      {/*mobile navbar*/}
      <nav className="sm:hidden max-w-5xl mx-auto py-8">
        <div className="flex items-center justify-between">
          <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-32" />
          <Button
            onClick={() => {
              toggleIsOn(!isOn);
            }}
            className="w-10 h-10 flex items-center justify-center text-xl"
            color="gray"
          >
            ☰
          </Button>
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
            <li className={user ? '' : 'hidden'}>
              {user && (
                <img
                  src={user?.photoURL ?? undefined}
                  alt={user?.displayName ?? undefined}
                  className="w-12 h-12 rounded-full"
                />
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
