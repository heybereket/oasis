import { BCEntity, BCField, PublicField } from '@root/bot-client-gen';
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
@BCEntity('badges')
export default class Badge extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @BCField()
  id: string;

  @Column()
  @PublicField()
  name: string;

  @Column()
  @PublicField()
  imagePath: string;

  @Column()
  @PublicField()
  level: number;

  @Column()
  @PublicField()
  description: string;

  @Column()
  @PublicField()
  createdAt: string;
}
