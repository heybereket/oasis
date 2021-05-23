export * from './PublicField';
export * from './RegisterEntity';
export * from './Resolver';

export const overrides = [];

export const addCode = (str: string) => {
  overrides.push(str);
};
