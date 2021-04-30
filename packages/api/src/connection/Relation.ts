export const fields_data = Symbol('C');

export interface FieldData {
  name: string;
  multi: boolean;
}

export interface Options {
  multi?: boolean;
}

export const Relation = ({
  multi = false,
}: Options = {}): PropertyDecorator => (target, propertyKey) => {
  const fields: FieldData[] =
    Reflect.getMetadata(fields_data, target.constructor) || [];

  const fieldData: FieldData = {
    name: String(propertyKey),
    multi,
  };

  fields.push(fieldData);
  Reflect.defineMetadata(fields_data, fields, target.constructor);
};
