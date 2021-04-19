import { IResolvers } from "graphql-tools";
import { adminDB } from "../../utils/admin-db";

let collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

const getCommentsCollection = async () => {
  if (collection) return collection;

  const db = await adminDB();
  return (collection = db.collection("comments"));
};

const getComment = async (
  id: string
): Promise<FirebaseFirestore.DocumentData> => {
  const collection = await getCommentsCollection();
  const snap = await collection.doc(id).get();
  const data = snap.data();
  return data && { id, ...data };
};

const resolvers: IResolvers = {
  Post: {
    comments: async ({ comments }: { comments: string[] }) => {
      return Promise.all(comments.map(getComment));
    },
  },
  Query: {
    allComments: async () => {
      console.log("ALL COMMENTS CALLED");
      const collection = await getCommentsCollection();
      const users = await collection.get();
      return users.docs.map((doc) => getComment(doc.id));
    },
    getComment: async (_, { id }: { id: string }) => getComment(id),
  },
};

export default resolvers;
