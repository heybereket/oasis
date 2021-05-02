import { adminDB } from '../utils/common/admin-db';
import { BaseEntity } from './BaseEntity';
import { fields_data } from './Deserialize';
import { FieldData } from './types';

export const entity_data = Symbol('__Entity_Data__');

export type FirebaseCollection = FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

export interface EntityOptions {
  // Deserialize the firebase document data for the entity
  deserialize?: (orig: any) => any;

  // Serialize the firebase document data for the entity
  serialize?: (orig: any) => any;
}

export interface EntityData {
  name: string;
  collection: FirebaseCollection;
  options?: EntityOptions;
  fields: FieldData[];
}

/**
 * This maps every name of an entity to the entity itself
 * It may look useless but serves a significant purpose
 */
export const entityMapping = new Map<string, typeof BaseEntity>();

/** An array of the data for every entity **/
export const allEntities: EntityData[] = [];

/**
 *
 * The Entity Decorator. When applied to a class, this decorator registers it as an entity
 * This data is used to connect to the firebase collection it represents
 *
 * @param collectionName The name of the firebase collection
 */
export const Entity = (collectionName: string, options: EntityOptions = {}) => <
  T extends typeof BaseEntity
>(
  Constructor: T
) => {
  const fields = Reflect.getMetadata(fields_data, Constructor) || [];

  const data: EntityData = {
    name: Constructor.name,
    collection: adminDB.collection(collectionName),
    options,
    fields,
  };

  allEntities.push(data);
  entityMapping.set(Constructor.name, Constructor);

  Reflect.defineMetadata(entity_data, data, Constructor);
};
