export class VariableType {
  constructor(public name: string) {}
}

export const variable = (name: string): any => new VariableType(name);
