import { Query, Resolver } from "type-graphql";
import Repo from "../../../entity/Repo";

@Resolver()
export default class AllReposResolver {
  @Query(() => [Repo])
  async allRepos() {
    return Repo.find();
  }
}
