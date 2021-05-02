import { IsOptional, IsUrl, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  banner?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 100)
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatar?: string;
}
