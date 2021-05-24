export const allFields: { [key: string]: string } = {};
export const keyMap: { [key: string]: string } = {};

const typeMap = new Map<Function, string>([
  [String, 'string'],
  [Number, 'number'],
]);

export const BCEntity =
  (key: string): ClassDecorator =>
  (target) => {
    keyMap[key] = target.name;
  };

export const BCField =
  (options: { nullable?: boolean; type?: string } = {}): PropertyDecorator =>
  (target, propKey) => {
    const name = target.constructor.name;

    const C = Reflect.getMetadata('design:type', target, propKey);

    allFields[name] =
      (allFields[name] || '') +
      `\n  ${String(propKey)}${options.nullable ? '?:' : ':'} ${
        options.type || typeMap.get(C)
      };`;
  };
