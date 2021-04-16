import { IResolvers } from 'graphql-tools';
import getFirebaseAdmin from '../../utils/firebase-admin';

export const resolvers: IResolvers = {
  Query: {
    getUsers: async () => {
      var db = await admindb();
      var users = await db.collection('users').get();
      return users.docs.map((doc) => doc.data());
    },
  },
};

async function admindb(): Promise<FirebaseFirestore.Firestore> {
  const admin = await getFirebaseAdmin();
  return admin.firestore();
}
