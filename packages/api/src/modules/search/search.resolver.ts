import { Arg, createUnionType, Query, Resolver } from 'type-graphql';
import Resort from '@entities/Resort';
import User from '@entities/User';
import Post from '@entities/Post';

const SearchResultUnion = createUnionType({
  name: 'SearchResult', // the name of the GraphQL union
  types: () => [User, Post, Resort] as const, // function that returns tuple of object types classes
});

const AMOUNT_OF_SEARCH_TYPES = 3;

@Resolver()
export class SearchResolver {
  @Query(() => [SearchResultUnion])
  async search(
    @Arg('searchQuery') searchQuery: string,
    @Arg('limit') limit: number
  ) {
    const posts = await Post.createQueryBuilder()
      .where('LOWER(message) LIKE LOWER(:searchQuery)', {
        searchQuery: `%${searchQuery}%`,
      })
      .limit(Math.floor(limit / AMOUNT_OF_SEARCH_TYPES))
      .getMany();

    const users = await User.createQueryBuilder()
      .where('LOWER(username) LIKE LOWER(:searchQuery)', {
        searchQuery: `%${searchQuery}%`,
      })
      .orWhere('LOWER(name) LIKE LOWER(:searchQuery)', {
        searchQuery: `%${searchQuery}%`,
      })
      .orWhere('LOWER(bio) LIKE LOWER(:searchQuery)', {
        searchQuery: `%${searchQuery}%`,
      })
      .limit(Math.floor(limit / AMOUNT_OF_SEARCH_TYPES))
      .getMany();

    const resorts = await Resort.createQueryBuilder()
      .where('LOWER(name) LIKE LOWER(:searchQuery)', {
        searchQuery: `%${searchQuery}%`,
      })
      .orWhere('LOWER(description) LIKE LOWER(:searchQuery)', {
        searchQuery: `%${searchQuery}%`,
      })
      .limit(Math.floor(limit / AMOUNT_OF_SEARCH_TYPES))
      .getMany();

    return [...users, ...posts, ...resorts];
  }
}
