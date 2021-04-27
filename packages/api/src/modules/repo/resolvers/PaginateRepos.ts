import { Arg, Query, Resolver } from "type-graphql";
import Repo from "../../../entity/Repo";

@Resolver()
export default class PaginateRepos {
  @Query(() => [Repo])
  paginateRepos(@Arg("offset") offset: number, @Arg("limit") limit: number) {
    return Repo.paginate(offset, limit);
  }
}
