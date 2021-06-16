import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export default class Badge extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  imagePath: string;

  @Column()
  @Field()
  level: number;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  createdAt: string;
}
