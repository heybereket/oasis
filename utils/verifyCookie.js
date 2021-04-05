import 'firebase/auth';
import getFirebaseAdmin from './firebaseadmin';

async function verifyCookie(cookie) {
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
          ...decodedClaims,
        };
        userdata.hasAuth = true;
      });
    })
    .catch(() => (userdata = { hasAuth: false }));
  return userdata;
}

export default verifyCookie;
