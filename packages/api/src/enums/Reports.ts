import { registerEnumType } from 'type-graphql';

export enum ReportType {
  InappropriateContent = 'INAPPROPRIATE_CONTENT',
}

registerEnumType(ReportType, {
  name: 'ReportType',
});
