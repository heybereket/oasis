import { serialize } from 'cookie';
import getFirebaseAdmin from '../../utils/firebaseadmin';
const { destroyCookie } = require('nookies');
import { sendStatus } from '../../utils/apiFormatter';

var admin;

export default async function auth(req, res) {
  admin = await getFirebaseAdmin();
  if (req.method === 'POST') return signIn(req.body.token, req.body.githubToken, res);
  if (req.method === 'DELETE') return signOut(req.body.sessionCookie, res);
  sendStatus(res, 'CannotMethod');
}

async function signIn(token, gitToken, res) {
  const expiresIn = 15 * 60 * 1000; // 15 minutes

  const cookie = await admin
    .auth()
    .verifyIdToken(token)
    .then(decodedIdToken => {
      if (new Date().getTime() / 1000 - decodedIdToken.auth_time < expiresIn / 1000) {
        // Create session cookie and set it.
        return admin.auth().createSessionCookie(token, { expiresIn });
      }
      // A user that was not recently signed in is trying to set a session cookie.
      // To guard against ID token theft, require re-authentication.
      sendStatus(res, 'OutdatedCookie');
    });

  if (!cookie) sendStatus(res, 'InvalidCookie');

  var githubData = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: 'token ' + gitToken,
    },
  });
  githubData = await githubData.json();
  await admin
    .auth()
    .verifySessionCookie(cookie)
    .then(async decodedClaims => {
      var db = admin.firestore();
      const doc = await db.collection('users').doc('userId').get();
      const docData = doc.data();

      const today = new Date();
      const year = today.getFullYear();
      Date.shortMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      function shortMonthName(dt) {
        return Date.shortMonths[dt.getMonth()];
      }
      const day = today.getDate();

      var userData = {
        username: githubData.login,
        name: githubData.name,
        avatar: decodedClaims.picture,
        bio: githubData.bio,
        url: githubData.html_url,
        email: decodedClaims.email,
        uid: decodedClaims.uid,
      };

      await db
        .collection('users')
        .doc(decodedClaims.uid)
        .get()
        .then(doc => {
          if (!doc.exists) {
            userData.created = admin.firestore.Timestamp.now();
            userData.joined = shortMonthName(today) + ` ${day}, ${year}`;
            userData.verified = false;
          }
        });

      await db.collection('users').doc(decodedClaims.uid).set(userData, { merge: true });
    });

  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.SECURE_COOKIE,
    path: '/',
  };
  res.setHeader('Set-Cookie', serialize('user', cookie, options));

  res.status(200).send(sendStatus(res, 'Success'));
}

async function signOut(cookie, res) {
  await admin
    .auth()
    .verifySessionCookie(cookie)
    .then(decodedClaims => {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      destroyCookie({ res }, 'user');
      res.status(200).end(sendStatus(res, 'Success'));
    })
    .catch(() => {
      sendStatus(res, 'Generic');
    });
}