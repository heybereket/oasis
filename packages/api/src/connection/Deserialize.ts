import { FieldData } from './types';

export const fields_data = Symbol('Fields_Data');

export type Deserializer = (origVal: any) => any | Promise<any>;
export interface DeserializerFieldData {
  type: 'deserializer';
  fieldName: string;
  deserialize: Deserializer;
}

/**
 * The Deserializer decorator. A field decorator (the other is Relation found in `/src/connection/Relation`).
 *
 * This decorator allows a single firebase field to be modified before releasing it via the api
 */
export const Deserializer = (deserialize: Deserializer): PropertyDecorator => (
  target,
  propertyKey
) => {
  // Get all the data for fields from Reflect.getMetadata

  const fields: FieldData[] =
    Reflect.getMetadata(fields_data, target.constructor) || [];

  // Save the new field to the list of fields
  const fieldData: DeserializerFieldData = {
    type: 'deserializer',
    fieldName: String(propertyKey),
    deserialize,
  };

  fields.push(fieldData);
  Reflect.defineMetadata(fields_data, fields, target.constructor);
};
