import 'reflect-metadata';
import { ReportType } from '@modules/reports/ReportTypes';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@ObjectType()
@Entity()
export default class Report extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  resolved: boolean;

  @Column()
  @Field()
  type: ReportType;

  @ManyToOne(() => User, (user: User) => user.reports)
  @Field(() => User)
  reporter: User;

  @ManyToOne(() => User, (user) => user.filedReports)
  @Field(() => User)
  accuse: Promise<User>;

  @Column({ nullable: true })
  @Field({ nullable: true })
  information?: string;

  @Column()
  @Field()
  createdAt: string;
}
