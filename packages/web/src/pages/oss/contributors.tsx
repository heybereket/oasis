import React from 'react';
import { Navbar, Contributors } from '@oasis-sh/ui';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/login';

export const ContributorsPage: React.FC = () => {
  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <Contributors />
    </>
  );
};

export default ContributorsPage;
