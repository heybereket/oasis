import { IResolvers } from "graphql-tools";
import { adminDB } from "../../utils/admin-db";

const getReposCollection = async () => {
  const db = await adminDB();
  return db.collection("repos");
};

const resolvers: IResolvers = {
  User: {
    repos: () => [],
  },
  Query: {
    allRepos: async () => {
      const collection = await getReposCollection();
      const users = await collection.get();
      return users.docs.map((doc) => doc.data());
    },
    getRepo: async (_, { id }: { id: string }) => {
      const collection = await getReposCollection();
      const doc = await collection.doc(id).get();
      return doc.data();
    },
  },
};

export default resolvers;
