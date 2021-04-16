import getFirebaseAdmin from '../../utils/firebase-admin';

export async function resolvers() {
  const admin = await getFirebaseAdmin();
  const db = admin.firestore();
  return {
    Query: {
      getUsers: async () => {
        var users = await db.collection('users').get();
        return users.docs.map((doc) => doc.data());
      },
    },
  };
}
