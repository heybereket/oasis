import { IResolvers } from 'graphql-tools';
import getFirebaseAdmin from '../../utils/firebase-admin';

export const resolvers: IResolvers = {
  Query: {
    getUsers: async () => {
      const admin = await getFirebaseAdmin();
      const db = admin.firestore();
      var users = await db.collection('users').get();
      return users.docs.map((doc) => doc.data());
    },
  },
};
