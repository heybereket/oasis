import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import User from './User';
import { BCEntity, BCField } from '@root/bot-client-gen';
import { Field, ID, ObjectType } from 'type-graphql';
export default class Connection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() token: string;
  @Column() refreshToken: string;

  /*@Field(() => User)
  @ManyToOne(() => User, (user) => user.connections)
  @BCField({ type: 'User' })
  user: Promise<User>;*/

  @Column() connectionMethod: String;
}
