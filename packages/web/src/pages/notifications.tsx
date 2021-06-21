import { Navbar, NotificationBlock, NotificationWrapper } from '@oasis-sh/ui';
import React from 'react';
import { useGetCurrentUser } from '@lib/common/getCurrentUser';
import { login, logout } from '@lib/auth/login';
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from '@oasis-sh/react-gql';
import { useRouter } from 'next/router';

interface NotificationPageProps {}

const NotificationPage: React.FC<NotificationPageProps> | any = () => {
  const { user, currentUserLoading } = useGetCurrentUser();
  const { data, loading, error } = useGetNotificationsQuery();

  const router = useRouter();

  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  if (data?.getNotifications) {
    data.getNotifications.forEach((notification) => {
      markNotificationAsRead({
        variables: { notificationId: notification.id },
      });
    });
  }

  if (error) {
    router.push('/');
  }

  return (
    <>
      <Navbar
        user={user}
        currentUserLoading={currentUserLoading}
        login={login}
        logout={logout}
      />
      <div className="flex flex-row justify-center mt-12 mb-4">
        <div style={{ width: 573 }}>
          <NotificationWrapper>
            {loading && <h1 className="text-2xl">Loading...</h1>}
            {data?.getNotifications &&
              data.getNotifications.map((value: any) => (
                <NotificationBlock
                  key={value.id}
                  avatar={value.performer?.avatar}
                  name={value.performer?.name}
                  type={value.type}
                  username={value.performer?.username}
                  read={value.read}
                />
              ))}
            {!data?.getNotifications?.length && !loading && (
              <h5>
                {
                  "Uh, oh. Seems upvote you don't have any notifications yet. Too bad."
                }
              </h5>
            )}
          </NotificationWrapper>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
