import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Entity } from '../connection';
import { Relation } from '../connection/Relation';
import User from './User';

@ObjectType()
@Entity('repos', {
  deserialize: (orig: Repo) => ({
    ...orig,
    date_added: orig.date_added.toMillis().toString(),
  }),
})
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

  @Field(() => String, {
    description:
      'Time when the repo was added (the number of milliseconds passed since Unix epoch 1970-01-01T00:00:00Z)',
  })
  date_added: any;

  @Field(() => User)
  @Relation()
  owner: any;
}
