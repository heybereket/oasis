import { serialize } from 'cookie';
import getFirebaseAdmin from '../../utils/firebaseadmin';
const { destroyCookie, parseCookies } = require('nookies');
import { formatData, sendStatus } from '../../utils/apiFormatter';
import dateDiff from '../../utils/dateDiff';
import verifyCookie from '../../utils/verifyCookie';
import github from 'remark-github';

let admin;

export default async function auth(req, res) {
  admin = await getFirebaseAdmin();
  if (req.method === 'GET') return getCurrentAuth(req, res);
  if (req.method === 'POST') return signIn(req.body.token, req.body.githubToken, res);
  if (req.method === 'DELETE') return signOut(req.body.sessionCookie, res);
  sendStatus(res, 'CannotMethod');
}

async function getCurrentAuth(req, res) {
  var cookieData = await verifyCookie(res);
  delete cookieData.activity;
  return res.status(200).send(formatData(cookieData));
}

async function signIn(token, gitToken, res) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in seconds

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

  let githubData = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: 'token ' + gitToken,
    },
  });
  githubData = await githubData.json();

  const { uid, picture: avatar, email } = await admin.auth().verifySessionCookie(cookie);
  const { login: username, name, bio, twitter_username: twitter, blog: link } = githubData;

  let db = admin.firestore();

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
  const prefix = 'https://';
  if (githubData.blog.substr(0, prefix.length) !== prefix) {
    githubData.blog = prefix + githubData.blog;
  }
  let userData = {
    uid,
    avatar,
    username,
    name,
    email,
    bio,
    twitter,
    link,
  };

  const userDoc = await db.collection('users').doc(uid).get();
  if (!userDoc.exists) {
    userData.created = admin.firestore.Timestamp.now();
    userData.joined = shortMonthName(today) + ` ${day}, ${year}`;
    userData.verified = false;
    userData.activity = [];
  }
  await db.collection('users').doc(uid).set(userData, { merge: true });

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
