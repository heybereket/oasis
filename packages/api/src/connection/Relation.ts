import { BaseEntity } from './BaseEntity';
import { FieldData } from './types';

export const fields_data = '__Fields_Data__';

export interface RelationFieldData {
  type: 'relation';
  name: string;
  multi?: boolean;
  entity: typeof BaseEntity;
}

export interface Options {
  multi?: boolean;
}

export const Relation = (
  entity: typeof BaseEntity,
  { multi = false }: Options = {}
): PropertyDecorator => (target, propertyKey) => {
  const fields: FieldData[] =
    Reflect.getMetadata(fields_data, target.constructor) || [];

  const fieldData: RelationFieldData = {
    type: 'relation',
    name: String(propertyKey),
    multi,
    entity,
  };

  fields.push(fieldData);
  Reflect.defineMetadata(fields_data, fields, target.constructor);
};
