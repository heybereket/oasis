import { adminDB } from "../utils/admin-db";

export const entity_data = Symbol("__Entity_Data__");

export type FirebaseCollection = FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

export interface EntityOptions {
  /**
   * Deserialize the firebase document data for the entity
   */
  deserialize?: (orig: any) => any;

  /**
   * Serialize the firebase document data for the entity
   */
  serialize?: (orig: any) => any;
}

export interface EntityData {
  name: string;
  collection: FirebaseCollection;
  options?: EntityOptions;
  // fields: DocFieldData[];
}

export const allEntities: EntityData[] = [];

/**
 * @param collectionName The name of the firebase collection
 */
export const Entity = (collectionName: string, options: EntityOptions = {}) => <
  T extends { new (...args: any[]): any }
>(
  Constructor: T
) => {
  const data: EntityData = {
    name: Constructor.name,
    collection: adminDB.collection(collectionName),
    options,
    // fields,
  };

  allEntities.push(data);

  Reflect.defineMetadata(entity_data, data, Constructor);
};
