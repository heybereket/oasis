import firebase from 'firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [user] = useAuthState(firebase.auth());

  return (
    <nav className="max-w-5xl mx-auto flex items-center justify-between py-8">
      <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-32" />
      <ul className="flex items-center space-x-6 md:space-x-10 text-lg text-gray-300">
        <li>
          <a href="#" className="hover:text-gray-200">Feed</a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-200">Followers</a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-200">Logout</a>
        </li>
        <li>
          <Button size="sm">Post</Button>
        </li>
        <li>
          {user && <img src={user?.photoURL ?? undefined} alt={user?.displayName ?? undefined} className="w-12 h-12 rounded-full" />}
        </li>
      </ul>
    </nav>
  );
};
