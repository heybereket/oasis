import getFirebaseAdmin from "./firebase-admin";

export async function adminDB(): Promise<FirebaseFirestore.Firestore> {
  const admin = await getFirebaseAdmin();
  return admin.firestore();
}
