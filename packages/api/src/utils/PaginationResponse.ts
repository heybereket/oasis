import { Field, ObjectType, ClassType } from 'type-graphql';

export interface IPaginatedResponse<T = any> {
  items: T[];
  total: number;
  hasMore: boolean;
}

export function PaginatedResponse<TItem>(
  name: string,
  getTItemClass: () => ClassType<TItem>
): ClassType<IPaginatedResponse<TItem>> {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType(`Paginated${name}Response`)
  class PaginatedResponseClass {
    // here we use the runtime argument
    @Field(() => [getTItemClass()])
    // and here the generic type
    items: TItem[];

    @Field()
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}
