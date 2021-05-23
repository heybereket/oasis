export const allResolvers: {
  [key: string]: {
    name: string;
    type: 'mutation' | 'query';
    args: string;
    returnType: string;
  }[];
} = {};

interface Options {
  name?: string;
  args?: { [key: string]: string };
}

const BCResolver =
  (mutationOrQuery: 'mutation' | 'query') =>
  (
    key: string,
    returnType: string,
    { name, args }: Options = {}
  ): MethodDecorator =>
  (_, propKey) => {
    const resolvers = allResolvers[key] || (allResolvers[key] = []);

    resolvers.push({
      name: name || String(propKey),
      type: mutationOrQuery,
      args: Object.entries(args || {})
        .map(([k, v]) => `${k}: ${v}`)
        .join(', '),
      returnType,
    });
  };

export const BCQuery = BCResolver('query');
export const BCMutation = BCResolver('mutation');
