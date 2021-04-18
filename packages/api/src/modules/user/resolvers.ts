import { IResolvers } from "graphql-tools";
import { adminDB } from "../../utils/admin-db";

let collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

const getUsersCollection = async () => {
  if (collection) return collection;

  const db = await adminDB();
  return (collection = db.collection("users"));
};

const getUser = async (id: string): Promise<FirebaseFirestore.DocumentData> => {
  const collection = await getUsersCollection();
  const snap = await collection.doc(id).get();
  const data = snap.data();
  return data && { id, ...data };
};

const resolvers: IResolvers = {
  Query: {
    allUsers: async () => {
      const collection = await getUsersCollection();
      const users = await collection.get();
      return users.docs.map((doc) => getUser(doc.id));
    },
    getUser: async (_, { id }: { id: string }) => getUser(id),
  },
};

export default resolvers;
