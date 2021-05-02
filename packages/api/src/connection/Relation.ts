import { BaseEntity } from './BaseEntity';
import { FieldData } from './types';
import { fields_data } from './Deserialize';

export interface RelationFieldData {
  type: 'relation';
  fieldName: string;
  entity: string;
}

export const entityMapping = new Map<string, typeof BaseEntity>();

export const registerEntity = (entity: typeof BaseEntity) => {
  entityMapping.set(entity.name, entity);
};

export const Relation = (entity: string): PropertyDecorator => (
  target,
  propKey
) => {
  const fieldName = String(propKey);

  const fields: FieldData[] =
    Reflect.getMetadata(fields_data, target.constructor) || [];

  const fieldData: RelationFieldData = {
    type: 'relation',
    fieldName,
    entity,
  };

  fields.push(fieldData);
  Reflect.defineMetadata(fields_data, fields, target.constructor);
};
