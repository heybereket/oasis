import getFirebaseAdmin from "../../../utils/firebase-admin";
import firebaseAdmin from "firebase-admin";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export default class AuthenticateResolver {
  @Mutation(() => String)
  async authenticate(@Arg("idToken") idToken: string) {
    const admin = await getFirebaseAdmin();
    const db = await admin.firestore();

    return admin
      .auth()
      .verifyIdToken(idToken)
      .then(async (decodedToken) => {
        return await fetch(
          `https://api.github.com/user/${decodedToken.firebase.identities["github.com"][0]}`
        )
          .then((res) => res.json())
          .then(async (githubData) => {
            const docRef = db.doc(`users/${decodedToken.uid}`);
            const doc = await docRef.get();

            let docData: any = {
              email: decodedToken.email,
              posts: [],
              repos: [],
              username: githubData.login,
            };

            if (!doc.exists)
              docData.createdAt = firebaseAdmin.firestore.Timestamp.now();
            await docRef.set(docData, { merge: true });

            return "success";
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((error) => {
        throw error;
      });
  }
}
