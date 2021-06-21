import { NotificationType } from '@oasis-sh/react-gql';
import React from 'react';
import { Friends, Upvote, Posts } from '../../icons';
import { CustomLink } from '../../providers/CustomLink';

interface Props {
  avatar: string;
  name: string;
  read: boolean;
  username: string;
  type: NotificationType;
}

interface INotificationMap {
  type: NotificationType;
  icon: JSX.Element;
  message: string;
}

const NotificationMap: INotificationMap[] = [
  {
    type: NotificationType.Follow,
    icon: <Friends />,
    message: 'followed you',
  },
  {
    type: NotificationType.UpvotePost,
    icon: <Upvote />,
    message: 'upvoted your post',
  },
  {
    type: NotificationType.Comment,
    icon: <Posts />,
    message: 'commented on your post',
  },
  {
    type: NotificationType.UpvoteComment,
    icon: <Upvote />,
    message: 'upvoted your comment',
  },
];

export const NotificationBlock: React.FC<Props> = ({
  avatar,
  read,
  username,
  type,
}) => {
  const notification = NotificationMap.find((x) => {
    return x.type === type;
  });

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex items-center">
        <CustomLink href={`/u/${username}`}>
          <img
            src={avatar ?? undefined}
            alt={`@${username}`}
            className="w-10 h-10 rounded-full cursor-pointer"
            id="navbar-user-avatar"
          />
        </CustomLink>
        <div className="mx-4">{notification?.icon}</div>
        <p className="text-lg">
          <b>{username}</b> {notification && notification.message}
        </p>
      </div>
      {!read && <div className="rounded-full bg-primary h-3 w-3"></div>}
    </div>
  );
};

export default NotificationBlock;
