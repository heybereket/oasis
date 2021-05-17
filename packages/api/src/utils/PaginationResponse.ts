import { ClassType, Field, ObjectType } from 'type-graphql';

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType(`Paginated${TItemClass.name}Response`, { isAbstract: true })
  abstract class PaginatedResponseClass {
    // here we use the runtime argument
    @Field(() => [TItemClass])
    // and here the generic type
    items: TItem[];

    @Field()
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass as any;
}
