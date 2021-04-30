import { FieldData } from "./types";

export const fields_data = "__Fields_Data__";

export interface RelationFieldData {
  type: "relation";
  name: string;
  multi?: boolean;
}

export interface Options {
  multi?: boolean;
}

export const Relation = ({
  multi = false,
}: Options = {}): PropertyDecorator => (target, propertyKey) => {
  const fields: FieldData[] =
    Reflect.getMetadata(fields_data, target.constructor) || [];

  const fieldData: RelationFieldData = {
    type: "relation",
    name: String(propertyKey),
    multi,
  };

  fields.push(fieldData);
  Reflect.defineMetadata(fields_data, fields, target.constructor);
};
