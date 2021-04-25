import Repo from "../../../entity/Repo";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export default class GetRepoResolver {
  @Query(() => Repo, { nullable: true })
  async getRepo(@Arg("id") id: string) {
    return Repo.findOne(id);
  }
}
