import { getRefData } from "../utils/getRefData";
import { allEntities, EntityData } from "./Entity";

type Constructor<T> = { new (): T };

export class BaseEntity {
  static _entity: EntityData;

  static deserialize(orig: any) {
    const formatter = this.entity.options?.deserialize;
    return formatter ? formatter(orig) : orig;
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
    const snap = entity.collection.doc(id);
    return (this as any).deserialize(getRefData(snap) as any);
  }

  static async paginate<T extends BaseEntity>(
    this: Constructor<T>,
    offset: number,
    limit: number
  ): Promise<T[]> {
    const entity: EntityData = (this as any).entity;
    const all = await entity.collection.get();
    return all.docs.slice(offset, limit + offset).map((doc) => {
      var data = (this as any).deserialize(doc.data());

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
      var data = (this as any).deserialize(doc.data());

      const obj: any = {
        id: doc.id,
        ...data,
      };
      return obj as T;
    });
  }
}
