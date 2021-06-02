import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';
import { Navbar, ResortCard } from '@oasis-sh/ui';
import React from 'react';

const Resort: React.FC = () => {
  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />

      <div className={`flex-col flex h-1/2 mt-12 w-full md:pl-32 pl-1`}>
        <div>
          <h2>Resorts</h2>
          <span className={`text-secondary`}>
            Choose a category to explore resort.
          </span>
        </div>
        <div className={`mt-16 min-h-1/2`}>
          <ResortCard />
        </div>
      </div>
    </>
  );
};

export default Resort;
