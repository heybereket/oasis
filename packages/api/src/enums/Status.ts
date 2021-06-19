import { registerEnumType } from 'type-graphql';

export enum Status {
  Online = 'Online',
  Away = 'Away',
  DoNotDisturb = 'DoNotDisturb',
  Offline = 'Offline',
}

registerEnumType(Status, {
  name: 'Status',
});
