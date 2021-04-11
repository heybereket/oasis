import 'firebase/auth';
import getFirebaseAdmin from './firebaseadmin';
import { parseCookies } from 'nookies';

export default async function verifyCookie(context) {
  const contextCookies = await parseCookies(context);
  var cookie = contextCookies.user;
  const admin = await getFirebaseAdmin();
  if (!admin) return null;
  if (!cookie) cookie = 'CookieNotFound';

  var userdata;

  await admin
    .auth()
    .verifySessionCookie(cookie, true /** checkRevoked */)
    .then(async decodedClaims => {
      var db = admin.firestore();
      var docRef = db.collection('users').doc(decodedClaims.uid);
      await docRef.get().then(async doc => {
        var data = await doc.data();
        userdata = {
          ...data,
          created: data.created.toDate().toDateString(),
          cookie,
          ...decodedClaims,
          hasAuth: true,
          authState: 'authenticated',
        };
      });
    })
    .catch(e => (userdata = { hasAuth: false, authState: 'unauthenticated' }));
  return userdata;
}
