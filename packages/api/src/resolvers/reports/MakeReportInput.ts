import { IsOptional, IsNotEmpty, Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { ReportType } from '@enums/Reports';

@InputType()
export default class MakeReportInput {
  @Field(() => ReportType)
  type: ReportType;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @Length(0, 400)
  information?: string;
}
