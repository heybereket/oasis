import { adminDB } from "../utils/admin-db";

export const entity_data = Symbol("__Entity_Data__");

export type FirebaseCollection = FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

export interface EntityData {
  name: string;
  collection: FirebaseCollection;
  // fields: DocFieldData[];
}

export const allEntities: EntityData[] = [];

/**
 * @param collectionName The name of the firebase collection
 */
export const Entity = (collectionName: string) => <
  T extends { new (...args: any[]): any }
>(
  Constructor: T
) => {
  const data: EntityData = {
    name: Constructor.name,
    collection: adminDB.collection(collectionName),
    // fields,
  };

  allEntities.push(data);

  Reflect.defineMetadata(entity_data, data, Constructor);
};
