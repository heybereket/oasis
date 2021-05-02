import { EntityData, allEntities } from './Entity';
import { handleRelations } from './handleRelations';

type Constructor<T> = { new (): T };

// The BaseEntity: Filled with methods that can be used in every entity
export class BaseEntity {
  // The entity cache
  static _entity: EntityData;

  /** Gets the entity. This caches the entity once and uses that from then on */
  static get entity() {
    return (
      this._entity ||
      (this._entity = allEntities.find((e) => e.name === this.name))
    );
  }

  /**
   * Deserialize function. This takes in the firebase document data and returns the formatted version.
   * All Firebase DB Refs (relational fields) are converted into thenables that resolve the data.
   *
   * The word "Deserialization" is used a lot throughout the `connection` folder.
   * For our purposes, it's the conversion from firebase data to JS data
   * (e.g. turning a timestamp object to milliseconds).
   * */
  static deserialize(orig: any) {
    // If the "deserialize" option in present in the entity, use it
    const deserializer = this.entity.options?.deserialize;
    const data = deserializer ? deserializer(orig) : { ...orig };

    for (const field of this._entity.fields) {
      const val = data[field.fieldName];

      // If any of the fields are field deserializers,
      // create a thenable that calls it
      if (field.type === 'deserializer') {
        data[field.fieldName] = {
          then: async (cb: any) => {
            return cb(field.deserialize(val));
          },
        };
      }
    }

    handleRelations(data, this.name);

    return data;
  }

  /** Find a document by its id */
  static async findOne<T extends BaseEntity>(
    this: Constructor<T>,
    id: string
  ): Promise<T> {
    const entity: EntityData = (this as any).entity;
    const snap = entity.collection.doc(`${id}`);

    const data = (await snap.get()).data();

    return (this as any).deserialize(data);
  }

  /** Paginate through a collection */
  static async paginate<T extends BaseEntity>(
    this: Constructor<T>,
    offset: number,
    limit: number
  ): Promise<T[]> {
    const entity: EntityData = (this as any).entity;
    const all = await entity.collection.get();
    return all.docs.slice(offset, limit + offset).map((doc) => {
      const data = (this as any).deserialize(doc.data());

      const obj: any = {
        id: doc.id,
        ...data,
      };
      return obj as T;
    });
  }

  /** Finds every document */
  static async find<T extends BaseEntity>(this: Constructor<T>): Promise<T[]> {
    const entity: EntityData = (this as any).entity;
    const all = await entity.collection.get();
    return all.docs.map((doc) => {
      const data = (this as any).deserialize(doc.data());

      const obj: any = {
        id: doc.id,
        ...data,
      };
      return obj;
    });
  }

  /** Finds all documents where `{fieldName} == {value}` */
  static async query<T extends BaseEntity>(
    this: Constructor<T>,
    fieldName: string,
    value: string
  ): Promise<T> {
    const entity: EntityData = (this as any).entity;
    const collection = entity.collection;
    const snap = await collection.where(fieldName, '==', value).get();
    return (snap.docs[0].data() as any) as T;
  }

  /** Mutates an existing document */
  static mutate<T extends BaseEntity>(
    this: Constructor<T>,
    id: string,
    data: Partial<T>,
    options?: FirebaseFirestore.SetOptions
  ): Promise<FirebaseFirestore.WriteResult> {
    const entity: EntityData = (this as any).entity;
    const collection = entity.collection;

    return collection.doc(id).set(data, options);
  }
}
