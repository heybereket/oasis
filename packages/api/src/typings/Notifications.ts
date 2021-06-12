import { registerEnumType } from 'type-graphql';

export enum NotificationType {
  Follow = 'FOLLOW',
  LikePost = 'LIKE_POST',
  Comment = 'COMMENT',
  LikeComment = 'LIKE_COMMENT',
  ReplyComment = 'REPLY_COMMENT',
}

registerEnumType(NotificationType, { name: 'NotificationType' });
