import { mergeResolvers } from "@graphql-tools/merge";

import repo from "./modules/repo/resolvers";
import user from "./modules/user/resolvers";
import posts from "./modules/posts/resolvers";
import comments from "./modules/comments/resolvers";

const resolversArray = [repo, user, posts, comments];

export default mergeResolvers(resolversArray);
