import { Field, ObjectType, ClassType } from 'type-graphql';

export interface IPaginatedResponse {
  items: any;
  total: number;
  hasMore: boolean;
}

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>): any {
  // `isAbstract` decorator option is mandatory to prevent registering in schema

  @ObjectType(`Paginated${TItemClass.name}Response`)
  class PaginatedResponseClass {
    // here we use the runtime argument
    @Field(() => [TItemClass])
    // and here the generic type
    items: TItem[];

    @Field()
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}
