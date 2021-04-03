var admin = require("firebase-admin");
var serviceAccount = require("./serviceaccount.json");

export default async function getFirebaseAdmin() {
  if (!admin.apps.length) {
    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  return admin;
}
