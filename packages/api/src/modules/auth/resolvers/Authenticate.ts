import { adminDB } from "../../../utils/admin-db";
import admin from "../../../utils/firebase-admin";
import firebaseAdmin from "firebase-admin";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ApolloError } from "apollo-server-errors";
var badWords = require('badwords/array');

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

      const generatedTag = Math.floor(1000 + Math.random() * 9999);
      const generatedNumbers = Math.floor(1000 + Math.random() * 1000000);

      const userData: FirebaseFirestore.DocumentData = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        avatar: decodedToken.picture,
        name: githubData.name,
        tag: generatedTag,
        bio: null,
        // To avoid variable naming conflicts in the entities,
        // we use an "_" before any relational data fields
        _posts: [],
        _activity: [],
      };

      if (badWords.includes(githubData.login)){
        userData.username = `${githubData.login}${generatedNumbers}`
      } else {
        userData.username = `${githubData.login}`
      }

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
