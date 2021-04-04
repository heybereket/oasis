import { serialize } from "cookie";
import getFirebaseAdmin from "../../utils/firebaseadmin";
const { destroyCookie } = require("nookies");
import { formatError, formatSuccess } from "../../utils/apiFormatter";

var admin;

export default async function auth(req, res) {
  admin = await getFirebaseAdmin();
  if (req.method === "POST")
    return signIn(req.body.token, req.body.githubToken, res);
  if (req.method === "DELETE") return signOut(req.body.sessionCookie, res);
}

async function signIn(token, gitToken, res) {
  const expiresIn = 15 * 60 * 1000; // 15 minutes

  const cookie = await admin
    .auth()
    .verifyIdToken(token)
    .then((decodedIdToken) => {
      if (
        new Date().getTime() / 1000 - decodedIdToken.auth_time <
        expiresIn / 1000
      ) {
        // Create session cookie and set it.
        return admin.auth().createSessionCookie(token, { expiresIn });
      }
      // A user that was not recently signed in is trying to set a session cookie.
      // To guard against ID token theft, require re-authentication.
      res.status(401).send(formatError("Error_OutdatedID"));
    });

  if (!cookie) res.status(401).send(formatError("Error_InvalidCookie"));

  var githubData = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: "token " + gitToken,
    },
  });
  githubData = await githubData.json();
  await admin
    .auth()
    .verifySessionCookie(cookie)
    .then(async (decodedClaims) => {
      var db = admin.firestore();
      var userData = {
        username: githubData.login,
        name: githubData.name,
        avatar: decodedClaims.picture,
        bio: githubData.bio,
        url: githubData.html_url,
        email: decodedClaims.email,
        uid: decodedClaims.uid,
        created: admin.firestore.Timestamp.now(),
      };

      await db.collection("users").doc(decodedClaims.uid).set(userData);
    });

  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.SECURE_COOKIE,
    path: "/",
  };
  res.setHeader("Set-Cookie", serialize("user", cookie, options));

  res.status(200).send(formatSuccess());
}

async function signOut(cookie, res) {
  await admin
    .auth()
    .verifySessionCookie(cookie)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(() => {
      destroyCookie({ res }, "user");
      res.status(200).end(formatSuccess());
    })
    .catch(() => {
      res.status(500).end(formatError("Error_Generic"));
    });
}
