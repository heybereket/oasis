import { adminDB } from "../../../utils/admin-db";
import admin from "../../../utils/firebase-admin";
import firebaseAdmin from "firebase-admin";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ApolloError } from "apollo-server-errors";

@Resolver()
export default class AuthenticateResolver {
  @Mutation(() => Boolean!)
  async authenticate(@Arg("idToken") idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      const res = await fetch(
        `https://api.github.com/user/${decodedToken.firebase.identities["github.com"][0]}`
      );
      const githubData = await res.json();

      const docRef = adminDB.doc(`users/${decodedToken.uid}`);
      const doc = await docRef.get();

      const userData: FirebaseFirestore.DocumentData = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        avatar: decodedToken.picture,
        username: githubData.login,
        name: githubData.name,
        bio: null,
        // To avoid variable naming conflicts in the entities,
        // we use an "_" before any relational data fields
        _posts: [],
        _activity: [],
      };

      if (!doc.exists)
        userData.createdAt = firebaseAdmin.firestore.Timestamp.now();
        userData.verified = false;

      await docRef.set(userData, { merge: true });

      return true;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  }
}
