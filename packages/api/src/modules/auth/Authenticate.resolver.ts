import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export default class AuthenticateResolver {
  @Mutation(() => Boolean!)
  async authenticate(@Arg('idToken') idToken: string) {
    // TODO: auth
    return false;
  }
}
