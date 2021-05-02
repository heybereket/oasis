import { allEntities, EntityData } from './Entity';
import { handleRelations } from './handleRelations';

type Constructor<T> = { new (): T };

export class BaseEntity {
  static _entity: EntityData;

  static deserialize(orig: any) {
    const formatter = this.entity.options?.deserialize;
    const data = formatter ? formatter(orig) : { ...orig };

    for (const { name, deserialize } of this._entity.fields) {
      const val = data[name];
      data[name] = {
        then: async (cb: any) => {
          return cb(deserialize(val));
        },
      };
    }

    handleRelations(data);

    return data;
  }

  static get entity() {
    return (
      this._entity ||
      (this._entity = allEntities.find((e) => e.name === this.name))
    );
  }

  static async findOne<T extends BaseEntity>(
    this: Constructor<T>,
    id: string
  ): Promise<T> {
    const entity: EntityData = (this as any).entity;
    const snap = entity.collection.doc(`${id}`);
    // return (this as any).deserialize(getRefData(snap) as any);

    const data = (await snap.get()).data();

    return (this as any).deserialize(data);
  }

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

  /**
   * @description Filters by a field
   * @param fieldName The name of the firebase field
   * @param value Value of the field
   */
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
