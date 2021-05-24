export * from './RegisterEntity';
export * from './Resolver';

export const overrides = [];

export const addType = (str: string) => {
  overrides.push(str);
};
