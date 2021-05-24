import { addType } from '@root/bot-client-gen';
import { registerEnumType } from 'type-graphql';

export enum NotificationType {
  Follow = 'FOLLOW',
  Like = 'LIKE',
  Reply = 'REPLY',
}

registerEnumType(NotificationType, { name: 'NotificationType' });

addType(`
enum NotificationType {
  Follow = 'FOLLOW',
  Like = 'LIKE',
  Reply = 'REPLY',
}
`);
