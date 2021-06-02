import {
  GetCurrentUserDocument,
  UpdateProfileInput,
  useGetCurrentUserQuery,
} from '@oasis-sh/client-gql';
import { GetServerSideProps } from 'next';
import { ssrRequest } from '@lib/common/ssrRequest';
import { Navbar } from '@oasis-sh/ui';
import React from 'react';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';

interface NotificationPageProps {
  initialApolloState: any;
}

const NotificationPage: React.FC<NotificationPageProps> = () => {
  const origData = useGetCurrentUserQuery().data?.currentUser;
  const initialValues: UpdateProfileInput = {
    avatar: origData?.avatar,
    bio: origData?.bio,
    banner: origData?.banner,
    name: origData?.name,
    username: origData?.username,
  };

  const { user, currentUserLoading } = useGetCurrentUser();

  return (
    <>
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<NotificationPageProps> = async ({
  req,
}) => {
  return {
    props: {
      initialApolloState: await ssrRequest(req, [
        {
          document: GetCurrentUserDocument,
        },
      ]),
    },
  };
};

export default NotificationPage;
