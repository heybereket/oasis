import { mergeResolvers } from "@graphql-tools/merge";

import repo from "./modules/repo/resolvers";
import user from "./modules/user/resolvers";

const resolversArray = [repo, user];

export default mergeResolvers(resolversArray);
