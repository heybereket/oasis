import getFirebaseAdmin from "./firebase-admin";

const admin = getFirebaseAdmin();

export const adminDB = admin.firestore();
