import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity } from '../connection';
import { Deserializer } from '../connection/Deserialize';
import { registerEntity, Relation } from '../connection/Relation';
import User from './User';

@ObjectType()
@Entity('repos')
export default class Repo extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field()
  active: boolean;

  @Field()
  name: string;

  @Field()
  full_name: string;

  @Field()
  github_owner: string;

  @Field()
  issues: number;

  @Field()
  desc: string;

  @Field()
  language: string;

  @Field()
  stars: number;

  @Field()
  url: string;

  @Deserializer((timestamp: FirebaseFirestore.Timestamp) =>
    timestamp.toMillis().toString()
  )
  @Field(() => String, {
    description:
      'Time when the repo was added (the number of milliseconds passed since Unix epoch 1970-01-01T00:00:00Z)',
  })
  date_added: any;

  @Field(() => User)
  @Relation('User')
  owner: any;
}

registerEntity(Repo);
