import { adminDB } from '../../../utils/common/admin-db';
import admin from '../../../utils/common/firebase-admin';
import { generatedNumber, searchJSON, getShortMonth, request } from '../../../utils/common/lib';
import firebaseAdmin from 'firebase-admin';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { ApolloError } from 'apollo-server-errors';

@Resolver()
export default class AuthenticateResolver {
  @Mutation(() => Boolean!)
  async authenticate(@Arg('idToken') idToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      // Fetching GitHub API
      const res = await request(`https://api.github.com/user/${decodedToken.firebase.identities['github.com'][0]}`);
      const githubData = await res.json();

      // Fetching Oasis Contributors via GitHub API
      const cRes = await request('https://api.github.com/repos/oasis-sh/oasis/contributors');
      const contributorData = await cRes.json();

      const docRef = adminDB.doc(`users/${decodedToken.uid}`);
      const doc = await docRef.get();

      const checkUsername = adminDB
        .collection('users')
        .where('username', '==', githubData.login);
      const usernameField = await checkUsername.get();

      // Get User Data and store in Firebase
      const userData: FirebaseFirestore.DocumentData = {
        id: decodedToken.uid,
        email: decodedToken.email,
        banner: null,
        avatar: decodedToken.picture,
        name: githubData.name,
        bio: null,
        twitter: null,
        github: githubData.login,
        url: null,
        activity: [],
        posts: [],
        comments: [],
        followers: [],
        following: [],
      };

      // Check if username is available
      if (usernameField.empty && !doc.exists) {
        userData.username = `${githubData.login.toLowerCase()}`;
      } else if (!usernameField.empty && !doc.exists) {
        // Add generated digits to end of username if already exists in database
        userData.username = `${githubData.login.toLowerCase()}${generatedNumber(
          4
        )}}`;
      }

      // Searches JSON to see if user is a contributor in the repository
      if (searchJSON(contributorData, 'login', githubData.login)) {
        // Give the user a contributor badge if returns true
        userData.badges = [
          {
            type: 'contribution',
            badge: {
              contributor: true,
            },
          },
        ];
      }

      // Add specific fields only if not already existed
      if (!doc.exists) {
        userData.createdAt = firebaseAdmin.firestore.Timestamp.now();
        userData.joined = getShortMonth();
        userData.verified = false;
      }

      await docRef.set(userData, { merge: true });

      return true;
    } catch (e) {
      throw new ApolloError(e.message);
    }
  }
}
