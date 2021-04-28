import { adminDB } from "../../../utils/admin-db";
import admin from "../../../utils/firebase-admin";
import firebaseAdmin from "firebase-admin";
import { Arg, Mutation, Resolver } from "type-graphql";
import { ApolloError } from "apollo-server-errors";
const badWords = require('badwords/array');

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

      const generatedNumber = (n = 10) => {
        let multiplier = Math.pow(10, n - 1)
        return Math.floor(1 * multiplier + Math.random() * 9 * multiplier);
      }

      const userData: FirebaseFirestore.DocumentData = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        avatar: decodedToken.picture,
        name: githubData.name,
        bio: null,
        // To avoid variable naming conflicts in the entities,
        // we use an "_" before any relational data fields
        _posts: [],
        _activity: [],
      };

      if (badWords.includes(githubData.login)){
        userData.username = `${githubData.login}${generatedNumber(6)}`
      } else {
        userData.username = `${githubData.login}`
      }

      if (!doc.exists)
        userData.createdAt = firebaseAdmin.firestore.Timestamp.now();
        userData.verified = false;
        userData.tag = generatedNumber(4);

      await docRef.set(userData, { merge: true });

      return true;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  }
}
