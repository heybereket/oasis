import { registerEnumType } from 'type-graphql';

export enum Role {
  SuperAdmin = 'SUPERADMIN',
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
}

registerEnumType(Role, {
  name: 'Role',
});
