import { FieldData } from './types';
import { fields_data } from './Deserialize';

export interface RelationFieldData {
  type: 'relation';
  fieldName: string;
  entity: string;
}

/**
 * Registers a relational field
 *
 * @param entity The name of the entity that represents the data on the other side of the relation
 */
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
