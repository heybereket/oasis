import { getRefData } from "../utils/getRefData";
import { allEntities, EntityData } from "./Entity";

type Constructor<T> = { new (): T };

export class BaseEntity {
  static _entity: EntityData;

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
    const snap = entity.collection.doc(id);
    return getRefData(snap) as any;
  }

  static async find<T extends BaseEntity>(this: Constructor<T>): Promise<T[]> {
    const entity: EntityData = (this as any).entity;
    const all = await entity.collection.get();
    return all.docs.map((doc) => {
      var data = doc.data();
      if (data.email) delete data.email;
      const obj: any = {
        id: doc.id,
        ...data,
      };
      return obj as T;
    });
  }
}
