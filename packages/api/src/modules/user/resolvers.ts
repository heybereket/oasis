import { IResolvers } from 'graphql-tools';
import { admindb } from '../../adminDB';

const resolvers: IResolvers = {
  Query: {
    allUsers: async () => {
      const db = await admindb();
      const users = await db.collection('users').get();
      return users.docs.map((doc) => doc.data());
    },
  },
};

export default resolvers;
