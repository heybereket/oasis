import React from 'react';
import { Navbar, Contributors } from '@oasis-sh/ui';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';
import { SEO } from '@shared/SEO';

export const ContributorsPage: React.FC = () => {
  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <SEO
        title="Contributors - Oasis"
        description="See the contributors who make Oasis possible"
      />
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <div className="container mx-auto">
        <div className="text-center">
          <h1>Oasis Contributors</h1>
          <h4 className="text-gray-700">
            Thank you to everyone that has contributed to Oasis {'<3'}
          </h4>
        </div>
        <Contributors />
      </div>
    </>
  );
};

export default ContributorsPage;
