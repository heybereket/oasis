import { addType } from '@root/bot-client-gen';
import { registerEnumType } from 'type-graphql';

export enum Role {
  SuperAdmin = 'SUPERADMIN',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
}

registerEnumType(Role, {
  name: 'Role',
});

addType(`
enum Role {
  SuperAdmin = 'SUPERADMIN',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
}
`);
