import { fields_data } from './Relation';
import { FieldData } from './types';

export interface DeserializerFieldData {
  type: 'deserializer';
  name: string;
  deserialize: (origVal: any) => any | Promise<any>;
}

export const Deserializer = (
  deserialize: DeserializerFieldData['deserialize']
): PropertyDecorator => (target, propertyKey) => {
  // Get all the data for fields from Reflect.getMetadata

  const fields: FieldData[] =
    Reflect.getMetadata(fields_data, target.constructor) || [];

  // Save the new field to it

  const fieldData: DeserializerFieldData = {
    type: 'deserializer',
    name: String(propertyKey),
    deserialize,
  };
  fields.push(fieldData);

  Reflect.defineMetadata(fields_data, fields, target.constructor);
};
