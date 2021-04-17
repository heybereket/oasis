import { IResolvers } from "graphql-tools";
import { admindb } from "../../admindb";

const resolvers: IResolvers = {
  Query: {
    allRepos: async () => {
      const db = await admindb();
      const users = await db.collection("repos").get();
      return users.docs.map((doc) => doc.data());
    },
  },
};

export default resolvers;
