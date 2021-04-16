import { IResolvers } from 'graphql-tools';
import getFirebaseAdmin from './firebase-admin';

export const resolvers: IResolvers = {
  Query: {
    getUsers: async () => {
      const db = await admindb();
      const users = await db.collection('users').get();
      return users.docs.map((doc) => doc.data());
    },
  },
};

async function admindb(): Promise<FirebaseFirestore.Firestore> {
  const admin = await getFirebaseAdmin();
  return admin.firestore();
}
