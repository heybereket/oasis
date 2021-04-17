import { IResolvers } from "graphql-tools";
import { adminDB } from "../../utils/admin-db";

const resolvers: IResolvers = {
  Query: {
    allRepos: async () => {
      const db = await adminDB();
      const users = await db.collection("repos").get();
      return users.docs.map((doc) => doc.data());
    },
  },
};

export default resolvers;
