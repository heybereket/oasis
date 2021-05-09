import { IsOptional, IsUrl, Length, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  banner?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @Length(0, 50)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @Length(0, 20)
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 255)
  bio?: string;
}
