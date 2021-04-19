import { IResolvers } from "graphql-tools";
import { adminDB } from "../../utils/admin-db";

let collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

const getPostsCollection = async () => {
  if (collection) return collection;

  const db = await adminDB();
  return (collection = db.collection("posts"));
};

const getPost = async (id: string): Promise<FirebaseFirestore.DocumentData> => {
  const collection = await getPostsCollection();
  const snap = await collection.doc(id).get();
  const data = snap.data();
  return data && { id, ...data };
};

const resolvers: IResolvers = {
  Comment: {
    post: ({ post }) => getPost(post),
  },
  User: {
    posts: async ({ posts }: { posts: string[] }) => {
      return Promise.all(posts.map(getPost));
    },
  },
  Query: {
    allPosts: async () => {
      const collection = await getPostsCollection();
      const users = await collection.get();
      return users.docs.map((doc) => getPost(doc.id));
    },
    getPost: async (_, { id }: { id: string }) => getPost(id),
  },
};

export default resolvers;
