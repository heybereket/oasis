import { registerEnumType } from 'type-graphql';

export enum NotificationType {
  Follow = 'FOLLOW',
  UpvotePost = 'LIKE_POST',
  Comment = 'COMMENT',
  UpvoteComment = 'LIKE_COMMENT',
  ReplyComment = 'REPLY_COMMENT',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
});
